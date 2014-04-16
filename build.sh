mkdir c
node source/analyse.js
node node_modules/dependo/bin/dependo -f amd c/ > c.html
#madge --format amd --image c.png c/
rm -rf c/


