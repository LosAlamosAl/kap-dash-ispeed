#!/usr/bin/env sh

sed "s+\/\* SED TARGET \*\/+{d: \"$1\", s: \"$2\"},\\
  &+" raw_data.js > raw_data.js.tmp && mv raw_data.js.tmp raw_data.js
