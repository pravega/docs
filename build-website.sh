#!/bin/bash
# Install web site dependencies and then build the web site.
set -ex
export

# When building the web site, we must specify the directory part of the published URL as BASE_URL.

pushd docs-website
yarn install
yarn run build --out-dir ../site
popd
ls -lh site
