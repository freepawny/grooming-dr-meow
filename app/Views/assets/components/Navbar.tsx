import { useState, useEffect, useRef, type MouseEvent } from 'react'

interface NavbarProps {
  onBookingClick: () => void
}

function Navbar({ onBookingClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('layanan')
  const [navIndicatorStyle, setNavIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const [showShadow, setShowShadow] = useState(false)
  const navLinksRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navLinksRef.current && indicatorRef.current) {
      const activeElement = navLinksRef.current.querySelector('.is-active') as HTMLElement | null
      if (activeElement) {
        setNavIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        })
      }
    }
  }, [activeLink])

  const moveIndicator = (link: HTMLElement) => {
    if (indicatorRef.current) {
      setNavIndicatorStyle({
        left: link.offsetLeft,
        width: link.offsetWidth,
        opacity: 1,
      })
    }
  }

  const handleLinkClick = (section: string) => {
    setActiveLink(section)
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-50 ${showShadow ? 'shadow-sm' : ''}`}
    >
      <div className="dm-container">
        <div className="h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <img src="/assets/logo.png" alt="Logo Grooming Dr. Meow" className="w-40 sm:w-44 h-auto object-contain" />
          </a>

          <nav id="mainNav" ref={navLinksRef} className="hidden lg:flex items-center gap-1 relative">
            <span
              id="navIndicator"
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-0 rounded-full bg-sky-100 transition-all duration-300 ease-out pointer-events-none"
              style={navIndicatorStyle}
            />
            <a
              href="#layanan"
              className={`dm-nav-link ${activeLink === 'layanan' ? 'is-active' : ''}`}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => moveIndicator(e.currentTarget)}
              onClick={() => handleLinkClick('layanan')}
            >
              Layanan
            </a>
            <a
              href="#alur"
              className={`dm-nav-link ${activeLink === 'alur' ? 'is-active' : ''}`}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => moveIndicator(e.currentTarget)}
              onClick={() => handleLinkClick('alur')}
            >
              Alur Pemesanan
            </a>
            <a
              href="#harga"
              className={`dm-nav-link ${activeLink === 'harga' ? 'is-active' : ''}`}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => moveIndicator(e.currentTarget)}
              onClick={() => handleLinkClick('harga')}
            >
              Harga
            </a>
            <a
              href="#lokasi"
              className={`dm-nav-link ${activeLink === 'lokasi' ? 'is-active' : ''}`}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => moveIndicator(e.currentTarget)}
              onClick={() => handleLinkClick('lokasi')}
            >
              Lokasi
            </a>
            <a
              href="#testimoni"
              className={`dm-nav-link ${activeLink === 'testimoni' ? 'is-active' : ''}`}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => moveIndicator(e.currentTarget)}
              onClick={() => handleLinkClick('testimoni')}
            >
              Testimoni
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" data-open-booking className="hidden sm:inline-flex dm-button-primary" onClick={onBookingClick}>
              Reservasi Sekarang <span>→</span>
            </button>

            <button
              id="menuButton"
              type="button"
              aria-label="Buka menu"
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden w-11 h-11 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div id="mobileMenu" className={`lg:hidden pb-5 ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <nav className="flex flex-col gap-1">
            <a href="#layanan" className="dm-nav-link py-3 hover:bg-sky-100" onClick={() => handleLinkClick('layanan')}>Layanan</a>
            <a href="#alur" className="dm-nav-link py-3 hover:bg-sky-100" onClick={() => handleLinkClick('alur')}>Alur Pemesanan</a>
            <a href="#harga" className="dm-nav-link py-3 hover:bg-sky-100" onClick={() => handleLinkClick('harga')}>Harga</a>
            <a href="#lokasi" className="dm-nav-link py-3 hover:bg-sky-100" onClick={() => handleLinkClick('lokasi')}>Lokasi</a>
            <a href="#testimoni" className="dm-nav-link py-3 hover:bg-sky-100" onClick={() => handleLinkClick('testimoni')}>Testimoni</a>
            <button type="button" data-open-booking className="mt-2 dm-button-primary" onClick={onBookingClick}>
              Reservasi Sekarang
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar