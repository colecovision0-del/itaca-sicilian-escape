import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'it' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    rooms: 'Rooms & Rates',
    availability: 'Availability',
    contact: 'Contact',
    about: 'About',
    
    // Hero Section
    heroTitle: 'Welcome to Hotel Itaca',
    heroSubtitle: 'Experience Mediterranean luxury in the heart of Marina di Ragusa, Sicily',
    heroDescription: 'Discover our elegant boutique hotel where timeless Sicilian charm meets modern comfort',
    bookNow: 'Book Now',
    exploreRooms: 'Explore Rooms',
    
    // About Section
    aboutTitle: 'Our Story',
    aboutText: 'Hotel Itaca is a boutique gem nestled in the enchanting Marina di Ragusa, Sicily. Our hotel combines traditional Sicilian hospitality with contemporary elegance, offering guests an unforgettable Mediterranean experience.',
    
    // Rooms
    roomsTitle: 'Rooms & Suites',
    deluxeRoom: 'Deluxe Room',
    seaView: 'Sea View Suite',
    familySuite: 'Family Suite',
    fromPrice: 'From €120/night',
    
    // Contact
    contactTitle: 'Contact & Booking',
    contactSubtitle: 'Get in touch with us to plan your perfect Mediterranean getaway',
    address: 'Via Marina, 12345 Marina di Ragusa, Sicily, Italy',
    phone: '+39 0932 123456',
    email: 'info@hotelitaca.com',
    
    // Footer
    followUs: 'Follow Us',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
  },
  it: {
    // Navigation
    home: 'Home',
    rooms: 'Camere e Tariffe',
    availability: 'Disponibilità',
    contact: 'Contatti',
    about: 'Chi Siamo',
    
    // Hero Section
    heroTitle: 'Benvenuti all\'Hotel Itaca',
    heroSubtitle: 'Vivete il lusso mediterraneo nel cuore di Marina di Ragusa, Sicilia',
    heroDescription: 'Scoprite il nostro elegante boutique hotel dove il fascino siciliano si incontra con il comfort moderno',
    bookNow: 'Prenota Ora',
    exploreRooms: 'Esplora Camere',
    
    // About Section
    aboutTitle: 'La Nostra Storia',
    aboutText: 'Hotel Itaca è una gemma boutique immersa nell\'incantevole Marina di Ragusa, Sicilia. Il nostro hotel combina l\'ospitalità tradizionale siciliana con l\'eleganza contemporanea.',
    
    // Rooms
    roomsTitle: 'Camere e Suite',
    deluxeRoom: 'Camera Deluxe',
    seaView: 'Suite Vista Mare',
    familySuite: 'Suite Famiglia',
    fromPrice: 'Da €120/notte',
    
    // Contact
    contactTitle: 'Contatti e Prenotazioni',
    contactSubtitle: 'Contattaci per pianificare la tua perfetta fuga mediterranea',
    address: 'Via Marina, 12345 Marina di Ragusa, Sicilia, Italia',
    phone: '+39 0932 123456',
    email: 'info@hotelitaca.com',
    
    // Footer
    followUs: 'Seguici',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Termini e Condizioni',
  },
  es: {
    // Navigation
    home: 'Inicio',
    rooms: 'Habitaciones y Tarifas',
    availability: 'Disponibilidad',
    contact: 'Contacto',
    about: 'Nosotros',
    
    // Hero Section
    heroTitle: 'Bienvenidos al Hotel Itaca',
    heroSubtitle: 'Experimenta el lujo mediterráneo en el corazón de Marina di Ragusa, Sicilia',
    heroDescription: 'Descubre nuestro elegante hotel boutique donde el encanto siciliano se encuentra con el confort moderno',
    bookNow: 'Reservar Ahora',
    exploreRooms: 'Explorar Habitaciones',
    
    // About Section
    aboutTitle: 'Nuestra Historia',
    aboutText: 'Hotel Itaca es una joya boutique situada en la encantadora Marina di Ragusa, Sicilia. Nuestro hotel combina la hospitalidad tradicional siciliana con la elegancia contemporánea.',
    
    // Rooms
    roomsTitle: 'Habitaciones y Suites',
    deluxeRoom: 'Habitación Deluxe',
    seaView: 'Suite Vista al Mar',
    familySuite: 'Suite Familiar',
    fromPrice: 'Desde €120/noche',
    
    // Contact
    contactTitle: 'Contacto y Reservas',
    contactSubtitle: 'Ponte en contacto con nosotros para planear tu escapada mediterránea perfecta',
    address: 'Via Marina, 12345 Marina di Ragusa, Sicilia, Italia',
    phone: '+39 0932 123456',
    email: 'info@hotelitaca.com',
    
    // Footer
    followUs: 'Síguenos',
    privacyPolicy: 'Política de Privacidad',
    termsConditions: 'Términos y Condiciones',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};