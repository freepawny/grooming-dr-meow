<?php
// app/Controllers/ServiceController.php
// Controller untuk menangani request halaman layanan (MVC Task 02)

require_once __DIR__ . '/../../core/Controller.php';

class ServiceController extends Controller
{
    private $serviceModel;
    
    public function __construct()
    {
        // Memanggil Model (Model-Controller Connection)
        $this->serviceModel = $this->model('ServiceModel');
    }
    
    /**
     * Method index - Menangani request untuk menampilkan semua layanan
     */
    public function index()
    {
        // Mengambil data dari Model
        $services = $this->serviceModel->getAllServices();
        
        // Menyiapkan data untuk View dan mengirim data (Controller-View Connection)
        $data = array(
            'title' => 'Layanan Kami - Grooming Dr. Meow',
            'services' => $services,
            'page' => 'service_list'
        );
        
        // Mengarahkan ke View
        $this->view('service/index', $data);
    }
    
    /**
     * Method show - Menangani request untuk menampilkan detail layanan
     */
    public function show($id = null)
    {
        if ($id === null) {
            header('Location: /index_mvc.php?url=service');
            exit;
        }
        
        // Mengambil data dari Model berdasarkan ID
        $service = $this->serviceModel->getServiceById($id);
        
        // Menyiapkan data untuk View
        $data = array(
            'title' => $service ? $service['name'] . ' - Grooming Dr. Meow' : 'Layanan Tidak Ditemukan',
            'service' => $service,
            'page' => 'service_detail'
        );
        
        // Mengarahkan ke View
        $this->view('service/show', $data);
    }
}
