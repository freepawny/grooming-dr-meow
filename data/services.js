export const services = [
  {
    id: 'basic-bath',
    name: 'Basic Fresh Bath',
    icon: '🧼',
    duration: '45 Menit',
    price: 'Rp 75.000',
    isPopular: false,
    features: [
      'Mandi sampo alami hipoalergenik',
      'Potong kuku & bersihkan telinga',
      'Pengeringan mesin tenang (Low Noise)',
      'Parfum wangi vanilla ramah hewan'
    ]
  },
  {
    id: 'medicated-bath',
    name: 'Anti-Kutu & Jamur',
    icon: '🛡️',
    duration: '60 Menit',
    price: 'Rp 125.000',
    isPopular: true, // Akan otomatis memunculkan ribbon "Paling Diminati"
    features: [
      'Seluruh fasilitas Basic Fresh Bath',
      'Sampo sulfur medicated antiparasit',
      'Sisir rapat deteksi telur & kutu aktif',
      'Olesan salep antiseptik pada jamur'
    ]
  },
  {
    id: 'styling-cut',
    name: 'Styling & Lion Cut',
    icon: '🦁',
    duration: '75 Menit',
    price: 'Rp 160.000',
    isPopular: false,
    features: [
      'Seluruh fasilitas Basic Fresh Bath',
      'Cukur model singa (Lion cut) / Teddy',
      'Perapihan bulu telapak kaki (paw)',
      'Higienitas sanitasi area anus/perut'
    ]
  },
  {
    id: 'luxury-spa',
    name: 'Luxury Spa Aroma',
    icon: '🌸',
    duration: '90 Menit',
    price: 'Rp 210.000',
    isPopular: false,
    features: [
      'Rendam air hangat ekstrak chamomile',
      'Pijat relaksasi anabul antistres',
      'Masker pelembut bulu & serum kilau',
      'Gratis camilan organik catnip basah'
    ]
  }
];