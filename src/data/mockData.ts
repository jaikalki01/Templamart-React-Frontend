export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  seller: {
    name: string;
    id: string;
  };
  tags: string[];
  features: string[];
  previewUrl: string;
  downloads: number;
  rating: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const categories: Category[] = [
  { id: 'website', name: 'Website Templates', count: 120 },
  { id: 'landing', name: 'Landing Pages', count: 85 },
  { id: 'ecommerce', name: 'E-Commerce', count: 64 },
  { id: 'admin', name: 'Admin Dashboards', count: 42 },
  { id: 'mobile', name: 'Mobile UI Kits', count: 37 },
  { id: 'email', name: 'Email Templates', count: 28 },
];

export const templates: Template[] = [
  {
    id: '1',
    title: 'Modern E-commerce Template',
    description: 'A sleek, responsive e-commerce template with product listings, cart functionality, and checkout process. Perfect for online stores selling fashion, electronics, or any physical products.',
    category: 'ecommerce',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1603145733146-ae562a55031e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'DesignPro',
      id: 'seller1'
    },
    tags: ['ecommerce', 'responsive', 'modern'],
    features: ['Responsive design', 'Product filtering', 'Shopping cart', 'User accounts', 'Payment integration'],
    previewUrl: 'https://example.com/preview/ecommerce',
    downloads: 1245,
    rating: 4.8,
    createdAt: '2023-04-15'
  },
  {
    id: '2',
    title: 'Corporate Landing Page',
    description: 'Professional landing page template designed for corporate and business websites. Features clean layout, testimonial section, and service showcases.',
    category: 'landing',
    price: 29.99,
    salePrice: 19.99,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'WebMasters',
      id: 'seller2'
    },
    tags: ['corporate', 'business', 'landing page'],
    features: ['Responsive design', 'Animation effects', 'Contact form', 'Testimonial carousel', 'Newsletter signup'],
    previewUrl: 'https://example.com/preview/corporate',
    downloads: 873,
    rating: 4.6,
    createdAt: '2023-05-22'
  },
  {
    id: '3',
    title: 'Admin Dashboard UI Kit',
    description: 'Complete admin dashboard with different components, charts, tables and UI elements. Easy to customize and integrate with your backend.',
    category: 'admin',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'UICraft',
      id: 'seller3'
    },
    tags: ['dashboard', 'admin', 'ui kit'],
    features: ['Dark/light mode', 'Interactive charts', 'Form components', 'Data tables', 'User management'],
    previewUrl: 'https://example.com/preview/admin-dashboard',
    downloads: 2156,
    rating: 4.9,
    createdAt: '2023-02-10'
  },
  {
    id: '4',
    title: 'Real Estate Website Template',
    description: 'Complete website template for real estate agencies or property listings with property search, filtering options, and agent profiles.',
    category: 'website',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'DesignPro',
      id: 'seller1'
    },
    tags: ['real estate', 'property', 'website'],
    features: ['Property listings', 'Advanced search', 'Agent profiles', 'Mortgage calculator', 'Appointment booking'],
    previewUrl: 'https://example.com/preview/real-estate',
    downloads: 756,
    rating: 4.5,
    createdAt: '2023-06-05'
  },
  {
    id: '5',
    title: 'Mobile App UI Kit',
    description: 'Comprehensive UI kit for mobile app designers and developers. Includes over 200 components for iOS and Android interfaces.',
    category: 'mobile',
    price: 79.99,
    salePrice: 59.99,
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'MobileDesigns',
      id: 'seller4'
    },
    tags: ['mobile', 'ui kit', 'app design'],
    features: ['200+ components', 'iOS & Android styles', 'Design system', 'Animation presets', 'Icon pack included'],
    previewUrl: 'https://example.com/preview/mobile-ui',
    downloads: 3245,
    rating: 4.9,
    createdAt: '2023-03-18'
  },
  {
    id: '6',
    title: 'Restaurant Website Template',
    description: 'Perfect template for restaurants, cafes, or food delivery services with menu displays, reservation system, and chef profiles.',
    category: 'website',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'WebMasters',
      id: 'seller2'
    },
    tags: ['restaurant', 'food', 'website'],
    features: ['Menu presentation', 'Reservation system', 'Photo gallery', 'Customer testimonials', 'Contact information'],
    previewUrl: 'https://example.com/preview/restaurant',
    downloads: 921,
    rating: 4.7,
    createdAt: '2023-07-12'
  },
  {
    id: '7',
    title: 'Email Newsletter Templates',
    description: 'Collection of 10 responsive email newsletter templates suitable for various industries. Tested with major email clients.',
    category: 'email',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'EmailPros',
      id: 'seller5'
    },
    tags: ['email', 'newsletter', 'responsive'],
    features: ['10 design variations', 'Responsive layouts', 'Easy to customize', 'Compatible with major email clients', 'Documentation included'],
    previewUrl: 'https://example.com/preview/email-templates',
    downloads: 1532,
    rating: 4.6,
    createdAt: '2023-08-03'
  },
  {
    id: '8',
    title: 'Portfolio Website Template',
    description: 'Elegant portfolio template designed for photographers, designers, and creative professionals to showcase their work.',
    category: 'website',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'CreativeSolutions',
      id: 'seller6'
    },
    tags: ['portfolio', 'creative', 'showcase'],
    features: ['Project showcases', 'Filterable gallery', 'About me section', 'Contact form', 'Blog integration'],
    previewUrl: 'https://example.com/preview/portfolio',
    downloads: 842,
    rating: 4.7,
    createdAt: '2023-09-20'
  }
];

export const cartItems = [
  {
    templateId: '1',
    template: templates[0],
    quantity: 1
  },
  {
    templateId: '3',
    template: templates[2],
    quantity: 1
  }
];

// Mock user purchases history
export const userPurchases = [
  {
    id: "order-123",
    date: "2023-08-15",
    total: 59.98,
    items: [
      {
        id: "template-1",
        title: "Modern Dashboard UI Kit",
        category: "Admin & Dashboard",
        image: "https://source.unsplash.com/500x300/?dashboard",
        invoiceUrl: "#"
      },
      {
        id: "template-3",
        title: "E-commerce Shop Template",
        category: "E-commerce",
        image: "https://source.unsplash.com/500x300/?ecommerce",
        invoiceUrl: "#"
      }
    ],
    invoiceUrl: "#"
  },
  {
    id: "order-456",
    date: "2023-07-22",
    total: 29.99,
    items: [
      {
        id: "template-5",
        title: "Personal Portfolio Template",
        category: "Portfolio",
        image: "https://source.unsplash.com/500x300/?portfolio",
        invoiceUrl: "#"
      }
    ],
    invoiceUrl: "#"
  }
];
