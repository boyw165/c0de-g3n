#!/bin/sh

BASEDIR=$(dirname "$0")
echo "$BASEDIR"

cd $BASEDIR

echo "Updating npm modules..."
npm install
echo "Updating npm modules... Done"

CSV_FILE="Captions.swift.csv"

echo "Getting Google Spreadsheet..."
node getCaptionsSpreadSheet.js -o $CSV_FILE
if [ "$?" = "0" ]; then
    echo "Getting Google Spreadsheet... Done"

    echo "Converting CSV file to codes..."
    if [ "$?" = "0" ]; then
        node genCaptionsSwiftFromCsv.js -i $CSV_FILE -o ../SelfyOracle/Captions.swift
        echo "Converting CSV file to codes... Done"
    fi
fi