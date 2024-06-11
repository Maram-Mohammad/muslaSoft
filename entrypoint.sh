#!/usr/bin/env bash

# Wait for the database to be ready
./wait-for-it.sh postgres:5432 -- "$@"

