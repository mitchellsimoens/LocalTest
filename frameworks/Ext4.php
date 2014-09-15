<?php

require_once('Base.php');

class Ext4 extends Base {

    protected $name         = 'ext';
    protected $defaultTheme = 'Classic';

    protected function getThemeDir($path, $theme) {
        $themeName = 'ext-theme-' . strtolower($theme);

        return $path . 'packages/' . $themeName . '/build/';
    }

    protected function getCss($path, $theme) {
        $themeName = 'ext-theme-' . strtolower($theme);
        $themeDir  = $this->getThemeDir($path, $theme);
        $filename  = $themeDir . 'resources/' . $themeName . '-all-debug.css';

        if (!file_exists($filename)) {
            exit('Theme not found (CSS): ' . $filename);
        }

        return array(
            $filename
        );
    }

    protected function getJs($path, $theme) {
        $themeName = 'ext-theme-' . strtolower($theme);
        $themeDir  = $this->getThemeDir($path, $theme);
        $filename  = $themeDir . $themeName . '-debug.js';

        if (!file_exists($filename)) {
            exit('Theme not found (JS): ' . $filename);
        }

        return array(
            $path . 'ext-all-debug.js',
            $filename
        );
    }

}
