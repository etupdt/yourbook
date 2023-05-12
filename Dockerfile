
FROM httpd:latest

RUN mkdir -p /etc/ssl/apache2/angular-yourbook
RUN mkdir -p /etc/ssl/apache2/angular-yourbook

COPY ./scripts/httpd-vhosts-443.conf /usr/local/apache2/conf/

RUN cat /usr/local/apache2/conf/extra/httpd-vhosts.conf | grep -v "httpd-vhosts-443.conf" > /usr/local/apache2/conf/extra/httpd-vhosts.conf
RUN echo "Include /usr/local/apache2/conf/httpd-vhosts-443.conf" >> /usr/local/apache2/conf/extra/httpd-vhosts.conf

RUN cat /usr/local/apache2/conf/httpd.conf | grep -v "Listen 443" > /usr/local/apache2/conf/httpd.conf
RUN echo "Listen 443" >> /usr/local/apache2/conf/httpd.conf

RUN cat /usr/local/apache2/conf/extra/httpd-ssl.conf | grep -v "VirtualHost" > /usr/local/apache2/conf/extra/httpd-ssl.conf
RUN cat /usr/local/apache2/conf/extra/httpd-ssl.conf | grep -v "443" > /usr/local/apache2/conf/extra/httpd-ssl.conf

COPY ./studi-public.crt /etc/ssl/apache2/angular-yourbook/
COPY ./studi-private.key /etc/ssl/apache2/angular-yourbook/
COPY ./studi-cacert.crt /etc/pki/ca-trust/source/anchors/

COPY ./dist/yourbook /usr/local/apache2/html/

RUN update-ca-trust
