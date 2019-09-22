#!/usr/bin/env bash

service postgresql start

while ! nc -z localhost 5432; do \
    sleep 0.5;
done;

flyway -url=${POSTGRES_URI} -schemas=${PGRST_DB_SCHEMA} -user=${POSTGRES_USER} -password=${POSTGRES_PASSWORD} -connectRetries=60 migrate

postgrest