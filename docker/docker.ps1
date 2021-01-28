$origin = Get-Location

$DIR = $PSScriptRoot
$ROOT = "$DIR/.."

function removeBuilds()
{
    rm -Recurse -Force $ROOT/back/build
    rm -Recurse -Force $ROOT/front/build
}


Copy-Item "$DIR/Dockerfile" "$DIR/../Dockerfile"

# removeBuilds

Set-Location $ROOT/back
npm run build

Set-Location $ROOT/front
npm run build

cp "$DIR/Dockerfile" "$DIR/../Dockerfile"
# cd $ROOT ; docker buildx build --platform "linux/amd64"  -f ./Dockerfile -t elyspio/light-manager --push .
cd $ROOT; docker buildx build --platform "linux/amd64,linux/arm64"  -f ./Dockerfile -t elyspio/light-manager --push .
# rm "$DIR/../Dockerfile"

# removeBuilds
cd $origin

