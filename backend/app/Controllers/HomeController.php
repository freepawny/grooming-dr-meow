<?php

require_once '../core/Controller.php';

class HomeController extends Controller
{
    public function index()
    {
        $this->view('home/index', array('title' => 'Grooming Dr. Meow'));
    }
    
    public function about()
    {
        $this->view('home/about', array('title' => 'Tentang Kami'));
    }
}
