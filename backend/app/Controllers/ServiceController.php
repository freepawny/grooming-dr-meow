<?php

require_once '../core/Controller.php';

class ServiceController extends Controller
{
    public function index()
    {
        $serviceModel = $this->model('Service');
        $services = $serviceModel->getAllServices();
        $this->view('service/index', array('title' => 'Layanan Kami', 'services' => $services));
    }
    
    public function show($id)
    {
        $serviceModel = $this->model('Service');
        $service = $serviceModel->getServiceById($id);
        $this->view('service/show', array('title' => 'Detail Layanan', 'service' => $service));
    }
}
