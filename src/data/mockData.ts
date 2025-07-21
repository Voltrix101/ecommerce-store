import { Product, Category, User } from '../types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    subcategories: [
      { id: 1, name: 'Smartphones', count: 45 },
      { id: 2, name: 'Laptops', count: 23 },
      { id: 3, name: 'Tablets', count: 18 },
      { id: 4, name: 'Headphones', count: 34 },
      { id: 5, name: 'Cameras', count: 12 }
    ]
  },
  {
    id: 2,
    name: 'Fashion',
    subcategories: [
      { id: 6, name: 'Men\'s Clothing', count: 67 },
      { id: 7, name: 'Women\'s Clothing', count: 89 },
      { id: 8, name: 'Shoes', count: 54 },
      { id: 9, name: 'Accessories', count: 43 },
      { id: 10, name: 'Bags', count: 28 }
    ]
  },
  {
    id: 3,
    name: 'Home & Garden',
    subcategories: [
      { id: 11, name: 'Furniture', count: 32 },
      { id: 12, name: 'Decor', count: 56 },
      { id: 13, name: 'Kitchen', count: 41 },
      { id: 14, name: 'Bedding', count: 29 },
      { id: 15, name: 'Garden', count: 37 }
    ]
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    subcategories: [
      { id: 16, name: 'Fitness', count: 38 },
      { id: 17, name: 'Outdoor Gear', count: 25 },
      { id: 18, name: 'Sports Equipment', count: 31 },
      { id: 19, name: 'Activewear', count: 44 },
      { id: 20, name: 'Water Sports', count: 19 }
    ]
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/17875700/pexels-photo-17875700.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/17875700/pexels-photo-17875700.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8052759/pexels-photo-8052759.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7703128/pexels-photo-7703128.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    subcategory: 'Smartphones',
    rating: 4.8,
    reviews: 2847,
    description: 'The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system.',
    features: ['6.7" Super Retina XDR display', 'A17 Pro chip', '48MP camera system', '5G capable', 'MagSafe compatible'],
    inStock: true,
    brand: 'Apple',
    tags: ['smartphone', 'premium', 'latest', '5g'],
    discount: 8,
    variants: [
      {
        type: 'Color',
        options: ['Titanium Black', 'Titanium White', 'Titanium Blue'],
      },
      {
        type: 'Storage',
        options: ['256GB', '512GB', '1TB'],
      },
    ],
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    price: 1999,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    subcategory: 'Laptops',
    rating: 4.9,
    reviews: 1523,
    description: 'Professional laptop with M3 Pro chip, stunning display, and all-day battery life.',
    features: ['14.2" Liquid Retina XDR display', 'M3 Pro chip', '18-hour battery', '16GB unified memory', 'Thunderbolt 4'],
    inStock: true,
    brand: 'Apple',
    tags: ['laptop', 'professional', 'powerful', 'm3']
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 399,
    originalPrice: 449,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5320003/pexels-photo-5320003.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    subcategory: 'Headphones',
    rating: 4.7,
    reviews: 956,
    description: 'Industry-leading noise canceling headphones with exceptional sound quality.',
    features: ['30-hour battery life', 'Industry-leading noise canceling', 'Quick Charge', 'Multipoint connection', 'Hi-Res Audio'],
    inStock: true,
    brand: 'Sony',
    tags: ['headphones', 'noise-canceling', 'wireless', 'premium'],
    discount: 11
  },
  {
    id: 4,
    name: 'Nike Air Max 270',
    price: 150,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    subcategory: 'Shoes',
    rating: 4.5,
    reviews: 1234,
    description: 'Lifestyle shoe with large Max Air unit and modern design for all-day comfort.',
    features: ['Max Air unit', 'Mesh upper', 'Rubber outsole', 'Lightweight design', 'Available in multiple colors'],
    inStock: true,
    brand: 'Nike',
    tags: ['shoes', 'sneakers', 'casual', 'comfort']
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra',
    price: 1299,
    image: 'https://images.pexels.com/photos/13319880/pexels-photo-13319880.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/13319880/pexels-photo-13319880.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/19516607/pexels-photo-19516607.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    subcategory: 'Smartphones',
    rating: 4.6,
    reviews: 1876,
    description: 'Ultimate Android smartphone with S Pen, 200MP camera, and AI features.',
    features: ['6.8" Dynamic AMOLED display', 'Snapdragon 8 Gen 3', '200MP camera', 'S Pen included', 'AI features'],
    inStock: true,
    brand: 'Samsung',
    tags: ['smartphone', 'android', 's-pen', 'camera']
  },
  {
    id: 6,
    name: 'Levi\'s 501 Original Jeans',
    price: 79,
    originalPrice: 98,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    subcategory: 'Men\'s Clothing',
    rating: 4.4,
    reviews: 2156,
    description: 'The original blue jean since 1873. Straight fit with classic styling.',
    features: ['100% cotton denim', 'Button fly', 'Classic 5-pocket styling', 'Straight fit', 'Multiple washes available'],
    inStock: true,
    brand: 'Levi\'s',
    tags: ['jeans', 'denim', 'classic', 'mens'],
    discount: 19
  },
  {
    id: 7,
    name: 'iPad Pro 12.9"',
    price: 1099,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4316/black-tablet-portable-battery.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    subcategory: 'Tablets',
    rating: 4.8,
    reviews: 743,
    description: 'Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
    features: ['12.9" Liquid Retina XDR display', 'M2 chip', 'Apple Pencil support', '5G cellular option', 'All-day battery'],
    inStock: true,
    brand: 'Apple',
    tags: ['tablet', 'ipad', 'creative', 'professional']
  },
  {
    id: 8,
    name: 'Adidas Ultraboost 22',
    price: 190,
    image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    subcategory: 'Shoes',
    rating: 4.6,
    reviews: 1087,
    description: 'Running shoes with responsive BOOST midsole and Primeknit upper.',
    features: ['BOOST midsole', 'Primeknit upper', 'Continental rubber outsole', 'Adaptive arch support', 'Energy return'],
    inStock: true,
    brand: 'Adidas',
    tags: ['shoes', 'running', 'athletic', 'boost']
  },
  {
    id: 9,
    name: 'Canon EOS R6 Mark II',
    price: 2499,
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    subcategory: 'Cameras',
    rating: 4.9,
    reviews: 456,
    description: 'Professional mirrorless camera with 24.2MP full-frame sensor and advanced autofocus.',
    features: ['24.2MP full-frame CMOS', '40fps continuous shooting', '6K video recording', 'In-body stabilization', 'Dual pixel CMOS AF'],
    inStock: true,
    brand: 'Canon',
    tags: ['camera', 'professional', 'mirrorless', 'photography']
  },
  {
    id: 10,
    name: 'Modern Office Chair',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/586021/pexels-photo-586021.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/586021/pexels-photo-586021.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/265004/pexels-photo-265004.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    subcategory: 'Furniture',
    rating: 4.3,
    reviews: 892,
    description: 'Ergonomic office chair with lumbar support and adjustable height.',
    features: ['Ergonomic design', 'Lumbar support', 'Adjustable height', 'Breathable mesh', '360° swivel'],
    inStock: true,
    brand: 'ErgoMax',
    tags: ['furniture', 'office', 'chair', 'ergonomic'],
    discount: 25
  }
];

export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  addresses: [
    {
      id: 1,
      name: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true
    },
    {
      id: 2,
      name: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA',
      isDefault: false
    }
  ],
  preferences: {
    currency: 'USD',
    language: 'English',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    defaultView: 'grid'
  }
};