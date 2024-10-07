#!/bin/bash

# Find all .ts files in the current directory and subdirectories
all_files=($(find . -type f -name "*.ts")) # Store all found files in an array
total_files=${#all_files[@]} # Count total number of files
echo "🦧 Running custom tsc... 🦧"
processed_files=0 # Initialize processed file counter
declare -a error_files # Array to keep track of files that failed checking

# Function to draw the progress bar
draw_progress_bar() {
    # $1 - total files, $2 - processed files
    let progress=($2*100/$1) # Percentage of progress
    let filled_length=($progress*40/100) # Assuming the progress bar width is 40 characters
    bar=""
    for ((i=0; i<filled_length; i++)); do
        bar="${bar}#"
    done
    for ((i=filled_length; i<40; i++)); do
        bar="${bar}-"
    done
    printf "\rProgress: [%s] %s%% (%s/%s)" "$bar" "$progress" "$2" "$1"
}

# Initial draw of the progress bar
draw_progress_bar $total_files $processed_files

# Loop through all files and check them
for file in "${all_files[@]}"; do
    # Run 'deno check' on each file
    output=$(deno check "$file" --import-map import_map.json 2>&1)
    result=$?
    # Increment processed files count
    ((processed_files++))
    # Update the progress bar
    draw_progress_bar $total_files $processed_files
    # Check if deno check was successful
    if [ $result -ne 0 ]; then
        error_files+=("$file") # Add to list of files with errors
        echo -e "\nError in '$file':\n$output\n" # Print error output for this file
    fi
done
echo -e "\nAll files checked."

# Display summary of errors if any
if [ ${#error_files[@]} -gt 0 ]; then
    echo "Errors found in the following files:"
    for error_file in "${error_files[@]}"; do
        echo "💀 $error_file"
    done
else
    echo "No errors found. All files passed successfully! 🎉"
fi
