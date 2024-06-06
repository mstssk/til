#!/bin/sh -eux

# Go to the root directory
cd `dirname $0`/..

# Download latest ffmpeg
TMPFILE="`mktemp -d -t FFMPEG`/ffmpeg.zip"
curl  -L -o $TMPFILE https://evermeet.cx/ffmpeg/getrelease/zip
unzip -o $TMPFILE -d ./bin
./bin/ffmpeg -version
rm $TMPFILE

tput bel # Done
