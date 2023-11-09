#!/bin/bash

# Get memory usage information using `free` command and format the output

echo "Memory Usage Information:"

# Total memory, used memory and free memory
total_mem=$(free -m | awk '/^Mem:/ {print $2}')
used_mem=$(free -m | awk '/^Mem:/ {print $3}')
free_mem=$(free -m | awk '/^Mem:/ {print $4}')

# Output the memory info
echo "Total Memory: ${total_mem} MB"
echo "Used Memory: ${used_mem} MB"
echo "Free Memory: ${free_mem} MB"

# Show memory usage in percentage
mem_usage_percentage=$(free | awk '/^Mem:/ {printf("%.2f"), $3/$2 * 100}')
echo "Memory Usage: ${mem_usage_percentage}%"

# Buffers and cached memory
buffers=$(free -m | awk '/^Mem:/ {print $6}')
cached=$(free -m | awk '/^Mem:/ {print $7}')

# Output buffers and cached memory info
echo "Buffers Memory: ${buffers} MB"
echo "Cached Memory: ${cached} MB"

# Show available memory (free + buffers/cache)
available_mem=$(free -m | awk '/^Mem:/ {print $7}')
echo "Available Memory (Free + Buffers/Cache): ${available_mem} MB"

echo "Memory Usage Details:"
free -m

#........................

#!/bin/bash

# Memory usage
echo "Memory Usage:"
free -h
echo ""

# Top 5 process usages
echo "Top 5 Process Usage:"
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head -n 6
echo ""

# Hard disk usages
echo "Hard Disk Usage:"
df -h
echo ""

# Listening ports
echo "Listening Ports:"
netstat -tuln | grep LISTEN
