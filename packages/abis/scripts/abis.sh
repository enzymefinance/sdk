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

# Preserve the "." and "./package.json" exports from package.json.
exports=$(jq ".exports | { \".\": .[\".\"], \"./package.json\": .[\"./package.json\"] }" $root/package.json)

for abi in $abis; do
  name=$(basename $abi .abi.json)
  echo "Processing $name"

  # Create typescript file with json of the abi file as named export using the name of the file.
  echo "export const $name = $(cat $abi) as const;" > $root/src/abis/$name.ts
  echo "export { $name } from \"./abis/$name.js\";" >> $root/src/index.ts
 
  # Add the export declaration for the abi file to the stored exports.
  exports=$(echo $exports | jq ". += { \"./$name\": { \"types\": \"./dist/types/abis/$name.d.ts\", \"import\": \"./dist/esm/abis/$name.js\", \"default\": \"./dist/cjs/abis/$name.js\" } }")
done

# Write the exports to the package.json file.
jq ".exports = $exports" $root/package.json > $root/package.json.tmp
mv $root/package.json.tmp $root/package.json
