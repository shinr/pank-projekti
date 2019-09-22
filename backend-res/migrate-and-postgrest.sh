#!/usr/bin/env bash

while ! nc -z db 5432; do \
    echo "Waiting... ${POSTGRES_URI}";
    sleep 0.5;
done;

flyway -url=${POSTGRES_URI} -schemas=${PGRST_DB_SCHEMA} -user=${POSTGRES_USER} -password=${POSTGRES_PASSWORD} -connectRetries=60 migrate

postgrest /etc/postgrest.conf