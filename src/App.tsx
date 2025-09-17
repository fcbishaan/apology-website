import React, { useState, useEffect } from 'react';

function Section({ id, title, children, className = "" }: { 
  id: string; 
  title: string; 
  children: React.ReactNode; 
  className?: string 
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 mx-auto max-w-4xl rounded-3xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-pink-200/50 transition-all duration-500 hover:shadow-pink-100/50 ${className}`}
    >
      <h2
        className="mb-6 text-3xl font-bold text-gray-800 text-center"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed text-lg">{children}</div>
    </section>
  )
}

function FloatingHeart({ delay = 0 }: { delay?: number }) {
  return (
    <div 
      className="absolute animate-pulse opacity-20"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    >
      <div className="text-pink-300 text-2xl">💝</div>
    </div>
  );
}

// Sticky site header with navigation
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('#home');
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#apology', label: 'Apology' },
    { href: '#memories', label: 'Memories' },
    { href: '#promises', label: 'Promises' },
    { href: '#love', label: 'Love' },
    { href: '#hope', label: 'Hope' },
    { href: '#final', label: 'Final' },
  ];

  useEffect(() => {
    const ids = links.map(l => l.href.replace('#',''));
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) {
        setActive(`#${visible.target.id}`);
      }
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0.25, 0.5, 0.75, 1] });

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/60 border-b border-pink-100/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
            For Shristi
          </span>
          <span aria-hidden>💖</span>
        </a>
        <nav className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link nav-underline px-3 py-2 rounded-full text-sm hover:text-pink-600 hover:bg-pink-50 ${active === l.href ? 'nav-link-active' : 'text-gray-700'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-pink-700 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? '✖️' : '☰'}</span>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-pink-100/60 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-2 grid grid-cols-2 gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm hover:text-pink-700 hover:bg-pink-50 ${active === l.href ? 'bg-pink-50 text-pink-700' : 'text-gray-700'}`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
      <Header />
      {/* Floating hearts background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <FloatingHeart key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Hero Section with enhanced design */}
      <section
        id="home"
        className="relative w-full min-h-screen scroll-mt-24 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white text-center px-6 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-pink-300 text-2xl animate-bounce">💌</span>
              <span className="text-white/90 text-sm font-medium">A Message from My Heart</span>
            </div>
          </div>
          
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200 bg-clip-text text-transparent"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Dear Shristi
          </h1>
          
          <p className="text-xl sm:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Every sunrise reminds me of your smile, every sunset of my mistakes
          </p>
          
          <div className="text-sm text-white/70">
            {currentTime.toLocaleString('en-IN', { 
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'medium'
            })}
          </div>
        </div>
      </section>

      {/* Main Content with enhanced spacing and design */}
      <main className="relative mx-auto max-w-5xl px-6 py-20 space-y-16">
        
        <Section id="apology" title="My Heartfelt Apology" className="border-l-4 border-rose-400">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🙏</div>
          </div>
          <div className="text-center space-y-6">
            <p className="text-xl leading-relaxed">
              Shristi, I am deeply, truly sorry for the pain I have caused you. There are no words that can undo the hurt, 
              no excuses that can justify my behavior. I was wrong—completely, utterly wrong.
            </p>
            <p className="text-lg text-gray-600">
              You deserved love, respect, patience, and kindness. Instead, I gave you anger and pain. 
              I take full responsibility for my actions, and I am ashamed of the person I became in those moments.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-rose-50 border-2 border-rose-200">
              <span className="text-rose-500">❤️</span>
              <span className="font-medium text-rose-700">I am truly, deeply sorry</span>
            </div>
          </div>
        </Section>

        <Section id="memories" title="Beautiful Memories We Created" className="bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-gray-600">These moments will forever be treasured in my heart</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: '💃', text: 'Your adorable dancing moves during our video calls', color: 'from-amber-100 to-orange-100' },
              { icon: '😊', text: 'Your infectious laughter that brightened my day', color: 'from-yellow-100 to-pink-100' },
              { icon: '💝', text: 'The way you cared for everyone around you', color: 'from-pink-100 to-rose-100' },
              { icon: '🌟', text: 'Your honesty and genuine heart', color: 'from-purple-100 to-blue-100' },
            ].map((memory, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${memory.color} border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <div className="text-3xl mb-3 text-center">{memory.icon}</div>
                <p className="text-center text-gray-700 font-medium">{memory.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/video calls.jpg', title: 'Daily Stories', caption: 'You loved to share everything you did the whole day — I miss those talks.' },
              { src: '/pic with efforts.jpg', title: 'Your Effort', caption: 'You put in so much effort to click this picture for me.' },
              { src: '/simplicity.jpg', title: 'Simple & Beautiful', caption: 'In the blue dress, your simplicity took my heart.' },
              { src: '/without filter.jpg', title: 'Natural You', caption: 'Without filters — just you, perfectly you.' },
              { src: '/hottness.jpg', title: 'Your Radiance', caption: 'Your glow, your charm — forever in my memories.' },
              { src: '/test image .jpg', title: 'Precious Moment', caption: 'A moment I keep close to my heart.' },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-200/50 hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={item.src} 
                  alt={item.title}
                  className="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.image-fallback');
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="image-fallback hidden absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 items-center justify-center text-6xl opacity-80">
                  📷
                </div>
                <div className="p-4 bg-white/90 backdrop-blur">
                  <h3 className="font-bold text-gray-800 mb-1 text-center">{item.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 italic">Every memory with you is a treasure I'll always cherish</p>
          </div>
        </Section>

        <Section id="promises" title="My Promise to Change" className="border-l-4 border-emerald-400">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-lg text-gray-600">I'm working every day to become the person you deserved from the start</p>
          </div>
          
          <div className="space-y-6">
            {[
              { 
                icon: '🧘', 
                title: 'Managing My Anger', 
                desc: 'I am learning to pause, breathe, and think before I speak or act. Taking anger management seriously and practicing mindfulness daily.',
                color: 'from-blue-100 to-indigo-100',
                progress: '85'
              },
              { 
                icon: '🤝', 
                title: 'Treating You with Respect', 
                desc: 'Understanding that respect is not optional—it\'s fundamental. Learning to honor your feelings, opinions, and boundaries always.',
                color: 'from-green-100 to-emerald-100',
                progress: '90'
              },
              { 
                icon: '💬', 
                title: 'Improving Communication', 
                desc: 'Learning to listen more, speak thoughtfully, and express my feelings without hurting others. Taking courses and reading books on healthy communication.',
                color: 'from-purple-100 to-pink-100',
                progress: '80'
              },
            ].map((promise, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${promise.color} border border-white/50 shadow-lg`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{promise.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{promise.title}</h3>
                    <p className="text-gray-700 mb-4">{promise.desc}</p>
                    <div className="bg-white/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${promise.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Progress: {promise.progress}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="love" title="My Love for You" className="bg-gradient-to-br from-rose-50 to-pink-100 border-l-4 border-pink-400">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💖</div>
          </div>
          <div className="text-center space-y-6">
            <p className="text-xl leading-relaxed">
              Shristi, my love for you hasn't diminished—it has grown deeper with understanding of how precious you are 
              and how terribly I failed to show it properly.
            </p>
            <p className="text-lg text-gray-600">
              You are an incredible person—kind, intelligent, beautiful inside and out. 
              You deserve someone who treats you like the queen you are, every single day.
            </p>
            <p className="text-lg text-gray-600">
              I want to be that person. I want to earn back your trust, to prove that I can be the partner you deserve, 
              to love you the way you should be loved—with patience, respect, and endless care.
            </p>
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pink-100 border-2 border-pink-300">
              <span className="text-2xl">💕</span>
              <span className="font-bold text-pink-700 text-lg">I love you, Shristi Jain</span>
            </div>
          </div>
        </Section>

        <Section id="hope" title="My Hope for Us" className="border-l-4 border-purple-400">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌈</div>
          </div>
          <div className="text-center space-y-6">
            <p className="text-xl leading-relaxed">
              I know I have broken your trust, and I know trust isn't easily repaired. 
              I don't expect immediate forgiveness—I know I need to earn it.
            </p>
            <p className="text-lg text-gray-600">
              All I ask is for a chance to show you the changes I'm making. 
              A chance to prove that the person who hurt you is not who I truly am or want to be.
            </p>
            <p className="text-lg text-gray-600">
              Whether we can rebuild what we had or if you need space, I will respect your decision. 
              Your happiness and peace of mind matter more than my own desires.
            </p>
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200">
              <p className="font-bold text-lg text-purple-800">
                "I believe in second chances, in growth, in the power of genuine change. 
                I believe in us, if you'll let me prove it."
              </p>
            </div>
          </div>
        </Section>

        <Section id="final" title="From My Heart to Yours">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💌</div>
          </div>
          <div className="text-center space-y-6">
            <p className="text-xl leading-relaxed italic">
              "Some people come into our lives and leave footprints on our hearts, 
              and we are never the same again."
            </p>
            <p className="text-lg text-gray-700">
              Shristi, you have left beautiful footprints on my heart. I'm sorry I stumbled and hurt you along the way. 
              You deserve all the love, respect, and happiness in the world.
            </p>
            <p className="text-lg text-gray-700">
              Thank you for the beautiful memories. Thank you for showing me what real love feels like. 
              Thank you for being you.
            </p>
            <div className="mt-8 p-8 bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 rounded-3xl border-2 border-pink-200">
              <p className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                With all my love and deepest regret,
              </p>
              <p className="text-3xl font-bold text-pink-600" style={{ fontFamily: 'Georgia, serif' }}>
                Ishaan ❤️
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Written with love, hope, and a promise to be better • {new Date().toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </Section>
      </main>

      

      {/* Footer */}
      <footer className="text-center py-12 text-gray-500">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-pink-400">💝</span>
          <span>Made with love and hope for forgiveness</span>
          <span className="text-pink-400">💝</span>
        </div>
        <p className="text-sm">
          "The best apology is changed behavior" - Unknown
        </p>
      </footer>
    </div>
  )
}

export default App