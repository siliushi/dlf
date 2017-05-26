#!/usr/bin/env node
'use strict';


const dlf = require('./bin/dlf');
const commands = require('commander')
	.version(require('./package').version)
    .command('dlf')
    .description('delete large files, Example: dlf directory')
    .parse(process.argv);

dlf(commands);
