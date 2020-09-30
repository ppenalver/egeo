#!/bin/sh

rm -r -f dist/ &&
mkdir -p dist/components &&
node compile-elements.js &&
node compile-helpers.js &&
rm -r -f dist/tmp
