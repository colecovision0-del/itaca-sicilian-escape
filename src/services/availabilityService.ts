export interface AvailabilityData {
  date: string;
  available: boolean;
  bookingComPrice?: number;
  websitePrice?: number;
}

export interface AvailabilityResponse {
  availabilities: AvailabilityData[];
}

export const fetchAvailability = async (): Promise<AvailabilityData[]> => {
  try {
    // In production, this would be a real API call
    const response = await fetch('/api/availability');
    
    if (!response.ok) {
      throw new Error('Failed to fetch availability data');
    }
    
    const data: AvailabilityResponse = await response.json();
    
    // Calculate website price (20% discount from Booking.com price)
    return data.availabilities.map(item => ({
      ...item,
      websitePrice: item.bookingComPrice ? Math.round(item.bookingComPrice * 0.8) : undefined
    }));
  } catch (error) {
    // Fallback to mock data for development
    console.warn('Using mock availability data:', error);
    return getMockAvailabilityData();
  }
};

const getMockAvailabilityData = (): AvailabilityData[] => {
  const mockData: AvailabilityData[] = [];
  const today = new Date();
  
  // Generate mock data for next 3 months
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    const dateStr = date.toISOString().split('T')[0];
    const bookingComPrice = 100 + Math.floor(Math.random() * 100); // €100-200
    const isAvailable = Math.random() > 0.3; // 70% availability rate
    
    mockData.push({
      date: dateStr,
      available: isAvailable,
      bookingComPrice: isAvailable ? bookingComPrice : undefined,
      websitePrice: isAvailable ? Math.round(bookingComPrice * 0.8) : undefined
    });
  }
  
  return mockData;
};