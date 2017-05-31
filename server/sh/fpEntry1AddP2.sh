#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
#cd /Users/yaweiyihan/Desktop/code/processtest/testCases/M3/FpEntry1
cd /home/worker/data/www/processtest/testCases/M3/FpEntry1
rm fpEntry1AddP2.xml
casperjs test fpEntry1AddP2.js