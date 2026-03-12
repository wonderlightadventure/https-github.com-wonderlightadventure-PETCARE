import React, { useState } from 'react';
import { Search, ShoppingBag, Filter, Star, Heart, ChevronRight, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Puppy Food',
    brand: 'Royal Canin',
    price: 45.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400',
    category: 'Food'
  },
  {
    id: '2',
    name: 'Orthopedic Dog Bed',
    brand: 'PetComfort',
    price: 89.00,
    rating: 4.9,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1591768793355-74d7c836038c?auto=format&fit=crop&q=80&w=400',
    category: 'Accessories'
  },
  {
    id: '3',
    name: 'Interactive Cat Toy',
    brand: 'MeowPlay',
    price: 15.50,
    rating: 4.5,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    category: 'Toys'
  },
  {
    id: '4',
    name: 'Automatic Water Fountain',
    brand: 'AquaPet',
    price: 32.99,
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=400',
    category: 'Accessories'
  }
];

const Marketplace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  const categories = ['All', 'Food', 'Toys', 'Accessories', 'Health'];

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="scroll-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Marketplace</h1>
        <div className="relative">
          <button className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/20"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
          <Filter size={20} />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 border border-slate-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <motion.div
            layoutId={product.id}
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="card p-0 overflow-hidden border-none shadow-md group cursor-pointer"
          >
            <div className="h-40 relative overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 shadow-sm">
                <Heart size={16} />
              </button>
            </div>
            <div className="p-3">
              <p className="text-[10px] font-bold text-primary uppercase mb-1">{product.brand}</p>
              <h4 className="text-sm font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">${product.price}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-bold">{product.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[70] flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white rounded-t-[40px] p-0 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-80">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-primary font-bold uppercase text-xs tracking-widest mb-1">{selectedProduct.brand}</p>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedProduct.name}</h2>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">${selectedProduct.price}</div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill={i <= Math.floor(selectedProduct.rating) ? "currentColor" : "none"} />)}
                    <span className="text-slate-400 text-sm ml-1">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  This premium product is designed specifically for your pet's comfort and well-being. Made with high-quality materials and tested for safety.
                </p>

                <div className="flex gap-4">
                  <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-2">
                    <button className="p-2 text-slate-600"><Minus size={18} /></button>
                    <span className="px-4 font-bold">1</span>
                    <button className="p-2 text-slate-600"><Plus size={18} /></button>
                  </div>
                  <button 
                    onClick={() => {
                      setCartCount(prev => prev + 1);
                      setSelectedProduct(null);
                      alert('Added to cart!');
                    }}
                    className="flex-1 btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
