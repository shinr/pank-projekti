# su - "$POSTGRES_USER" -c '/usr/local/bin/pg_ctl -D /var/lib/postgresql/data -o "-c listen_addresses='localhost'" -w start'
PGPASSWORD=${POSTGRES_PASSWORD} psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "alter database ${POSTGRES_DB} SET \"app.jwt_secret\" TO \"${JWT_SECRET}\";"
# su - "$POSTGRES_USER" -c '/usr/local/bin/pg_ctl -D /var/lib/postgresql/data -m fast -w stop'
