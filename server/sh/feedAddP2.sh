#!/bin/sh

PATH=/Users/yaweiyihan/Documents/libs/phantomjs-2.1.1-macosx/bin:$PATH
cd /Users/yaweiyihan/Desktop/code/phantom/M1/banner
rm feedAddP2.xml
casperjs test feedAddP2.js