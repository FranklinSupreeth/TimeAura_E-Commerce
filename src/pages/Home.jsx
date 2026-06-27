import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveRight, Award, ShieldCheck, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white text-zinc-900">
      
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[5000ms]"
            alt="Luxury Watch Detail" 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-zinc-400 text-[10px] uppercase tracking-[0.5em] mb-6 animate-pulse">
            Established 1924 • Swiss Heritage
          </p>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-tight mb-8">
            The Art of <br /> <span className="italic font-light">Precision</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link to="/shop" className="group flex items-center gap-3 bg-white text-black px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-200 transition-all">
              Discover Collection <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/shop" className="text-white text-[11px] uppercase tracking-[0.2em] border-b border-white/30 pb-1 hover:border-white transition-all">
              View New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BRAND VALUES (The "Golden" Trio) */}
      <section className="py-20 border-b border-zinc-100 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center space-y-4">
            <Award size={30} strokeWidth={1} className="mx-auto text-zinc-400" />
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold">Unmatched Quality</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">Every component is hand-finished by master watchmakers in our Swiss atelier.</p>
          </div>
          <div className="text-center space-y-4">
            <ShieldCheck size={30} strokeWidth={1} className="mx-auto text-zinc-400" />
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold">5-Year Warranty</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">A testament to our confidence in the longevity of our mechanical movements.</p>
          </div>
          <div className="text-center space-y-4">
            <Globe size={30} strokeWidth={1} className="mx-auto text-zinc-400" />
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold">Global Concierge</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">White-glove delivery service and lifetime maintenance tracking for every owner.</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CURATION */}
      <section className="py-32 bg-zinc-50 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-serif tracking-tight">Iconic Pieces</h2>
              <p className="text-zinc-500 text-sm font-light uppercase tracking-widest">Hand-selected for the discerning collector</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Large Feature 1 */}
            <div className="relative group overflow-hidden bg-white">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt="Men's Watch"
                />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-serif">The Heritage Chrono</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-md">Engineered for endurance, designed for the boardroom. A masterpiece of dual-complication horology.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-black pb-1">
                  Explore Men's <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Large Feature 2 */}
            <div className="relative group overflow-hidden bg-white">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt="Women's Watch"
                />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-serif">The Stellaris Diamond</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-md">Where fine jewelry meets high-performance engineering. Featuring an 18k white gold case.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-black pb-1">
                  Explore Women's <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ANNIVERSARY COLLECTION - ELEGANT GOLD THEME */}
      <section className="py-32 px-6 md:px-10 bg-gradient-to-b from-amber-50 to-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-amber-600 text-[10px] uppercase tracking-[0.5em] font-bold">Timeless Moments</p>
            <h2 className="text-5xl font-serif tracking-tight text-zinc-900">Anniversary Collections</h2>
            <p className="text-zinc-500 text-sm font-light uppercase tracking-widest max-w-2xl mx-auto">
              Celebrate enduring elegance. Crafted for the milestones that matter most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Anniversary - Gold & Classic */}
            <div className="relative group overflow-hidden bg-white border border-amber-200 shadow-lg hover:shadow-xl transition-all">
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">💍</div>
                  <p className="text-amber-700 text-[12px] uppercase tracking-[0.3em] font-bold">Golden Elegance</p>
                </div>
              </div>
              <div className="p-8 space-y-4 bg-gradient-to-b from-white to-amber-50">
                <h3 className="text-xl font-serif text-amber-900">Golden Hour Timepieces</h3>
                <p className="text-zinc-600 text-sm font-light leading-relaxed">18k gold cases with perpetual calendars. Perfect for celebrating years of togetherness.</p>
                <Link to="/shop?category=Anniversary" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-amber-700 border-b border-amber-700 pb-1 hover:text-amber-900">
                  Explore Anniversary <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Anniversary - Diamond */}
            <div className="relative group overflow-hidden bg-white border border-amber-200 shadow-lg hover:shadow-xl transition-all">
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-100 to-zinc-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">✨</div>
                  <p className="text-slate-700 text-[12px] uppercase tracking-[0.3em] font-bold">Diamond Radiance</p>
                </div>
              </div>
              <div className="p-8 space-y-4 bg-gradient-to-b from-white to-slate-50">
                <h3 className="text-xl font-serif text-slate-900">Diamond Set Masterpieces</h3>
                <p className="text-zinc-600 text-sm font-light leading-relaxed">Platinum with lab-certified diamonds. A symbol of lasting brilliance and luxury.</p>
                <Link to="/shop?category=Anniversary" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-700 border-b border-slate-700 pb-1 hover:text-slate-900">
                  Explore Anniversary <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BIRTHDAY COLLECTION - CELEBRATORY THEME */}
      <section className="py-32 px-6 md:px-10 bg-gradient-to-b from-rose-50 via-white to-purple-50 border-b border-rose-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-rose-600 text-[10px] uppercase tracking-[0.5em] font-bold">Make Every Moment Special</p>
            <h2 className="text-5xl font-serif tracking-tight text-zinc-900">Birthday Collections</h2>
            <p className="text-zinc-500 text-sm font-light uppercase tracking-widest max-w-2xl mx-auto">
              Personalized luxury. The perfect gift for someone extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Birthday - Classic */}
            <div className="relative group overflow-hidden bg-white border-2 border-rose-300 shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-500">
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-5xl">🎂</div>
                  <p className="text-rose-700 text-[12px] uppercase tracking-[0.3em] font-bold">Classic Charm</p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-gradient-to-b from-white to-rose-50">
                <h3 className="text-lg font-serif text-rose-900">Timeless Birthday Watches</h3>
                <p className="text-zinc-600 text-xs font-light leading-relaxed">Elegant designs perfect for milestone birthdays. Engrave their special date on the caseback.</p>
                <Link to="/shop?category=Birthday" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-rose-700 border-b border-rose-700 pb-1 hover:text-rose-900">
                  Shop Birthday <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Birthday - Sports & Fun */}
            <div className="relative group overflow-hidden bg-white border-2 border-purple-300 shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-500">
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-100 to-violet-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-5xl">🎉</div>
                  <p className="text-purple-700 text-[12px] uppercase tracking-[0.3em] font-bold">Sporty Vibes</p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-gradient-to-b from-white to-purple-50">
                <h3 className="text-lg font-serif text-purple-900">Adventure Birthday Picks</h3>
                <p className="text-zinc-600 text-xs font-light leading-relaxed">Water-resistant sports watches for the active birthday celebrant. Built for durability.</p>
                <Link to="/shop?category=Birthday" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-purple-700 border-b border-purple-700 pb-1 hover:text-purple-900">
                  Shop Birthday <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Birthday - Luxury */}
            <div className="relative group overflow-hidden bg-white border-2 border-orange-300 shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-500">
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-5xl">👑</div>
                  <p className="text-orange-700 text-[12px] uppercase tracking-[0.3em] font-bold">Premium Luxury</p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-gradient-to-b from-white to-orange-50">
                <h3 className="text-lg font-serif text-orange-900">Luxury Birthday Editions</h3>
                <p className="text-zinc-600 text-xs font-light leading-relaxed">Limited edition pieces with certificate of authenticity. An unforgettable gift.</p>
                <Link to="/shop?category=Birthday" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-orange-700 border-b border-orange-700 pb-1 hover:text-orange-900">
                  Shop Birthday <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER / BRAND STORY */}
    <section className="relative h-[60vh] w-full flex items-center justify-center bg-zinc-900 overflow-hidden">
  {/* The Image */}
  <div className="absolute inset-0">
    <img 
      src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80" 
      className="w-full h-full object-cover opacity-60" 
      alt="Luxury Watch" 
    />
  </div>

  {/* The Content */}
  <div className="relative z-10 text-center px-6">
    <p className="text-zinc-400 text-[10px] uppercase tracking-[0.5em] mb-4">Swiss Heritage</p>
    <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-8">The Art of Precision</h1>
    <Link to="/shop" className="bg-white text-black px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-200 transition-all">
      Shop Collection
    </Link>
  </div>
</section>
    </div>
  );
};

export default Home;