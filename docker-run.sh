#!/bin/bash

NODE_PATH="${PWD}/node_modules"

rm ${NODE_PATH} >/dev/null 2>&1
mkdir ${NODE_PATH} >/dev/null 2>&1

mount -o bind /tmp/node_modules ${NODE_PATH}

npm run serve
