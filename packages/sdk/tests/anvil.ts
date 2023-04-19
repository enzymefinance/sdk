import { execa, type ExecaChildProcess } from "execa";
import { beforeAll, afterAll, afterEach } from "vitest";
import { Writable } from "node:stream";
import getPort from "get-port";

export interface AnvilOptions {
  forkUrl?: string | undefined;
  forkBlockNumber?: number | undefined;
  startUpTimeout?: number;
  logDepth?: number;
}

// TODO: This is a workaround. Figure out if we can fix vitest so that it reliably reaps all child processes.
export const anvilPort = await getPort({
  port: 8545 + Number(process.env.VITEST_POOL_ID ?? 1),
});

export function setupAnvil({
  forkUrl = process.env.VITE_ANVIL_FORK_URL,
  forkBlockNumber = Number(process.env.VITE_ANVIL_FORK_BLOCK_NUMBER ?? 16994400),
  startUpTimeout = 10000,
  logDepth = 10,
}: AnvilOptions = {}) {
  let anvil: Anvil | undefined;

  // Start a shared anvil instance for every test file that uses this function. This means that
  // state is shared between test functions within a file. If you want / need, you can use the
  // viem test client to reset the fork between tests using `beforeEach` or `afterEach`.
  beforeAll(async () => {
    anvil = await Anvil.start({
      forkUrl,
      forkBlockNumber,
      startUpTimeout,
    });
  });

  // Print the last log entries from anvil after each test.
  afterEach((context) => {
    context.onTestFailed((result) => {
      // Remove the startup message from the logs and only return the last `logDepth` entries.
      const logs = anvil?.logs().slice(-logDepth, -1) ?? [];
      if (logs.length === 0) {
        return;
      }

      // Try to append the log messages to the vitest error message. If that's not possible, print them to the console.
      const error = result.errors?.[0];
      const label = "Anvil log output\n=======================================\n";

      if (error !== undefined) {
        error.message += `\n\n${label}`;
        error.message += `\n${logs.join("\n")}`;
      } else {
        console.group(label);

        for (const log of logs) {
          console.log(log);
        }

        console.groupEnd();
      }
    });
  });

  // Stop the anvil instance after all tests have run.
  afterAll(async () => {
    await anvil?.exit();
  });
}

class LogRecorder extends Writable {
  private readonly callback: (message: string) => void;
  private readonly messages: string[] = [];

  constructor(callback: (message: string) => void) {
    super();
    this.callback = callback;
  }

  // rome-ignore lint/suspicious/noExplicitAny: this is fine /shrug/
  override _write(chunk: any, _: string, next: (error?: Error) => void) {
    const message = chunk.toString();
    this.messages.push(message);
    this.callback(message);
    next();
  }

  public flush() {
    return this.messages.splice(0, this.messages.length);
  }
}

class Anvil {
  public readonly options: AnvilOptions;
  public readonly process: ExecaChildProcess;
  private readonly controller: AbortController;
  private readonly recorder: LogRecorder;

  public static async start(options?: AnvilOptions) {
    const opts = {
      ...options,
      startUpTimeout: 1000,
    };

    let resolve: (value: Anvil) => void = () => {};
    let reject: (reason: Error) => void = () => {};

    const promise = new Promise<Anvil>((resolve_, reject_) => {
      resolve = resolve_;
      reject = reject_;

      // If anvil fails to start up in time, we reject the promise.
      setTimeout(() => {
        let message = "Anvil failed to start up in time";
        const logs = recorder.flush();

        if (logs.length > 0) {
          message += `:\n\n${logs.join("\n")}}`;
        }

        reject(new Error(message));
      }, opts.startUpTimeout);
    });

    const controller = new AbortController();
    const recorder = new LogRecorder((message) => {
      // We know that anvil has started up when it prints this message.
      if (message.includes(`Listening on 127.0.0.1:${anvilPort}`)) {
        resolve(instance);
      }
    });

    // TODO: We could expose a lot more options here. We could also extract this into a dedicated command builder.
    const args = Object.entries({
      "--port": `${anvilPort}`,
      ...(opts.forkUrl ? { "--fork-url": opts.forkUrl } : {}),
      ...(opts.forkBlockNumber ? { "--fork-block-number": `${opts.forkBlockNumber}` } : {}),
    }).flatMap(([key, value]) => [key, value]);

    const subprocess = execa("anvil", args, {
      signal: controller.signal,
      cleanup: true,
      all: true,
    });

    // rome-ignore lint/style/noNonNullAssertion: we know that this is not null because we are passing `all: true` to execa.
    subprocess.pipeAll!(recorder);

    // Assign the anvil instance that is returned from the promise.
    const instance = new this(subprocess, controller, recorder, opts);

    return promise;
  }

  constructor(
    subprocess: ExecaChildProcess,
    controller: AbortController,
    recorder: LogRecorder,
    options: AnvilOptions,
  ) {
    this.process = subprocess;
    this.controller = controller;
    this.recorder = recorder;
    this.options = options;
  }

  public async exit(reason?: string) {
    this.controller.abort(reason);

    try {
      await this.process;
    } catch {}
  }

  public logs() {
    return this.recorder.flush();
  }
}
