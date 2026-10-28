<?php

require_once __DIR__ . '/../../core/Controller.php';

class FrontendController extends Controller
{
    public function index()
    {
        $this->render('app', array('title' => 'Grooming Dr. Meow'));
    }
    
    public function app()
    {
        $this->render('app', array('title' => 'Grooming Dr. Meow'));
    }
}
