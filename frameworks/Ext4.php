<?php

require_once('Base.php');

class Ext4 extends Base {

    protected $name         = 'ext';
    protected $defaultTheme = 'Classic';

    private function themeToPackage($theme) {
        return 'ext-theme-' . str_replace(' ', '-', strtolower($theme));
    }

    protected function getThemeDir($path, $theme) {
        return $path . 'packages/' . $this->themeToPackage($theme) . '/build/';
    }

    protected function getCss($path, $theme) {
        $themeName = $this->themeToPackage($theme);
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
        $themeName = $this->themeToPackage($theme);
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
