$origin = Get-Location;
$env = $args[0]

Set-Location $PSScriptRoot

$configFiles = @{
    "front" = "$( $PSScriptRoot )/../front/public/conf.json";
    "manager" = "$( $PSScriptRoot )/../manager/src/config/conf.json"
}
$conf = (Get-Content "$( $PSScriptRoot )/envs.json" | ConvertFrom-Json -AsHashtable)

foreach ($config in $configFiles.GetEnumerator())
{
    if ((Test-Path $config.Value) -eq $false)
    {
        New-Item -Path  $config.Value -ItemType "file" -Force
    }
}



ConvertTo-Json $conf[$env].front | Out-File -Path $configFiles.front
ConvertTo-Json $conf[$env].manager | Out-File -Path $configFiles.manager


Set-Location $origin
