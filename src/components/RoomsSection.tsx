import React from 'react';
import { Wifi, Car, Coffee, Wind, Waves, Mountain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import roomImage from '../assets/room-deluxe.jpg';

export const RoomsSection: React.FC = () => {
  const { t } = useLanguage();

  const rooms = [
    {
      name: t('deluxeRoom'),
      price: '€120',
      image: roomImage,
      amenities: [Wifi, Coffee, Wind, Car],
      features: ['25 sqm', 'Garden View', 'King Bed', 'Private Balcony']
    },
    {
      name: t('seaView'),
      price: '€180',
      image: roomImage,
      amenities: [Wifi, Coffee, Waves, Wind],
      features: ['35 sqm', 'Sea View', 'King Bed', 'Terrace', 'Premium Amenities']
    },
    {
      name: t('familySuite'),
      price: '€220',
      image: roomImage,
      amenities: [Wifi, Coffee, Wind, Mountain],
      features: ['50 sqm', 'Garden & Partial Sea View', '2 Bedrooms', 'Living Area']
    }
  ];

  return (
    <section id="rooms" className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {t('roomsTitle')}
          </h2>
          <div className="w-20 h-1 bg-gradient-sea rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully designed rooms and suites, each offering comfort and Mediterranean elegance
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={index} className="group bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2">
              {/* Room Image */}
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-primary">
                  {room.price}<span className="text-xs text-muted-foreground">/night</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Room Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {room.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex space-x-3">
                  {room.amenities.map((Amenity, idx) => (
                    <div key={idx} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <Amenity className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                  ))}
                </div>

                {/* Book Button */}
                <Button 
                  variant="elegant" 
                  className="w-full group-hover:shadow-soft" 
                  size="lg"
                >
                  {t('bookNow')} - {room.price}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-cream border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              All Rooms Include
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center space-x-2">
                <Wifi className="h-4 w-4" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Wind className="h-4 w-4" />
                <span>Air Conditioning</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Coffee className="h-4 w-4" />
                <span>Welcome Amenities</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Free Parking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};