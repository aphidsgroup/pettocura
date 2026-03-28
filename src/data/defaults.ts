export interface StoreLocation {
  id: string;
  title: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  status: 'open' | 'closed';
  hours: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'grooming' | 'boarding';
  icon: string;
  features: string[];
  image_url?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  featured_image?: string;
}

export const defaultStores: StoreLocation[] = [
  {
    id: 'store-1',
    title: 'Petto Cura — Nolambur',
    address: 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095',
    lat: 13.068643,
    lng: 80.162437,
    phone: '+91 95662 42236',
    status: 'open',
    hours: '9:00 AM – 8:00 PM',
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: 'svc-1',
    name: 'Full Body Grooming',
    description: 'Complete grooming package including bath, haircut, ear cleaning, nail trimming, and blowdry with premium shampoo.',
    price: '₹1,499',
    category: 'grooming',
    icon: '✂️',
    features: ['Premium Shampoo Bath', 'Breed-specific Haircut', 'Ear Cleaning', 'Nail Trimming & Filing', 'Blow Dry & Brushing'],
  },
  {
    id: 'svc-2',
    name: 'Spa & De-shedding',
    description: 'Luxurious spa treatment with deep conditioning, de-shedding therapy, and aromatherapy for a calm, happy pet.',
    price: '₹1,999',
    category: 'grooming',
    icon: '🧖',
    features: ['Deep Conditioning Mask', 'De-shedding Therapy', 'Aromatherapy Massage', 'Paw Moisturizing', 'Teeth Brushing'],
  },
  {
    id: 'svc-3',
    name: 'Basic Bath & Brush',
    description: 'A quick refresher including a warm bath, gentle brushing, and ear check for your furry friend.',
    price: '₹799',
    category: 'grooming',
    icon: '🛁',
    features: ['Warm Bath', 'Gentle Brushing', 'Ear Check', 'Towel & Blow Dry', 'Cologne Spritz'],
  },
  {
    id: 'svc-4',
    name: 'Puppy First Groom',
    description: 'Gentle introduction to grooming for puppies aged 3-6 months. A trust-building experience for your little one.',
    price: '₹599',
    category: 'grooming',
    icon: '🐾',
    features: ['Gentle Handling', 'Puppy-safe Shampoo', 'Light Trim', 'Nail Trim', 'Positive Reinforcement'],
  },
  {
    id: 'svc-5',
    name: 'Overnight Boarding',
    description: 'Safe, climate-controlled overnight stay with CCTV monitoring, regular feeding, and playtime sessions.',
    price: '₹999/night',
    category: 'boarding',
    icon: '🏠',
    features: ['Climate Controlled Room', '24/7 CCTV Monitoring', '3 Meals/Day', 'Daily Playtime', 'Photo Updates'],
  },
  {
    id: 'svc-6',
    name: 'Premium Suite Boarding',
    description: 'Luxury private suite with personal attention, webcam access, daily grooming touch-ups, and vet on-call.',
    price: '₹1,799/night',
    category: 'boarding',
    icon: '👑',
    features: ['Private Suite', 'Live Webcam Access', 'Personal Caretaker', 'Daily Grooming', 'Vet On-Call 24/7'],
  },
  {
    id: 'svc-7',
    name: 'Daycare',
    description: "Full-day supervised play and socialization for your dog while you are at work. Includes meals and naps.",
    price: '₹599/day',
    category: 'boarding',
    icon: '☀️',
    features: ['Supervised Play', 'Social Groups', '2 Meals Included', 'Nap Time', 'Activity Report'],
  },
  {
    id: 'svc-8',
    name: 'Extended Stay (7+ Days)',
    description: 'Long-term boarding with discounted rates, routine wellness checks, and consistent daily structure.',
    price: '₹799/night',
    category: 'boarding',
    icon: '📅',
    features: ['Discounted Nightly Rate', 'Weekly Wellness Check', 'Consistent Routine', 'Exercise Sessions', 'Weekly Grooming'],
  },
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'ultimate-guide-dog-grooming-at-home',
    title: 'The Ultimate Guide to Dog Grooming at Home',
    excerpt: 'Learn professional grooming techniques you can do at home between salon visits to keep your pet looking their best.',
    content: `# The Ultimate Guide to Dog Grooming at Home

Regular grooming is essential for your dog's health and happiness. While professional grooming is important, there's a lot you can do at home between visits.

## Why Home Grooming Matters

Home grooming sessions aren't just about keeping your dog clean — they're bonding time. Regular brushing prevents matting, distributes natural oils, and lets you check for lumps, ticks, or skin issues early.

## Essential Tools You'll Need

- **Slicker Brush**: Great for most coat types, removes loose fur and tangles
- **Steel Comb**: For fine-tuning after brushing
- **Dog Shampoo**: Always use pet-specific, pH-balanced formulas
- **Nail Clippers or Grinder**: Keep nails at a comfortable length
- **Ear Cleaner**: Prevent infections with regular cleaning

## Step-by-Step Grooming Routine

### 1. Brushing (10-15 minutes)
Start with a slicker brush, working from head to tail. Be gentle around sensitive areas like the belly and behind the ears.

### 2. Bath Time
Use lukewarm water and dog-specific shampoo. Avoid getting water in the ears. Rinse thoroughly — leftover shampoo causes irritation.

### 3. Drying
Towel dry first, then use a low-heat dryer. Many dogs are nervous around dryers, so introduce it gradually.

### 4. Nail Trimming
Clip just the tip, avoiding the quick (the pink part visible on light nails). If unsure, have your vet show you the first time.

### 5. Ear Cleaning
Apply a few drops of ear cleaner, massage the base of the ear, then let your dog shake it out. Wipe away debris with a cotton ball.

## When to Visit a Professional

Despite your best home efforts, professional grooming every 4-6 weeks is still recommended for breed-specific haircuts, deep de-shedding treatments, and thorough health checks.

---

*At Petto Cura, our certified groomers provide premium grooming services tailored to your pet's breed and needs. [Book an appointment today](/contact).*`,
    category: 'Grooming Tips',
    author: 'Dr. Priya Sharma',
    date: '2026-03-10',
    readTime: '5 min read',
    image: '/blog/grooming-guide.jpg',
    metaTitle: 'Ultimate Dog Grooming at Home Guide | Petto Cura',
    metaDescription: 'Learn professional dog grooming techniques for home care. Expert tips on brushing, bathing, nail trimming, and ear cleaning from Petto Cura.',
  },
  {
    id: 'blog-2',
    slug: 'preparing-pet-for-first-boarding',
    title: 'How to Prepare Your Pet for Their First Boarding Stay',
    excerpt: 'First-time boarding can be stressful for both pets and owners. Here\'s how to make the transition smooth and anxiety-free.',
    content: `# How to Prepare Your Pet for Their First Boarding Stay

Leaving your pet for the first time is nerve-wracking. With the right preparation, you can ensure a stress-free experience for both of you.

## Before the Stay

### Visit the Facility First
Always tour the boarding facility before booking. Look for cleanliness, staff friendliness, and how animals are housed. At Petto Cura, we welcome drop-in visits anytime.

### Update Vaccinations
Most reputable boarding facilities require up-to-date vaccinations. Ensure your pet's records are current at least 2 weeks before the stay.

### Pack Comfort Items
Bring your pet's favorite blanket, toy, or an unwashed t-shirt with your scent. Familiar smells reduce anxiety significantly.

## During the Stay

### Stick to Routine
Provide detailed feeding instructions, medication schedules, and preferred walk times. Consistency is key to comfort.

### Don't Overdo Goodbyes
Long, emotional farewells can increase your pet's anxiety. A quick, confident goodbye signals that everything is fine.

## After the Stay

### Expect Adjustment
Your pet may be extra tired or overly excited upon return. Give them a day or two to readjust to their normal routine.

---

*Petto Cura's boarding facilities feature climate-controlled rooms, 24/7 CCTV monitoring, and live pet updates so you never miss a moment. [Find a center near you](/find-a-center).*`,
    category: 'Boarding',
    author: 'Rahul Krishnan',
    date: '2026-03-05',
    readTime: '4 min read',
    image: '/blog/boarding-prep.jpg',
    metaTitle: 'Prepare Your Pet for First Boarding Stay | Petto Cura',
    metaDescription: 'Expert tips on preparing your pet for their first boarding experience. From facility tours to packing comfort items, make boarding stress-free.',
  },
  {
    id: 'blog-3',
    slug: 'signs-your-dog-needs-grooming',
    title: '7 Signs Your Dog Needs Professional Grooming Now',
    excerpt: 'Is your dog overdue for a grooming session? Watch for these telltale signs that it\'s time to book an appointment.',
    content: `# 7 Signs Your Dog Needs Professional Grooming Now

Dogs can't tell us when they need a trim, but they show us. Here are the top signs it's time for a professional grooming session.

## 1. Matted Fur
Mats aren't just unsightly — they pull on the skin and can cause pain and skin infections. If you can't brush through a tangle, a groomer needs to handle it.

## 2. Overgrown Nails
If you can hear your dog's nails clicking on the floor, they're too long. Overgrown nails affect posture and can grow into the paw pad.

## 3. Bad Odor
A persistent smell despite regular baths could indicate skin issues, ear infections, or anal gland problems that a groomer can identify.

## 4. Excessive Scratching
Could be dry skin, hidden mats, or even fleas. A professional grooming session includes a thorough skin check.

## 5. Dirty or Red Ears
Brown discharge or redness inside the ears signals it's time for professional cleaning and possibly a vet visit.

## 6. Eye Stains
Tear stains, especially on light-colored breeds, need gentle professional treatment to prevent bacterial growth.

## 7. Scooting Behavior
If your dog is scooting their rear on the floor, they likely need their anal glands expressed — a standard part of professional grooming.

---

*Don't wait for these signs to worsen. Petto Cura offers comprehensive grooming packages starting at ₹799. [Book your appointment today](/contact).*`,
    category: 'Pet Health',
    author: 'Dr. Priya Sharma',
    date: '2026-02-28',
    readTime: '3 min read',
    image: '/blog/grooming-signs.jpg',
    metaTitle: '7 Signs Your Dog Needs Grooming | Petto Cura Chennai',
    metaDescription: 'Watch for these 7 signs that your dog needs professional grooming. From matted fur to overgrown nails, learn when to book a grooming appointment.',
  },
  {
    id: 'blog-4',
    slug: 'best-diet-for-indian-breed-dogs',
    title: 'The Best Diet Plan for Indian Breed Dogs',
    excerpt: 'Indian breeds like Rajapalayam, Mudhol Hound, and Indian Spitz have unique nutritional needs. Here\'s your complete feeding guide.',
    content: `# The Best Diet Plan for Indian Breed Dogs

Indian dog breeds are hardy, loyal, and well-adapted to our climate. But they still need proper nutrition to thrive. Here's a complete guide.

## Understanding Indian Breeds

Indian breeds like Rajapalayam, Mudhol Hound, Chippiparai, and Indian Spitz have evolved for our climate. They generally need less protein than cold-climate breeds but require well-balanced meals.

## Recommended Daily Diet

### Morning Meal
- 1 cup rice or roti + cooked vegetables (carrots, pumpkin, beans)
- 1 boiled egg or 50g paneer
- 1 teaspoon of coconut oil

### Evening Meal
- High-quality dry kibble (breed-appropriate)
- Fresh curd (50-100ml) for probiotics
- Seasonal fruit treats (banana, watermelon, apple — no grapes!)

## Foods to Avoid
- **Chocolate**: Toxic to all dogs
- **Onions & Garlic**: Can cause anemia
- **Grapes & Raisins**: Kidney damage risk
- **Excessive Salt**: Harmful to kidneys
- **Cooked Bones**: Splintering hazard

## Hydration
Ensure fresh water is always available, especially during Chennai summers. Add ice cubes to their water bowl during peak heat.

---

*At Petto Cura, our boarding meals are vet-approved and customized to your pet's breed and dietary needs. [Learn more about our boarding services](/boarding).*`,
    category: 'Nutrition',
    author: 'Dr. Anand Rajan',
    date: '2026-02-20',
    readTime: '6 min read',
    image: '/blog/indian-breed-diet.jpg',
    metaTitle: 'Best Diet for Indian Breed Dogs | Petto Cura Guide',
    metaDescription: 'Complete diet guide for Indian breed dogs including Rajapalayam, Mudhol Hound, and Indian Spitz. Expert nutrition tips from Petto Cura.',
  },
];
