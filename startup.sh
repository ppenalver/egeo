#!/usr/bin/env bash

set -u -e -o pipefail

set +x

while true; do
    read -p "Do you want to download the latest of repo? (CAUTION!!! This erase any local change) [y/n] " yn
    case $yn in
        [Yy]* ) git checkout -- . && git clean -fd && git pull; break;;
        [Nn]* ) echo "continue"; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

while true; do
    read -p "Do you want to reinstall packages? [y/n] " yn
    case $yn in
        [Yy]* ) npm i; break;;
        [Nn]* ) echo "continue"; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Generate package
npm run build:demo-app

# Remove old image if exists
IMG_ID=`docker ps -aq --filter "ancestor=sds-demos"`
if [[ $IMG_ID ]]; then
   docker rm -f $IMG_ID
fi

# Generate docker and run
docker build -t sds-demos .
docker run -p 9502:9502 -itd sds-demos

set -x
