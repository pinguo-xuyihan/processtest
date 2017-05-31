#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
#cd /Users/yaweiyihan/Desktop/code/processtest/testCases/M2
cd /home/worker/data/www/processtest/testCases/M2
rm inAppAddP1.xml
casperjs test inAppAddP1.js