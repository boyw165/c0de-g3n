#!/bin/sh

BASEDIR=$(dirname "$0")
echo "$BASEDIR"

cd $BASEDIR

echo "Updating npm modules..."
npm install
echo "Updating npm modules... Done"

echo "Getting Google Spreadsheet..."
node getGoogleSpreadSheet.js -o input.csv
echo "Getting Google Spreadsheet... Done"

echo "Converting CSV file to codes..."
node genSwiftFromCsv.js -o ../SelfyOracle/Captions.swift
echo "Converting CSV file to codes... Done"