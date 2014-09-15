<?php

$framework = $_REQUEST['framework'];
$version   = $_REQUEST['version'];

if (preg_match('/[0-9]$/', $framework) == 0) {
    $framework = $framework . substr($version, 0, 1);
}

$script = 'scripts/' . $framework . '.js';
$css    = 'css/' . $framework . '.css';

if (!file_exists($script)) {
    exit('Script not found for that framework: ' . $script);
}

if (!file_exists($css)) {
    exit('CSS not found for that framework: ' . $css);
}

$config = 'config.json';
$handle = fopen($config, 'r');
$config = json_decode(fread($handle, filesize($config)));

fclose($handle);

$classes = $config->classMap;

if (empty($classes->$framework)) {
    exit('Framework not found in $classes map: ' . $framework);
}

$className = $classes->$framework;

require_once('frameworks/' . $className . '.php');

$class  = new $className($config, $version, empty($_REQUEST['theme']) ? NULL : $_REQUEST['theme']);
$assets = $class->getAssets();

?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Test</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

    <script type="text/javascript">
        window.demoConfigs = {
            jsHttpPath : '<?=$class->getHttpPath()?>'
        };
    </script>

    <?php

    foreach ($assets['css'] as $file) {
        echo '<link rel="stylesheet" type="text/css" href="' . $file . '" />';
    }

    foreach ($assets['js'] as $file) {
        echo '<script type="text/javascript" src="' . $file . '"></script>';
    }

    echo '<script type="text/javascript" src="/get_mockdata_classes.php"></script>';
    echo '<script type="text/javascript" src="/frameworks/application.js"></script>';
    echo '<link rel="stylesheet" type="text/css" href="/' . $css    . '" />';
    echo '<script type="text/javascript" src="/' .          $script . '"></script>';

    foreach ($config->extras as $name => $extra) {
        if (isset($_REQUEST[$name])) {
            if (!empty($extra->css)) {
                if (gettype($extra->css) == 'array') {
                    foreach ($extra->css as $file) {
                        echo '<link rel="stylesheet" type="text/css" href="' . $file . '" />';
                    }
                } else {
                    echo '<link rel="stylesheet" type="text/css" href="' . $extra->css . '" />';
                }
            }

            if (!empty($extra->js)) {
                if (gettype($extra->js) == 'array') {
                    foreach ($extra->js as $file) {
                        echo '<script type="text/javascript" src="' . $file . '"></script>';
                    }
                } else {
                    echo '<script type="text/javascript" src="' . $extra->js . '"></script>';
                }
            }
        }
    }

    ?>

</head>
<body></body>
</html>
