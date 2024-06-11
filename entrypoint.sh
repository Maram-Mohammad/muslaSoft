#!/usr/bin/env bash

# wait-for-it.sh script location
WAIT_FOR_IT="./wait-for-it.sh"

# PostgreSQL host and port
DB_HOST=${DATABASE_HOST:-postgres}
DB_PORT=${DATABASE_PORT:-5432}

# Wait for PostgreSQL to be ready
bash $WAIT_FOR_IT $DB_HOST:$DB_PORT --timeout=60 --strict -- echo "PostgreSQL is up - executing command"

# Start the application
exec "$@"
