import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Announcement from './components/Announcement'
import Services from './components/Services'
import BookingFlow from './components/BookingFlow'
import Price from './components/Price'
import BookingCta from './components/BookingCta'
import Location from './components/Location'
import Testimonial from './components/Testimonial'
import ChatButton from './components/ChatButton'
import ChatPanel from './components/ChatPanel'
import BookingModal from './components/BookingModal'
import Footer from './components/Footer'
import { useState } from 'react'

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <Navbar onBookingClick={() => setIsBookingOpen(true)} />
      <main>
        <Hero onBookingClick={() => setIsBookingOpen(true)} onServicesClick={() => {}} />
        <Announcement />
        <Services />
        <BookingFlow />
        <Price />
        <BookingCta onBookingClick={() => setIsBookingOpen(true)} />
        <Location />
        <Testimonial />
      </main>
      <ChatButton onClick={() => setIsChatOpen(true)} />
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Footer />
    </>
  )
}

export default App