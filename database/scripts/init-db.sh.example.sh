#!/bin/bash

DB_HOST="your_host"
DB_PORT="5432"
DB_NAME="your_db_name"
DB_USER="your_username"
DB_PASS="your_password"

PSQL="psql postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "Creating backup..."
pg_dump "postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}" > "backup_$(date +%Y%m%d_%H%M%S).sql"

echo "Applying migrations..."
$PSQL -f database/migrations/002_update_existing_structure.sql

