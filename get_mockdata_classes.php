<?php

header('Content-Type: application/javascript');

$dataDir    = getcwd() . '/data/';
$packageDir = $dataDir . 'package/';
$json       = $packageDir . 'order_include.json';
$handle     = fopen($json, 'r');
$files      = json_decode(fread($handle, filesize($json)));

fclose($handle);

foreach ($files as $filename) {
    $filename = $packageDir . $filename;
    $handle   = fopen($filename, 'r');
    $contents = fread($handle, filesize($filename));

    fclose($handle);

    echo $contents;
}

$files = scandir('data/');

foreach ($files as $file) {
    if (substr($file, -3) == '.js') {
        $filename = $dataDir . $file;
        $handle   = fopen($filename, 'r');
        $contents = fread($handle, filesize($filename));

        fclose($handle);

        echo $contents;
    }
}
