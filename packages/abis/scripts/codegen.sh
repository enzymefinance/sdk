#!/usr/bin/env bash

# Find the root of the package.
cwd=$(dirname $(realpath $0))
root=$(dirname $cwd)

# Re-create the abis directory and root exports file.
rm -rf $root/src/abis
rm -f $root/src/index.ts
mkdir -p $root/src/abis
touch $root/src/index.ts

# Create typescript files for each abi file.
abis=$(find $root/abis -type f -name "*.abi.json" -print0 | sort -z | xargs -r0)
for abi in $abis; do
  name=$(basename $abi .abi.json)
  # Create typescript file with json of the abi file as named export using the name of the file.
  echo "export const $name = $(cat $abi) as const;" > $root/src/abis/$name.ts
  echo "export { $name } from \"./abis/$name.js\";" >> $root/src/index.ts
done

pnpm biome format $root/src/abis $root/src/index.ts --write
