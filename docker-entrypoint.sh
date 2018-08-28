#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
# http://stackoverflow.com/questions/19622198/what-does-set-e-mean-in-a-bash-script
set -e

# Define help message
show_help() {
    echo """
Usage: docker run <imagename> COMMAND
Commands:
bash     : Start a bash shell
setup_db : Setup the initial database.
help     : Show this message
"""
}

# Run
case "$1" in
    bash)
        /bin/bash "${@:2}"
    ;;
    setup_db)
        psql -h postgres -U postgres -c "CREATE DATABASE dev_db"
    ;;
    *)
        show_help
    ;;
esac
