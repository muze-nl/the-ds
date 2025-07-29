#!/bin/bash
cat ../src/*.css | sed "s/@import .*\.css;//" > ../dist/theds.css