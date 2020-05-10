
$origin = Get-Location;

Set-Location $PSScriptRoot
./node_modules/.bin/tsc

Set-Location ../front
Remove-Item -Recurse -Force  build
yarn run build-front

Set-Location ..
ssh pi@elyspi "mkdir -p /home/pi/light-manager/front && mkdir -p /home/pi/light-manager/manager"
wsl rsync -av -e ssh --exclude='*.map*' front/build pi@elyspi:/home/pi/light-manager/front/
wsl rsync -av -e ssh --exclude='*.map*' manager/build manager/package.json pi@elyspi:/home/pi/light-manager/manager

cd $origin
