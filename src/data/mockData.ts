export const MOCK_CLINICS = [
  {
    id: '1',
    name: 'Happy Paws Vet Clinic',
    rating: 4.8,
    distance: '1.2 km',
    specialization: 'General Medicine, Surgery',
    hours: '08:00 - 20:00',
    contact: '+1 234 567 890',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'City Pet Hospital',
    rating: 4.5,
    distance: '2.5 km',
    specialization: 'Emergency, Dental',
    hours: '24/7',
    contact: '+1 987 654 321',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Feline Friends Care',
    rating: 4.9,
    distance: '3.1 km',
    specialization: 'Cat Specialist',
    hours: '09:00 - 18:00',
    contact: '+1 555 000 111',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
  }
];

export const MOCK_ADOPTION_PETS = [
  {
    id: 'a1',
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
    shelter: 'Brooklyn Animal Haven',
    description: 'Luna is a friendly and energetic Golden Retriever looking for a forever home with a big backyard.'
  },
  {
    id: 'a2',
    name: 'Oliver',
    species: 'Cat',
    breed: 'Tabby',
    age: '6 months',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1573865668131-974279df4a94?auto=format&fit=crop&q=80&w=400',
    shelter: 'Happy Whiskers Shelter',
    description: 'Oliver is a playful kitten who loves to cuddle and play with yarn.'
  }
];

export const MOCK_POSTS = [
  {
    id: 'p1',
    author: 'Sarah Jenkins',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    petName: 'Max',
    content: 'Just had a great walk at the park today! Max loved the new trail.',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400',
    likes: 24,
    comments: 5,
    time: '2h ago'
  },
  {
    id: 'p2',
    author: 'Mike Ross',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    petName: 'Whiskers',
    content: 'New scratching post is a hit! 🐱',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    likes: 42,
    comments: 8,
    time: '5h ago'
  }
];

export const EMERGENCY_TIPS = {
  Dog: [
    { title: 'Choking', tip: 'Check the mouth for obstructions. If visible, try to remove with fingers or tweezers.' },
    { title: 'Heatstroke', tip: 'Move to a cool area, apply cool (not cold) water to their fur, and provide small amounts of water.' }
  ],
  Cat: [
    { title: 'Poisoning', tip: 'Identify the substance. Do not induce vomiting unless instructed by a vet.' },
    { title: 'Bleeding', tip: 'Apply firm, direct pressure to the wound using a clean cloth or gauze.' }
  ]
};
