
FROM httpd:latest

RUN mkdir -p /etc/ssl/apache2/angular-yourbook
RUN mkdir -p /etc/ssl/apache2/angular-yourbook

COPY ./scripts/httpd-vhosts-443.conf /usr/local/apache2/conf/

cat /usr/local/apache2/conf/httpd-vhosts.conf | grep -v "httpd-vhosts-443.conf" | sudo tee /usr/local/apache2/conf/httpd-vhosts.conf > /dev/null
echo "Include /usr/local/apache2/conf/httpd-vhosts-443.conf" | sudo tee -a /usr/local/apache2/conf/httpd-vhosts.conf > /dev/null

cat /usr/local/apache2/conf/httpd.conf | grep -v "Listen 443" | sudo tee /usr/local/apache2/conf/httpd.conf > /dev/null
echo "Listen 443" | sudo tee -a /usr/local/apache2/conf/httpd.conf > /dev/null

cat /usr/local/apache2/conf/extra/httpd-ssl.conf | grep -v "VirtualHost" | sudo tee /usr/local/apache2/conf/extra/httpd-ssl.conf > /dev/null
cat /usr/local/apache2/conf/extra/httpd-ssl.conf | grep -v "443" | sudo tee /usr/local/apache2/conf/extra/httpd-ssl.conf > /dev/null

COPY ./studi-public.crt /etc/ssl/apache2/angular-yourbook/
COPY ./studi-private.key /etc/ssl/apache2/angular-yourbook/
COPY ./dist/studi-cacert.crt /etc/pki/ca-trust/source/anchors/

COPY ./dist/yourbook /usr/local/apache2/html/

RUN update-ca-trust
