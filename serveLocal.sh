#! /bin/bash

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
IMAGE=pravega-docs-builder:latest

docker build . --tag $IMAGE

docker run -it --rm -v $(pwd):/source -p 7071:7071 $IMAGE /bin/sh -c \
"cd /source/docs-website && yarn install && yarn run start -p 7071 -h 0.0.0.0 --no-open"
