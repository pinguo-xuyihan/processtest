#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
cd /home/worker/data/www/processtest/testCases/M1/banner
rm feedAddP2.xml
casperjs test feedAddP2.js