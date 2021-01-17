#!/bin/bash

origin=$(pwd)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

. "$DIR/variables.sh"


rm -rdf "$DIR/../back/build"
rm -rdf "$DIR/../front/build"


# Check if we are running on WSL (use Powershell increases performances a lot)
if [ "$(uname -r | sed -n 's/.*\( *Microsoft *\).*/\1/ip')" = 'microsoft' ]; then
  powershell.exe "cd ../front ; yarn build"
  powershell.exe "cd ../back ; yarn build"
else
  cd "$DIR/../front" && npm run build
  cd "$DIR/../back" && npm run build
fi

cp "$DIR/DockerFile" "$DIR/../DockerFile"

cd "$DIR/.." && docker buildx build --platform linux/arm64,linux/amd64  -f ./DockerFile  -t elyspio/$app --push .

rm "$DIR/../DockerFile"

cd $origin
