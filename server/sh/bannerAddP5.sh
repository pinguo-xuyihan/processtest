#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
#cd /Users/yaweiyihan/Desktop/code/processtest/testCases/M1/banner
cd /home/worker/data/www/processtest/testCases/M1/banner
rm bannerAddP5.xml
casperjs test bannerAddP5.js