import Image from 'next/image';
import Layout from '@/components/Layout';

const services = [
  {
    title: 'Car Rental Services',
    description: 'Choose from our extensive fleet of vehicles for short-term and long-term rentals.',
    features: [
      'Daily, weekly, and monthly rental options',
      '24/7 roadside assistance',
      'Flexible pickup and drop-off locations',
      'Comprehensive insurance coverage',
      'Child seat options available'
    ],
    icon: '🚗'
  },
  {
    title: 'Corporate Solutions',
    description: 'Tailored car rental solutions for businesses of all sizes.',
    features: [
      'Dedicated account management',
      'Custom billing solutions',
      'Fleet management services',
      'Employee travel programs',
      'Detailed reporting and analytics'
    ],
    icon: '🏢'
  },
  {
    title: 'Airport Services',
    description: 'Seamless airport transfers and rental services.',
    features: [
      'Airport pickup and drop-off',
      'Meet and greet service',
      'Priority check-in',
      'Luggage assistance',
      'Flight tracking service'
    ],
    icon: '✈️'
  },
  {
    title: 'Luxury & Premium',
    description: 'Experience luxury with our premium vehicle collection.',
    features: [
      'High-end luxury vehicles',
      'Personal chauffeur service',
      'VIP treatment',
      'Complimentary amenities',
      'Priority service'
    ],
    icon: '💎'
  },
  {
    title: 'Event Transportation',
    description: 'Reliable transportation for special events and occasions.',
    features: [
      'Wedding car services',
      'Corporate event transport',
      'Group transportation',
      'Special occasion vehicles',
      'Custom decoration options'
    ],
    icon: '🎉'
  },
  {
    title: 'Maintenance & Support',
    description: 'Comprehensive vehicle maintenance and support services.',
    features: [
      'Regular maintenance checks',
      '24/7 technical support',
      'Vehicle tracking system',
      'Emergency assistance',
      'Regular cleaning service'
    ],
    icon: '🔧'
  }
];

export default function ServicesPage() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/services-hero.jpg"
              alt="Our Services"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">Our Services</h1>
              <p className="text-xl">
                Comprehensive car rental solutions for every need
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Security & Safety</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
                <p className="text-gray-600">SSL encryption and secure payment processing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
                <p className="text-gray-600">GDPR compliant data handling and privacy protection</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Vehicle Security</h3>
                <p className="text-gray-600">Advanced tracking and anti-theft systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 