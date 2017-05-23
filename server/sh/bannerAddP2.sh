#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
cd /home/worker/data/www/processtest/testCases/M1/banner
rm bannerAddP2.xml
casperjs test bannerAddP2.js