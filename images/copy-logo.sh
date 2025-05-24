#!/bin/bash

# Copy the existing logo image to logo.png
cp 1103db117d4ca57c477ca6bdf55b921d.png logo.png

# Confirm the copy was successful
if [ -f "logo.png" ]; then
    echo "Success! The logo has been copied to logo.png"
    echo "The website will now display the proper logo throughout all pages."
    
    # Optional: Remove the placeholder text file if it exists
    if [ -f "logo.png.txt" ]; then
        rm logo.png.txt
        echo "The placeholder text file (logo.png.txt) has been removed."
    fi
else
    echo "Error: Failed to copy the logo image."
fi
