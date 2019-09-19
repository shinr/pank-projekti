FROM flyway/flyway

COPY ./backend-res/migrations/*.sql /flyway/sql/

ENTRYPOINT ["/flyway/flyway"]

