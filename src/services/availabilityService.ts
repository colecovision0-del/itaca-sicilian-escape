import ICAL from 'ical.js';

// TODO: Replace this URL with your actual iCal feed URL
// Format: https://ical.booking.com/v1/export=YOUR_PROPERTY_ID
const EXTERNAL_CALENDAR_URL = 'https://ical.booking.com/v1/export=17404527-407f';

export interface AvailabilityData {
  date: string;
  available: boolean;
  standardPrice?: number;
  websitePrice?: number;
}

export interface AvailabilityResponse {
  availabilities: AvailabilityData[];
}

const parseICalData = async (): Promise<AvailabilityData[]> => {
  try {
    const response = await fetch(EXTERNAL_CALENDAR_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch iCal data');
    }
    
    const icalData = await response.text();
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');
    
    const bookedDates = new Set<string>();
    
    // Parse booked dates from iCal events
    vevents.forEach(vevent => {
      const event = new ICAL.Event(vevent);
      const startDate = event.startDate.toJSDate();
      const endDate = event.endDate.toJSDate();
      
      // Mark all dates in the booking period as unavailable
      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        bookedDates.add(dateStr);
      }
    });
    
    // Generate availability data for next 3 months
    const availabilityData: AvailabilityData[] = [];
    const today = new Date();
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const isBooked = bookedDates.has(dateStr);
      const standardPrice = !isBooked ? 100 + Math.floor(Math.random() * 100) : undefined;
      
      availabilityData.push({
        date: dateStr,
        available: !isBooked,
        standardPrice,
        websitePrice: standardPrice ? Math.round(standardPrice * 0.8) : undefined
      });
    }
    
    return availabilityData;
  } catch (error) {
    console.error('Error parsing iCal data:', error);
    throw error;
  }
};

export const fetchAvailability = async (): Promise<AvailabilityData[]> => {
  try {
    // Try to parse iCal data from external calendar
    return await parseICalData();
  } catch (error) {
    // Fallback to API or mock data
    try {
      const response = await fetch('/api/availability');
      if (!response.ok) {
        throw new Error('Failed to fetch availability data');
      }
      
      const data: AvailabilityResponse = await response.json();
      return data.availabilities.map(item => ({
        ...item,
        websitePrice: item.standardPrice ? Math.round(item.standardPrice * 0.8) : undefined
      }));
    } catch (apiError) {
      console.warn('Using mock availability data:', error);
      return getMockAvailabilityData();
    }
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
    const standardPrice = 100 + Math.floor(Math.random() * 100); // €100-200
    const isAvailable = Math.random() > 0.3; // 70% availability rate
    
    mockData.push({
      date: dateStr,
      available: isAvailable,
      standardPrice: isAvailable ? standardPrice : undefined,
      websitePrice: isAvailable ? Math.round(standardPrice * 0.8) : undefined
    });
  }
  
  return mockData;
};