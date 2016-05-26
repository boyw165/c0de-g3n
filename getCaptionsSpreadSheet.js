var fs = require('fs');
var program = require("commander");
var downloadSpreadsheet = require('download-google-spreadsheet');

// Command line help.
program
    .version("0.0.1")
    .usage("-o [file] [options]")
    .option("-o, --output [file]", "The output CSV file.")
    .parse(process.argv);
if (!program.output) {
    program.help();
}

if (!process.env.GOOGLE_DRIVE_CLIENT_ID ||
    !process.env.GOOGLE_DRIVE_CLIENT_SECRET ||
    !process.env.GOOGLE_DRIVE_FILE_ID) {
    console.log("Err: Make sure you have GOOGLE_DRIVE_CLIENT_ID and GOOGLE_DRIVE_CLIENT_SECRET environment variables.");
    process.exit(1);
}

var sheets = [{
    dest: program.output,
    fileId: process.env.GOOGLE_DRIVE_FILE_ID,
    gid: '0',
}];

var opts = {
    id: process.env.GOOGLE_DRIVE_CLIENT_ID,
    redirect: 'http://localhost:3477/',
    secret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
};

downloadSpreadsheet.default(
    sheets,
    opts,
    function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Done.');
    });