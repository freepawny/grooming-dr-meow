<?php
// classes/GroomingService.php
// Class untuk merepresentasikan data layanan Grooming Dr. Meow (Task 01-03 OOP)

class GroomingService
{
    private $id;
    private $name;
    private $price;
    private $description;
    private $features;

    /**
     * Constructor untuk menginisialisasi data layanan grooming
     */
    public function __construct($id = '', $name = '', $price = 0, $description = '', array $features = array())
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->description = $description;
        $this->features = $features;
    }

    /**
     * Mendapatkan profil/info layanan grooming
     */
    public function getProfile()
    {
        return array(
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'description' => $this->description
        );
    }

    /**
     * Mendapatkan daftar fitur/layanan yang termasuk
     */
    public function getFeatures()
    {
        return $this->features;
    }

    /**
     * Getter untuk ID layanan
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Getter untuk nama layanan
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Getter untuk harga layanan
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Getter untuk deskripsi layanan
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Format harga ke dalam format Rupiah
     */
    public function getFormattedPrice()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }
}
