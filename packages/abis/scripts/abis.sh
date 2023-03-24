#!/usr/bin/env bash

# Find the root of the package.
root=$(dirname $(dirname $(realpath $0)))
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
  exports=$(echo $exports | jq ". += { \"./$name\": { \"types\": \"./dist/abis/$name.d.ts\", \"import\": \"./dist/abis/$name.js\" } }")
done

# Write the exports to the package.json file.
jq ".exports = $exports" $root/package.json > $root/package.json.tmp
mv $root/package.json.tmp $root/package.json
