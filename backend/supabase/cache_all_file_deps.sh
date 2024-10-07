#!/bin/bash

# Set the path to your import map
IMPORT_MAP="import_map.json"

# Find all .ts files in the current directory and subdirectories
find . -type f -name "*.ts" | while read file; do
    echo "Caching $file with Deno..."
    deno cache "$file" --import-map $IMPORT_MAP
done

echo "Caching complete."
