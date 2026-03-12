import React, { useState } from 'react';
import { MOCK_POSTS } from '../data/mockData';
import { Heart, MessageCircle, Share2, Plus, Hash, X, Camera, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Community: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', petName: '' });
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'You',
      authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      petName: newPost.petName || 'Your Pet',
      content: newPost.content,
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
      likes: 0,
      comments: 0,
      time: 'Just now'
    };
    setPosts([post, ...posts]);
    setIsCreating(false);
    setNewPost({ content: '', petName: '' });
  };

  const toggleLike = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(p => p !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const handleShare = async (post: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `PawCare Post by ${post.author}`,
          text: post.content,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="scroll-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Community</h1>
        <button 
          onClick={() => setIsCreating(true)}
          className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Trending Hashtags */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
        {['#GoldenRetriever', '#CatLovers', '#PuppyLife', '#PetHealth', '#RescueDog'].map((tag) => (
          <button 
            key={tag} 
            onClick={() => alert(`Showing posts for ${tag}`)}
            className="bg-white border border-slate-100 px-4 py-2 rounded-2xl shadow-sm whitespace-nowrap flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <Hash size={14} className="text-primary" />
            <span className="text-xs font-bold text-slate-700">{tag.replace('#', '')}</span>
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-6 mt-4">
        {posts.map((post) => (
          <div key={post.id} className="card p-0 overflow-hidden border-none shadow-md">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
                  <p className="text-[10px] text-slate-400">{post.time} • with <span className="text-primary font-bold">{post.petName}</span></p>
                </div>
              </div>
              <button onClick={() => handleShare(post)} className="text-slate-400 p-2 hover:bg-slate-50 rounded-full">
                <Share2 size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <p className="text-sm text-slate-700 leading-relaxed">{post.content}</p>
            </div>

            {/* Image */}
            <div className="h-72 w-full">
              <img src={post.image} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center gap-6">
              <button 
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors active:scale-125 ${likedPosts.includes(post.id) ? 'text-rose-500' : 'text-slate-600'}`}
              >
                <Heart size={20} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                <span className="text-xs font-bold">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
              </button>
              <button 
                onClick={() => alert('Comments feature coming soon!')}
                className="flex items-center gap-1.5 text-slate-600"
              >
                <MessageCircle size={20} />
                <span className="text-xs font-bold">{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreating && (
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
              className="w-full bg-white rounded-t-[40px] p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Create Post</h2>
                <button onClick={() => setIsCreating(false)} className="p-2 bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Me" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="text"
                      placeholder="Tag your pet (optional)"
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-xs"
                      value={newPost.petName}
                      onChange={e => setNewPost({ ...newPost, petName: e.target.value })}
                    />
                  </div>
                </div>

                <textarea 
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm h-32 resize-none"
                  placeholder="What's on your mind?"
                  required
                  value={newPost.content}
                  onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                />

                <div className="flex gap-4">
                  <button type="button" className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                    <Camera size={20} />
                    Add Photo
                  </button>
                  <button type="submit" className="flex-[2] btn-primary">
                    <Send size={20} />
                    Post
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
