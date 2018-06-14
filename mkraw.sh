#!/usr/bin/env sh
#
# ./mkraw.sh "`date`" "`./node_modules/fast-cli/cli.js`"

git clone git@github.com:losalamosal/jstest.git
cd jstest
sed "s+\/\* SED TARGET \*\/+{d: \"$1\", s: \"$2\"},\\
  &+" raw_data.js > raw_data.js.tmp && mv raw_data.js.tmp raw_data.js
git commit -am "New data: date"

