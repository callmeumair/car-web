import Image from 'next/image';
import Layout from '@/components/Layout';

const cars = [
  {
    id: 1,
    name: 'Luxury Sedan',
    type: 'Sedan',
    price: 99,
    image: '/car1.jpg',
    features: ['Automatic Transmission', 'Leather Seats', 'Bluetooth'],
  },
  {
    id: 2,
    name: 'SUV',
    type: 'SUV',
    price: 129,
    image: '/car2.jpg',
    features: ['4WD', 'Spacious Interior', 'Roof Rack'],
  },
  {
    id: 3,
    name: 'Sports Car',
    type: 'Sports',
    price: 199,
    image: '/car3.jpg',
    features: ['Manual Transmission', 'Sport Mode', 'Premium Sound'],
  },
  {
    id: 4,
    name: 'Compact Car',
    type: 'Compact',
    price: 79,
    image: '/car4.jpg',
    features: ['Fuel Efficient', 'Easy Parking', 'City Friendly'],
  },
  {
    id: 5,
    name: 'Luxury SUV',
    type: 'SUV',
    price: 159,
    image: '/car5.jpg',
    features: ['Premium Interior', 'Advanced Safety', 'Navigation'],
  },
  {
    id: 6,
    name: 'Electric Vehicle',
    type: 'Electric',
    price: 149,
    image: '/car6.jpg',
    features: ['Zero Emissions', 'Fast Charging', 'Smart Features'],
  },
];

export default function CarsPage() {
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">Our Fleet</h1>
          
          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <button className="px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50">
              All
            </button>
            <button className="px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50">
              Sedan
            </button>
            <button className="px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50">
              SUV
            </button>
            <button className="px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50">
              Sports
            </button>
            <button className="px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50">
              Electric
            </button>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{car.name}</h3>
                      <p className="text-gray-600">{car.type}</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${car.price}/day</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {car.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 