<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($data['title']) ? htmlspecialchars($data['title'], ENT_QUOTES, 'UTF-8') : 'Grooming Dr. Meow'; ?></title>
    <?php 
    // Load CSS files
    $cssFiles = glob(__DIR__ . '/../assets/css/*.css');
    if ($cssFiles) {
        foreach ($cssFiles as $cssFile) {
            $cssName = basename($cssFile);
            echo '<link rel="stylesheet" href="/app/Views/assets/css/' . htmlspecialchars($cssName, ENT_QUOTES, 'UTF-8') . '">' . "\n";
        }
    }
    ?>
</head>
<body>
    <?php 
    if (isset($data['content']) && file_exists($data['content'])) {
        include $data['content'];
    }
    ?>
    
    <?php 
    // Load JS files from assets
    $jsFiles = glob(__DIR__ . '/../assets/*.tsx');
    if (!$jsFiles) {
        $jsFiles = glob(__DIR__ . '/../assets/*.js');
    }
    if ($jsFiles) {
        foreach ($jsFiles as $jsFile) {
            if (basename($jsFile) === 'main.tsx') {
                echo '<script type="module" src="/app/Views/assets/' . htmlspecialchars(basename($jsFile), ENT_QUOTES, 'UTF-8') . '"></script>' . "\n";
            }
        }
    }
    ?>
</body>
</html>
