#!/usr/bin/env bash

psql -U ${POSTGRES_USER} -p ${POSTGRES_PASSWORD} -d ${POSTGRES_DB} -c "alter database ${POSTGRES_DB} SET \"app.jwt_secret\" TO ${JWT_SECRET};"