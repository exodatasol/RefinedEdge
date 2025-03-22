// Define types
export interface ProductType {
  slug: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[];
  inStock: boolean;
  categories: string[];
  relatedProducts: string[];
}

// Mock product data - in a real app, this would come from a database or API
export const products: ProductType[] = [
  {
    slug: 'platinum-precision-razor',
    name: "Platinum Precision Razor",
    description: "Our signature 5-blade system with precision edge trimmer for the closest, most comfortable shave possible. The ergonomic handle provides perfect control and balance.",
    price: 58.00,
    rating: 5,
    reviewCount: 124,
    images: [
      "https://img.freepik.com/premium-photo/closeup-razors-sleek-shaving-cream-bottle-clean-minimal-background_1264082-199502.jpg",
      "https://thumbs.dreamstime.com/b/elegant-razor-blade-silhouette-minimalist-modern-design-element-grooming-products-branding-advertising-captivating-363192000.jpg"
    ],
    features: [
      "5-blade precision system",
      "German-engineered steel blades",
      "Ergonomic weighted handle",
      "Precision edge trimmer",
      "Water-resistant finish"
    ],
    inStock: true,
    categories: ["razors", "featured"],
    relatedProducts: [
      "elite-shaving-cream",
      "gentlemans-set"
    ]
  },
  {
    slug: 'elite-shaving-cream',
    name: "Elite Shaving Cream",
    description: "Luxurious shaving cream with sandalwood and cedarwood notes. Creates a rich lather that softens facial hair and protects the skin during shaving.",
    price: 32.00,
    rating: 4.5,
    reviewCount: 89,
    images: [
      "https://i.ebayimg.com/images/g/emgAAOSwdu1mZRLS/s-l400.jpg"
    ],
    features: [
      "Premium sandalwood and cedarwood fragrance",
      "Natural ingredients",
      "Rich, protective lather",
      "Moisturizing formula",
      "No parabens or sulfates"
    ],
    inStock: true,
    categories: ["shaving-care", "featured"],
    relatedProducts: [
      "platinum-precision-razor",
      "gentlemans-set"
    ]
  },
  {
    slug: 'executive-trimmer',
    name: "Executive Trimmer",
    description: "Premium beard trimmer with 10 length settings for precise grooming. Includes multiple attachments for versatile styling options.",
    price: 96.00,
    rating: 4.8,
    reviewCount: 76,
    images: [
      "https://m.media-amazon.com/images/I/51oidj8gwKL.jpg"
    ],
    features: [
      "10 precision length settings",
      "Self-sharpening stainless steel blades",
      "120 minutes of cordless run time",
      "Quick-charge capability",
      "Waterproof design"
    ],
    inStock: true,
    categories: ["grooming", "featured"],
    relatedProducts: [
      "platinum-precision-razor",
      "gentlemans-set"
    ]
  },
  {
    slug: 'gentlemans-set',
    name: "Gentleman's Set",
    description: "Complete grooming set with premium razor, shaving cream, and aftershave. The perfect gift for the discerning gentleman.",
    price: 120.00,
    rating: 5,
    reviewCount: 52,
    images: [
      "https://m.media-amazon.com/images/I/71BbIGI1ZkS.jpg"
    ],
    features: [
      "Includes Platinum Precision Razor",
      "Includes Elite Shaving Cream (150ml)",
      "Includes Aftershave Balm (100ml)",
      "Luxurious presentation box",
      "Perfect as a gift"
    ],
    inStock: true,
    categories: ["gift-sets", "featured"],
    relatedProducts: [
      "platinum-precision-razor",
      "elite-shaving-cream"
    ]
  },
  {
    slug: 'premium-safety-razor',
    name: "Premium Safety Razor",
    description: "Classic single-blade safety razor for a traditional shave",
    price: 48.00,
    rating: 4.7,
    reviewCount: 63,
    images: [
      "https://thumbs.dreamstime.com/b/elegant-razor-blade-silhouette-minimalist-modern-design-element-grooming-products-branding-advertising-captivating-363192000.jpg"
    ],
    features: [
      "Single-blade precision",
      "Traditional design",
      "Chrome finish",
      "Weighted handle",
      "Ideal for sensitive skin"
    ],
    inStock: true,
    categories: ["razors", "featured"],
    relatedProducts: [
      "elite-shaving-cream",
      "gentlemans-set"
    ]
  },
  {
    slug: 'aftershave-balm',
    name: "Soothing Aftershave Balm",
    description: "Calming aftershave balm with aloe and witch hazel",
    price: 24.00,
    rating: 4.6,
    reviewCount: 41,
    images: [
      "https://img.freepik.com/premium-photo/closeup-razors-sleek-shaving-cream-bottle-clean-minimal-background_1264082-199502.jpg"
    ],
    features: [
      "Soothing formula",
      "Reduces irritation",
      "Hydrating",
      "Subtle fragrance",
      "Non-greasy finish"
    ],
    inStock: true,
    categories: ["shaving-care", "featured"],
    relatedProducts: [
      "platinum-precision-razor",
      "gentlemans-set"
    ]
  }
];
