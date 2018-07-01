#!/usr/bin/env sh

# mkraw.sh - add new download speed to raw data file
#
# This script checks internet speed using Netflix's fast.com
# and adds it to the tail end of a static JavaScript file.
#
# The script is usually (in "production") executed via a cron
# job to periodically test internet download speed.
#
# ./mkraw.sh "`date`" "`./node_modules/fast-cli/cli.js`"


FASTCLI=`~/fast-cli/cli.js`
DATE=`date`



cd ~/kap-dash-ispeed
git pull
sed "s+\/\* SED TARGET \*\/+{d: \"$DATE\", s: \"$FASTCLI\"},\\
  &+" raw_data.js > raw_data.js.tmp && mv raw_data.js.tmp raw_data.js
git commit -am "New data: ${DATE}"
git push
# Remove puppeteer cruft or it'll exhaust /tmp space
rm -rf /tmp/.org.chromium.Chromium.*
