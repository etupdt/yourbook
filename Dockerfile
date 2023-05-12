
FROM httpd:latest

SHELL ["/bin/bash", "-c"]

RUN mkdir -p /etc/ssl/apache2/angular-yourbook
RUN mkdir -p /etc/ssl/apache2/angular-yourbook

COPY ./scripts/httpd-vhosts-443.conf /usr/local/apache2/conf/

#RUN cat /usr/local/apache2/conf/extra/httpd-vhosts.conf | grep -v "httpd-vhosts-443.conf" > /usr/local/apache2/conf/extra/httpd-vhosts.conf
RUN echo "Include /usr/local/apache2/conf/httpd-vhosts-443.conf" >> /usr/local/apache2/conf/extra/httpd-vhosts.conf

#RUN cat /usr/local/apache2/conf/httpd.conf | grep -v "Listen 443" > /usr/local/apache2/conf/httpd.conf
RUN echo "Listen 443" >> /usr/local/apache2/conf/httpd.conf

RUN cat /usr/local/apache2/conf/extra/httpd-ssl.conf | grep -v "VirtualHost" > /usr/local/apache2/conf/extra/httpd-ssl.conf
RUN cat /usr/local/apache2/conf/extra/httpd-ssl.conf | grep -v "443" > /usr/local/apache2/conf/extra/httpd-ssl.conf

COPY ./studi-public.crt /etc/ssl/apache2/angular-yourbook/
COPY ./studi-private.key /etc/ssl/apache2/angular-yourbook/

RUN apt-get install -y ca-certificates
RUN cp studi-cacert.crt /usr/local/share/ca-certificates
RUN update-ca-certificates

COPY ./dist/yourbook /usr/local/apache2/html/

RUN update-ca-trust
