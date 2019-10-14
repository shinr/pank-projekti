FROM postgrest/postgrest

USER 0

RUN apt-get update && \
    apt-get -y install curl

RUN curl -L https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/6.0.3/flyway-commandline-6.0.3-linux-x64.tar.gz | tar xvz && ln -s `pwd`/flyway-6.0.3/flyway /usr/local/bin

COPY ./backend-res/migrations/*.sql /flyway/sql/

COPY ./backend-res/migrate-and-postgrest.sh /postgrest/migrate-and-postgrest.sh
RUN chmod +x /postgrest/migrate-and-postgrest.sh && \
    chmod +x /usr/local/bin/flyway

USER 1000

ENTRYPOINT ["/postgrest/migrate-and-postgrest.sh"]

