#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
#cd /Users/yaweiyihan/Desktop/code/processtest/testCases/M3/FpEntry5
cd /home/worker/data/www/processtest/testCases/M3/FpEntry5
rm fpEntry5AddP1.xml
casperjs test fpEntry5AddP1.js