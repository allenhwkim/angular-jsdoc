#!/bin/bash -x
node_modules/jsdoc/jsdoc.js\
        --configure common/test_conf.json\
        --template default\
        --destination default/docs\
        --readme sample-codes/README.md\
        --recurse sample-codes\
        --tutorials sample-codes/tutorials
node_modules/jsdoc/jsdoc.js\
        --configure common/test_conf.json\
        --template angular-template\
        --destination angular-template/docs\
        --readme sample-codes/README.md\
        --recurse sample-codes\
        --tutorials sample-codes/tutorials
