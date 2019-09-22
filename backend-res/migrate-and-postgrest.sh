#!/usr/bin/env bash

sleep 20;

flyway -url=${POSTGRES_URI} -schemas=${PGRST_DB_SCHEMA} -user=${POSTGRES_USER} -password=${POSTGRES_PASSWORD} -connectRetries=60 migrate

postgrest /etc/postgrest.conf