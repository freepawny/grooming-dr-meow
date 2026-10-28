<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($data['title']) ? htmlspecialchars($data['title'], ENT_QUOTES, 'UTF-8') : 'Grooming Dr. Meow'; ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .navbar {
            background-color: #f59e0b;
            padding: 1rem 2rem;
            color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .navbar a {
            color: white;
            text-decoration: none;
            margin-right: 1.5rem;
            font-weight: bold;
        }
        .navbar a:hover {
            text-decoration: underline;
        }
        .container {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 1rem;
        }
        h1, h2 {
            color: #333;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="/index_mvc.php?url=home">Beranda</a>
        <a href="/index_mvc.php?url=service">Layanan</a>
        <a href="/index_mvc.php?url=home/about">Tentang</a>
    </nav>
    <div class="container">
