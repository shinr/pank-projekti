#!/usr/bin/env bash

service postgresql start

while ! nc -z localhost 5432; do \
    sleep 0.5;
done;

flyway migrate

postgrest