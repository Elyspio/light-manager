#!/bin/bash

origin=$(pwd)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


# Check if we are running on WSL (use Powershell increases performances a lot)
if [[ $(uname -r) == *"Microsoft"* ]] ; then
  echo "RUNNING ON WINDOWS"
  "$DIR/docker.ps1"
else
  echo "RUNNING ON LINUX"

  rm -rdf "$DIR/../back/build"
  rm -rdf "$DIR/../front/build"
  cd "$DIR/../front" && npm run build
  cd "$DIR/../back" && npm run build
  cp "$DIR/DockerFile" "$DIR/../DockerFile"
  cd "$DIR/.." && docker buildx build --platform linux/arm64,linux/amd64  -f ./Dockerfile  -t elyspio/light-manager --push .
  rm "$DIR/../DockerFile"
fi



cd $origin
