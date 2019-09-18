FROM postgres:latest

WORKDIR /postgrest

RUN apt-get update
RUN apt-get -y install curl xz-utils netcat

RUN curl -Lo postgrest.tar.xz https://github.com/PostgREST/postgrest/releases/download/v6.0.2/postgrest-v6.0.2-ubuntu.tar.xz
RUN xz -d postgrest.tar.xz
RUN tar -xvf postgrest.tar
RUN chmod +x postgrest
RUN mv postgrest /usr/local/bin/postgrest

RUN curl -L https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/6.0.3/flyway-commandline-6.0.3-linux-x64.tar.gz | tar xvz && ln -s `pwd`/flyway-6.0.3/flyway /usr/local/bin

COPY ./backend-res/migrate-and-postgrest.sh /postgrest/migrate-and-postgrest.sh
RUN chmod +x migrate-and-postgrest.sh

RUN service postgresql restart && sleep 5 && createdb pankdb

ENTRYPOINT /postgrest/migrate-and-postgrest.sh

