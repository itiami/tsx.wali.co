#!/bin/bash

# Define the output directory and file

wdir="$PWD"; [ "$PWD" = "/" ] && wdir=""
case "$0" in
  /*) scriptdir="${0}";;
  *) scriptdir="$wdir/${0#./}";;
esac

outputDir="${scriptdir%/*}/sysHealth"
outputFile="${outputDir}/sysInfo.txt"

# Create the output directory if it doesn't exist
mkdir -p "${outputDir}"

# Start writing to the outputFile
{
    echo "System Health Information"
    echo "========================="
    echo ""
    
    # Memory Usage
    echo "1. Memory Usage:"
    free -h
    echo ""
    
    # Top 5 Process Usage
    echo "2. Top 5 Process Usage:"
    ps -eo %mem,%cpu,comm --sort=-%mem | head -n 6
    echo ""
    
    # Hard Disk Usage
    echo "3. Hard Disk Usage:"
    df -h
    echo ""
    
    # Listening Ports
    echo "4. Listening Ports:"
    #ss -tulwn | grep LISTEN # or...
    lsof -i -P -n | grep node
    lsof -i -P -n | grep :4200
    echo ""
    
} > "${outputFile}"

# Output the location of the saved information
echo "System information saved to ${outputFile}"
