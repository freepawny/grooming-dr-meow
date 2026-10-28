<?php

require_once __DIR__ . '/../../includes/helpers.php';

class Service
{
    public function getAllServices()
    {
        return readJsonFile('services.json');
    }
    
    public function getServiceById($id)
    {
        $services = $this->getAllServices();
        foreach ($services as $service) {
            if (isset($service['id']) && $service['id'] === $id) {
                return $service;
            }
        }
        return null;
    }
}
