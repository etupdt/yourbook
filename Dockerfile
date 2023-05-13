
FROM httpd:latest

SHELL ["/bin/bash", "-c"]

COPY ./scripts/httpd-vhosts-443.conf /usr/local/apache2/conf/extra/

RUN sed -i \
		-e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
		-e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
		-e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
		/usr/local/apache2/conf/httpd.conf

#RUN cat /usr/local/apache2/conf/extra/httpd-vhosts.conf | grep -v "httpd-vhosts-443.conf" > /usr/local/apache2/conf/extra/httpd-vhosts.conf
RUN echo "Include /usr/local/apache2/conf/extra/httpd-vhosts-443.conf" >> /usr/local/apache2/conf/extra/httpd-vhosts.conf

#RUN cat /usr/local/apache2/conf/httpd.conf | grep -v "Listen 443" > /usr/local/apache2/conf/httpd.conf
RUN sed -i 's/^DocumentRoot.*$/DocumentRoot/' /usr/local/apache2/conf/extra/httpd-ssl.conf

#RUN mv /usr/local/apache2/conf/extra/httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf.old
#RUN cat /usr/local/apache2/conf/extra/httpd-ssl.conf.old | grep -v "VirtualHost" | grep -v "443" > /usr/local/apache2/conf/extra/httpd-ssl.conf

COPY ./studi-public.crt /usr/local/apache2/conf/server.crt
COPY ./studi-private.key /usr/local/apache2/conf/server.key

RUN apt-get install -y ca-certificates
COPY ./studi-cacert.crt /usr/local/share/ca-certificates
RUN update-ca-certificates

RUN mkdir -p /usr/local/apache2/html/angular-yourbook

COPY ./dist/yourbook /usr/local/apache2/html/angular-yourbook
