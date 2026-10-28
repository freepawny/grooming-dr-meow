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
    // Load base CSS
    if (file_exists(__DIR__ . '/../assets/index.css')) {
        echo '<link rel="stylesheet" href="/app/Views/assets/index.css">' . "\n";
    }
    if (file_exists(__DIR__ . '/../assets/base.css')) {
        echo '<link rel="stylesheet" href="/app/Views/assets/base.css">' . "\n";
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
    // Load main.tsx as module
    if (file_exists(__DIR__ . '/../assets/main.tsx')) {
        echo '<script type="module" src="/app/Views/assets/main.tsx"></script>' . "\n";
    }
    ?>
</body>
</html>
