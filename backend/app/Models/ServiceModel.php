<?php
// app/Models/ServiceModel.php
// Model untuk mengelola data layanan Grooming Dr. Meow

require_once __DIR__ . '/../../includes/helpers.php';

class ServiceModel
{
    private $services;
    
    public function __construct()
    {
        $this->services = $this->loadServices();
    }
    
    /**
     * Memuat data layanan dari file JSON
     */
    private function loadServices()
    {
        $data = readJsonFile('services.json');
        if (empty($data)) {
            return array();
        }
        return $data;
    }
    
    /**
     * Mengambil semua data layanan
     */
    public function getAllServices()
    {
        return $this->services;
    }
    
    /**
     * Mengambil data layanan berdasarkan ID
     */
    public function getServiceById($id)
    {
        foreach ($this->services as $service) {
            if (isset($service['id']) && $service['id'] === $id) {
                return $service;
            }
        }
        return null;
    }
    
    /**
     * Mengambil informasi profil layanan
     */
    public function getServiceProfile($id)
    {
        $service = $this->getServiceById($id);
        if ($service) {
            return array(
                'id' => isset($service['id']) ? $service['id'] : '',
                'name' => isset($service['name']) ? $service['name'] : '',
                'price' => isset($service['price']) ? $service['price'] : 0
            );
        }
        return null;
    }
}
