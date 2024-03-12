#!/usr/bin/env bash

# Check if the script was called with exactly one argument.
if [ $# -ne 1 ]; then
    echo "Usage: $0 [artifacts directory]"
    exit 1
fi

# Set the protocol directory.
artifacts=$1

# Check if the argument is a directory that exists.
if [ ! -d "$artifacts" ]; then
    echo "$artifacts is not a valid directory."
    exit 1
fi

# Find the root of the package.
cwd=$(dirname $(realpath $0))
root=$(dirname $cwd)

# The target directory to store the interfaces and abis.
target=$root/abis

# The file containing the interfaces to generate.
registry=$cwd/artifacts.txt

# The pragma to use when generating the interfaces.
pragma=">=0.6.0 <0.9.0"

# Remove all existing interfaces and abis (from the immediate directory only).
rm -rf $target
mkdir -p $target

echo "Generating interfaces ..."

# Read interfaces.txt line by line and use `cast interface` to generate the interfaces.
while read -r line; do
  # Skip empty lines and lines starting with `#`.
  if [[ -z "$line" || "$line" == \#* ]]; then
    continue
  fi
  
  # The line format is `output: input`.
  output="$(echo $line | cut -d ':' -f1 | xargs)"
  input="$(echo $line | cut -d ':' -f2 | xargs)"
  if [[ -z "$output" || -z "$input" ]]; then
    echo "Invalid line format in $registry ($line)"
    exit 1;
  fi
  
  # Extract the output name of the interface from the output path.
  name="$(basename $output | cut -d '.' -f1)"
  if [[ -z "$name" ]]; then
    echo "Invalid output $output in $registry"
    exit 1
  fi
  
  # Prepend the interfaces directory to the output path and check the file extension.
  output="$target/$output"
  if [[ ! "$input" == *.abi.json ]]; then
    echo "Invalid extension for interface source $input"
    exit 1
  fi
  
  # If the input is a path, use it directly. Otherwise, try to find the file in the artifacts directory.
  if echo "$input" | grep -q "/"; then
    path="$input"
  else
    path="$(find $artifacts -type f -name $input | head -n 1)"
  fi
  
  # Check if the source file was found. If not, try alternative files based on a pattern (e.g. `Dispatcher.*.abi.json` instead of `Dispatcher.abi.json`).
  if [[ -z "$path" || ! -f "$path" ]]; then
    alternative="$(find $artifacts -type f -name "$(basename $input .abi.json).*.abi.json" | sort -Vr | head -n 1)"
    if [[ -z "$alternative" || ! -f "$alternative" ]]; then
      echo "Failed to locate source file for $input"
      exit 1
    else
      path="$alternative"
    fi
  fi
  
  # Create the parent directory.
  mkdir -p "$(dirname $output)"
  
  # Generate the interface using `cast interface`.
  cast interface "$path" -o "$output" -n "$name" --pragma "$pragma"
  
  # Copy the abi file to the interfaces directory.
  cp "$path" "$(dirname $output)/$name.abi.json"
done < "$registry"

# Create typescript files for each abi file.
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
