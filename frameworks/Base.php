<?php

class Base {

    protected $theme;
    protected $version;
    protected $config;
    protected $name; //meant to be overridden in subclasses, ext or touch
    protected $defaultTheme; //meant to be overridden in subclasses

    function __construct($config, $version, $theme = NULL) {
        if (empty($theme)) {
            $theme = $this->defaultTheme;
        }

        $this->theme   = $theme;
        $this->version = $version;
        $this->config  = $config;

        if (!$config->useCdn && !file_exists($this->getPathToFramework())) {
            exit('Framework directory not found: ' . $this->getPathToFramework());
        }
    }

    public function getAliases() {
        return $this->config->aliases;
    }

    public function getConfig() {
        return $this->config;
    }

    public function getName() {
        return $this->name;
    }

    public function getTheme() {
        return $this->theme;
    }

    public function getVersion() {
        return $this->version;
    }

    public function getRealVersion() {
        $version = $this->getVersion();
        $aliases = $this->getAliases();
        $name    = $this->getName();

        if (isset($aliases->$name)) {
            $aliases = $aliases->$name;

            if (!empty($aliases->$version)) {
                $version = $aliases->$version;
            }
        }

        return $version;
    }

    public function getUseCdn() {
        $config = $this->getConfig();

        return $config->useCdn;
    }

    public function getUseAllJs() {
        $config = $this->getConfig();

        return $config->useAllJS;
    }

    public function getCdnPath() {
        $version = $this->getRealVersion();
        $config  = $this->getConfig();
        $name    = $this->getName();
        $cdn     = $config->cdn;
        $links   = $cdn->$name;

        if (isset($links->$version)) {
            return $links->$version;
        } else {
            exit('CDN path not found for that version: ' . $version);
        }
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setTheme($theme) {
        $this->theme = $theme;
    }

    public function setVersion($version) {
        $this->version = $version;
    }

    protected function getPathToFramework() {
        if ($this->getUseCdn()) {
            return $this->getCdnPath();
        } else{
            $name    = $this->getName();
            $version = $this->getRealVersion();
            $config  = $this->getConfig();

            return $config->path . $name . '/' . $version . '/';
        }
    }

    public function getAssets() {
        $theme = $this->getTheme();
        $path  = $this->getPathToFramework();
        $css   = $this->getCss($path, $theme);
        $js    = $this->getJs($path, $theme);

        foreach ($css as $idx => $file) {
            $css[$idx] = $this->getHttpPath($file);
        }

        foreach ($js as $idx => $file) {
            $js[$idx] = $this->getHttpPath($file);
        }

        return array(
            'css' => $css,
            'js'  => $js
        );
    }

    public function getHttpPath($path = NULL) {
        if (empty($path)) {
            $path = $this->getPathToFramework();
        }

        $config = $this->getConfig();

        return str_replace($config->path, $config->httpPath, $path);
    }
}
