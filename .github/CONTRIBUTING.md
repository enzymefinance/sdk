# Contributing

Thanks for your interest in contributing! Please take a moment to review this document **before submitting a pull request**.

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/enzymefinance/enzyme-sdk/discussions).

## Basic guide

This guide is intended to help you get started with contributing. By following these steps, you will understand the development process and workflow.

---

## Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```bash
git clone https://github.com/enzymefinance/enzyme-sdk.git
```

Or the [GitHub CLI](https://cli.github.com):

```bash
gh repo clone enzymefinance/enzyme-sdk
```

## Installing Node.js and pnpm

This project uses [pnpm workspaces](https://pnpm.io/workspaces) to manage multiple projects. You need to install **Node.js v18 or higher** and **pnpm v7 or higher**.

You can run the following commands in your terminal to check your local Node.js and pnpm versions:

```bash
node -v
pnpm -v
```

If the versions are not correct or you don't have Node.js or pnpm installed, download and follow their setup instructions:

- Install [Node.js](https://nodejs.org)
- Install [pnpm](https://pnpm.io/installation)

## Installing Foundry

We use [Foundry](https://book.getfoundry.sh/) for testing. We run a local [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil) instance against a forked Ethereum node, where we can also use tools like [Forge](https://book.getfoundry.sh/forge/) to deploy test contracts to it. 

Install Foundry using the following command:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

## Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```bash
pnpm install
```

After the install completes, pnpm links packages across the project for development and [git hooks](https://github.com/toplenboren/simple-git-hooks) are set up.

## Running the test suite

First, copy the `.env.tpl` file at the root of the repository to `.env` and adjust the included values to your needs.

`ANVIL_FORK_URL` can be for any RPC service provider (e.g. Alchemy or Infura). Now you are ready to run the tests!

In one terminal session, spin up anvil:

```bash
pnpm anvil
```

Next, in a different terminal session, you can now run the test suite:

```bash
pnpm test
```

When adding new features or fixing bugs, it's important to add test cases to cover the new/updated behavior.

## Submitting a pull request

When you're ready to submit a pull request, you can follow these naming conventions:

- Pull request titles use the [Imperative Mood](https://en.wikipedia.org/wiki/Imperative_mood) (e.g., `add something`, `fix something`).
- [Changesets](#versioning) use past tense verbs (e.g., `added something`, `fixed something`).

When you submit a pull request, GitHub will automatically lint, build, and test your changes. If you see an ❌, it's most likely a bug in your code. Please, inspect the logs through the GitHub UI to find the cause.

## Versioning

When adding new features or fixing bugs, we'll need to bump the package versions. We use [Changesets](https://github.com/changesets/changesets) to do this.

> **Note**
>
> Only changes to the codebase that affect the public API or existing behavior (e.g. bugs) need changesets.

Each changeset defines which package(s) should be published and whether the change should be a major/minor/patch release, as well as providing release notes that will be added to the changelog upon release.

To create a new changeset, run `pnpm changeset`. This will run the Changesets CLI, prompting you for details about the change. You’ll be able to edit the file after it’s created — don’t worry about getting everything perfect up front.

Since we’re currently in beta, all changes should be marked as a minor/patch release to keep us within the `v0.x` range.

Even though you can technically use any markdown formatting you like, headings should be avoided since each changeset will ultimately be nested within a bullet list. Instead, bold text should be used as section headings.

If your PR is making changes to an area that already has a changeset (e.g. there’s an existing changeset covering theme API changes but you’re making further changes to the same API), you should update the existing changeset in your PR rather than creating a new one.
