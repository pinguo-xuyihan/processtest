#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
cd /home/worker/data/www/processtest/testCases/M1/banner
rm feedCopyP1.xml
casperjs test feedCopyP1.js