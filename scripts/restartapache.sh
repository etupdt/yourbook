#!/bin/bash

log=/var/log/deploy/angular-yourbook.log

echo 'exec restartapache.sh' |& sudo tee $log

aws ecr get-login-password --region eu-west-3 | sudo docker login --username AWS --password-stdin 498746666064.dkr.ecr.eu-west-3.amazonaws.com |& tee $log

sudo docker stop angular-yourbook |& tee -a $log
sudo docker rm angular-yourbook |& tee -a $log

sudo docker image rm 498746666064.dkr.ecr.eu-west-3.amazonaws.com/angular-yourbook:latest

sudo docker pull 498746666064.dkr.ecr.eu-west-3.amazonaws.com/angular-yourbook:latest |& tee -a $log
sudo docker run -p 443:443 -d --name angular-yourbook 498746666064.dkr.ecr.eu-west-3.amazonaws.com/angular-yourbook |& tee -a $log
