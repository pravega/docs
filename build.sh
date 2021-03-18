#!/bin/bash
# This script can be used to manually build the web site in a Docker container.
set -ex
ROOTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
echo $ROOTPATH

DOCKER_BUILDER_TAG=pravega-docs-builder:latest
echo $DOCKER_BUILDER_TAG

docker build --tag ${DOCKER_BUILDER_TAG} $ROOTPATH
docker run -e BUILD_VERSION=$BUILD_VERSION \
           -v ${ROOTPATH}:/workspace \
           -w /workspace \
           ${DOCKER_BUILDER_TAG} \
           ./build-website.sh
