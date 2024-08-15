#!/bin/bash

# Source and destination directories
SRC_DIR="./src/content/docs"
DEST_DIR="./public/images"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Find and copy image files
find "$SRC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.tiff" -o -iname "*.svg" \) -exec cp -f {} "$DEST_DIR/" \;

echo "Image files copied successfully from $SRC_DIR to $DEST_DIR."
