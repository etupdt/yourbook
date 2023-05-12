#!/bin/bash

log=/var/log/deploy/restartapache_synffront.log

echo 'exec restartapache.sh' |& sudo tee $log

aws ecr get-login-password --region eu-west-3 | sudo docker login --username AWS --password-stdin 498746666064.dkr.ecr.eu-west-3.amazonaws.com

sudo docker pull 498746666064.dkr.ecr.eu-west-3.amazonaws.com/angular-yourbook:latest
sudo docker run -p 443:443 498746666064.dkr.ecr.eu-west-3.amazonaws.com/angular-yourbook
