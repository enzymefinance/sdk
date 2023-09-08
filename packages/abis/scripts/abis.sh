#!/usr/bin/env bash

# Check if the script was called with exactly one argument.
if [ $# -ne 1 ]; then
    echo "Usage: $0 [artifacts directory]"
    exit 1
fi

artifacts=$1

# Check if the argument is a directory that exists.
if [ ! -d "$artifacts" ]; then
    echo "$artifacts is not a valid directory."
    exit 1
fi

# Find the root of the package.
root=$(dirname $(dirname $(realpath $0)))

# Copy the abi & interface files to the abis directory.
mkdir -p $root/abis
cp $artifacts/*.abi.json $artifacts/*.sol $root/abis

abis=$(find $root/abis -type f -name "*.abi.json" -print0 | sort -z | xargs -r0)

# Delete previously generated files.
rm -rf $root/src/abis
rm -f $root/src/index.ts

# Re-create the abis directory and root exports file.
mkdir -p $root/src/abis
touch $root/src/index.ts

for abi in $abis; do
  name=$(basename $abi .abi.json)
  echo "Processing $name"

  # Create typescript file with json of the abi file as named export using the name of the file.
  echo "export const $name = $(cat $abi) as const;" > $root/src/abis/$name.ts
  echo "export { $name } from \"./abis/$name.js\";" >> $root/src/index.ts
done
