'use strict';

const npmlog = require('npmlog');
const read = require('readline-sync');
var fs = require("fs");
var path = require("path");

function run(dir) {
    var files = [];
    if( fs.existsSync(dir) ) {
        files = fs.readdirSync(dir);
        files.forEach(function(file,index){
            var curPath = path.join(dir,file);
            if(fs.statSync(curPath).isDirectory()) {
                run(curPath);   
            } else { 
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dir);
    }else{
        npmlog.error("给定的路径不存在，请给出正确的路径");
    }
}


function prompt() {
    const directory = read.question('Which directory to delete:').trim();

    if (directory === '') {
        npmlog.warn('Input', 'Empty input!');
        return;
    }

    return run(directory);
}

module.exports = function cli(commands) {
    if (commands.args.length === 0) {
        npmlog.info('Input delete directory');
        prompt();
    } else {
        let lastPromise = Promise.resolve();
        for (const p of commands.args) {
            lastPromise = lastPromise.then(() => run(p));
        }
    }
}

