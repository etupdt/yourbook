#!/bin/bash

log=/var/log/deploy/restartapache_synffront.log

echo 'exec restartapache.sh' |& sudo tee $log

echo '<=======================  apache & php  ===========================>' | sudo tee -a $log

#sudo yum install httpd -y |& sudo tee -a $log

#curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -

#=============================================== apache =====================================================
echo 'apache' | sudo tee -a $log

cat /etc/httpd/conf/httpd.conf | grep -v "httpd-vhosts-443.conf" | sudo tee /etc/httpd/conf/httpd.conf > /dev/null
echo "Include /var/www/html/login_front_material/scripts/httpd-vhosts-443.conf" | sudo tee -a /etc/httpd/conf/httpd.conf > /dev/null

cat /etc/httpd/conf/httpd.conf | grep -v "Listen 443" | sudo tee /etc/httpd/conf/httpd.conf > /dev/null
echo "Listen 443" | sudo tee -a /etc/httpd/conf/httpd.conf > /dev/null

cat /etc/httpd/conf.d/ssl.conf | grep -v "VirtualHost" | sudo tee /etc/httpd/conf.d/ssl.conf > /dev/null
cat /etc/httpd/conf.d/ssl.conf | grep -v "443" | sudo tee /etc/httpd/conf.d/ssl.conf > /dev/null

sudo service httpd stop |& tee -a $log
sudo service httpd start |& tee -a $log
