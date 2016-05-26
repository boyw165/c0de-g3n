var fs = require('fs');
var program = require("commander");

// Command line help.
program
    .version("0.0.1")
    .usage("-o [file] [options]")
    .option("-o, --output [file]", "The output CSV file.")
    .parse(process.argv);
if (!program.output) {
    program.help();
}