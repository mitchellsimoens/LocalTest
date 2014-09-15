Mitch's Test Case
=====

Can use .htaccess (rewrite) to have URLs like:

    http://test/ext/5.0.1
    
Without htaccess, you can use URLs like:

    http://test/?framework=ext&version-5.0.1
    
You can optionally specify what theme:
    
    http://test/ext/5.0.1/Classic
    http://test/touch/2.4.0/Cupertino
    http://test/?framework=ext&version=5.0.1&theme=Neptune
    
For Ext JS, it will attempt to figure out the package name. It will replace spaces with hyphens, lowercase the name
and prefix `ext-theme-` to the name. So if you pass in `Neptune Touch`, it wille resolve to `ext-theme-neptune-touch`.

config.json
====

 - `path` This is the actual, filesystem path to the directory of containing releases. Expects subdirectories for the
 frameworks: `ext` and `touch`. Under the `ext` and `touch` directories are the different versions.
 - `httpPath` This is the URI to the releases. This will be used to turn the `path` into a webserver accessible URI.
 - `classMap` This is an object mapping the framework from the URI to the PHP class name.
 - `aliases` This is an object allowing simpler versions to be used in the URI. So instead of using 5.0.1.1255
 you can use 5.0.1.
 - `extras` This is an object describing extra CSS/JS assets that can be optionally loaded. The first level is the name,
 to load that extra, pass the name as a URL parameter, for example, http://test/touch/2.4.0/?map . Under this name is an
 object to describe the css or js assets. The css and js can have a value of a string or an array of strings.

Mock Data
====

Any .js files in the data directory (currently there is data.js but you can add as many as you want) will automatically
be loaded. Please see data.js for a small explanation on how to define endpoints.
