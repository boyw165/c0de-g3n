var fs = require('fs');
var csv = require('fast-csv');
var program = require("commander");

// Command line help.
program
    .version("0.0.1")
    .usage("-i [file] [options]")
    .option("-i, --input [file]", "The input CSV file")
    .option("-o, --output [file]", "The output file.")
    .parse(process.argv);
if (!program.input) {
    program.help();
}

var isHeader = true;

var structNameStr = "MagicCameraImageType";
var varNameStr = "captionDictionary";

var outputStr = "import Foundation\n\n" + "enum " + structNameStr + " {";

var structEntities = [];
var memberDatas = {};

// import Foundation
//
// enum MagicCameraImageType {
//     case Selfie
//     ...
// }
//
// let captionDictionary: [MagicCameraImageType : [String]] = [
//     .Selfie : ["hello hello hello"],
//     ...
// ]

fs.createReadStream(program.input)
    .pipe(csv())
    .on('data', function(data) {
        if (isHeader) {
            // Define the header string.
            isHeader = false;
            data.forEach(function(val) {
                structEntities.push(val);
                memberDatas[val] = [];
                outputStr += "\n    case " + val;
            });
            outputStr += "\n}\n\n"; 
        } else {
            // Generate the body string.
            for (var i = 0; i < data.length; ++i) {
                if (data[i]) {
                    memberDatas[structEntities[i]].push(data[i]);
                }
            }
        }
    })
    .on('end', function(data) {
        // Print the memberDatas.
        subStr = "";
        for (var i = 0; i < structEntities.length; ++i) {
            key = structEntities[i];
            subStr += "\n    ." + key + " : " + JSON.stringify(memberDatas[key]);
            if (i >= 0 && i < structEntities.length - 1) {
                subStr += ",";
            }
        }
        
        outputStr += "let " + varNameStr + ": [" + 
        structNameStr + ": [String]] = [" + subStr + "]";
        
        if (program.output) {
            fs.writeFileSync(program.output, outputStr);
        } else {
            console.log(outputStr);
        }
    });