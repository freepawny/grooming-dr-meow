<?php

class Controller
{
    public function model($model)
    {
        require_once __DIR__ . '/../app/Models/' . $model . '.php';
        return new $model();
    }
    
    public function view($view, $data = array())
    {
        require_once __DIR__ . '/../app/Views/' . $view . '.php';
    }
    
    public function render($view, $data = array())
    {
        $data['content'] = __DIR__ . '/../app/Views/pages/' . $view . '.php';
        require_once __DIR__ . '/../app/Views/layouts/main.php';
    }
}
