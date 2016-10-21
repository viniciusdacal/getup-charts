#!/bin/bash

if [ $# -ne 1 ] || [ "$1" == '-h' - "$1" == '--help' ]; then
    echo Usage $0 '[version_update_type]'
    exit 1
fi

version_update_type=$1
set -ex

npm version ${version_update_type}
npm run build:lib
version=$(grep version package.json |sed -e 's/[^0-9.]//g')
git commit -m "Build v$version" package.json lib/
git push
git push --tags
npm publish
