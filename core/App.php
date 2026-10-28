<?php

class App
{
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = array();

    public function __construct()
    {
        $url = $this->parseUrl();
        
        // Handle API routes separately
        if (isset($url[0]) && $url[0] === 'api') {
            return;
        }
        
        if (isset($url[0]) && file_exists(__DIR__ . '/../app/Controllers/' . ucfirst($url[0]) . 'Controller.php')) {
            $this->controller = ucfirst($url[0]) . 'Controller';
            unset($url[0]);
        }
        
        require_once __DIR__ . '/../app/Controllers/' . $this->controller . '.php';
        $this->controller = new $this->controller;
        
        if (isset($url[1])) {
            if (method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        }
        
        $this->params = $url ? array_values($url) : array();
        
        call_user_func_array(array($this->controller, $this->method), $this->params);
    }
    
    public function parseUrl()
    {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
        return array();
    }
}
