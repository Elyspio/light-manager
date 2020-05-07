#!/usr/bin/env bash
origin=$PWD
scriptPath=`dirname $0`
cd $scriptPath
./node_modules/.bin/tsc

cd ../front
rm -rdf build
yarn run build-front

cd ..
ssh pi@elyspi "mkdir -p /home/pi/light-manager/front && mkdir -p /home/pi/light-manager/manager"
rsync -av -e ssh --exclude='*.map*' front/build pi@elyspi:/home/pi/light-manager/front/
rsync -av -e ssh --exclude='*.map*' manager/build manager/package.json pi@elyspi:/home/pi/light-manager/manager
