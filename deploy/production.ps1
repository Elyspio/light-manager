### Conf ###
$hostname = '10.0.50.20'
$username = 'ubuntu'
$appLocation = "/var/apps/light-manager"
$sshConnectionString = "$( $username )@$( $hostname )"
### Conf ###

### Set configuration files ###
Write-Host "`n`nSetting up configs"
invoke-expression -Command  "$( $PSScriptRoot )/config.ps1  prod"
### Set configuration files ###

### Build ###
$origin = Get-Location;
Set-Location $PSScriptRoot
Write-Host "`nBuilding:"

Write-Host "`tmanager" -NoNewline
Set-Location ../manager
./node_modules/.bin/tsc
Write-Host "`tDone"

Write-Host "`tfront"  -NoNewline
Set-Location ../front
Remove-Item -Recurse -Force  build
yarn run build | Out-Null
Write-Host "`tDone"
### Build ###

### Deployment ###
Set-Location ..

Write-Host "`n`nDeployment to $( $appLocation )/light-manager"
Write-Host "`tCreating folder 'front' and 'manager'" -NoNewline
ssh "$sshConnectionString" "mkdir -p $( $appLocation )/front && mkdir -p $( $appLocation )/manager"
Write-Host "`tDone"


Write-Host "`nUploading front's files"  -NoNewline
bash.exe -c "rsync -av -e ssh  front/build/* $( $sshConnectionString ):$( $appLocation )/front"
Write-Host "`tDone"

Write-Host "`nUploading manager's files"  -NoNewline
bash.exe -c  "rsync -av -e ssh  manager/build/* manager/package.json $( $sshConnectionString ):$( $appLocation )/manager"
Write-Host "`tDone"

Write-Host "`n`nInstalling modules in $( $appLocation )/manager" -NoNewline
ssh "$sshConnectionString" "cd $( $appLocation )/manager && npm i"
Write-Host "`n`nOk Deployment finished"
### Deployment ###


### Rolling back configuration files ###
Write-Host "`n`n Rolling back configs"
invoke-expression -Command  "$( $PSScriptRoot )/config.ps1  dev"
### Rolling back configuration files ###

Set-Location $origin
