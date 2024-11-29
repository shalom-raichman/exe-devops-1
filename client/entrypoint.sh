#!/bin/sh
# B"H

# Replace wehn contianer startup the server URL in all files.
for file in $(grep --color=never -r "server-app:3000" /usr/share/nginx/html/**/*  | awk -F ':' '{print $1}'); do 
    sed -i "s|https://server-app:3000/|${SERVER_URL}/|g" $file | grep 1449
done

# Run default entrypoint
/docker-entrypoint.sh

# Run nginx
nginx -g "daemon off;"