<?php

require_once('Base.php');

class Touch2 extends Base {

    protected $name         = 'touch';
    protected $defaultTheme = 'Sencha Touch';

    protected function getCss($path, $theme) {
        $themeName = str_replace(' ', '-', strtolower($theme));
        $filename  = $path . 'resources/css-debug/' . $themeName . '.css';

        if (!file_exists($filename)) {
            exit('Theme not found (CSS): ' . $filename);
        }

        return array(
            $filename
        );
    }

    protected function getJs($path) {
        return array(
            $path . 'sencha-touch-debug.js'
        );
    }

}
