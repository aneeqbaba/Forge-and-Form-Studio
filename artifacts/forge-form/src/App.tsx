import { useEffect, useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Programs', href: '#programs' },
  { label: 'Coaches', href: '#coaches' },
  { label: 'Membership', href: '#membership' },
  { label: 'Journal', href: '#journal' },
];

const programs = [
  { no: '01', name: 'The Forge', copy: 'Progressive strength for a capable, resilient body.' },
  { no: '02', name: 'Form / 01', copy: 'Technique-led training. Slow enough to feel everything.' },
  { no: '03', name: 'Open Floor', copy: 'Independent practice, with an expert eye nearby.' },
];

const journal = [
  {
    category: 'Practice',
    date: '06.14.24',
    title: 'The long way up: why we train in seasons',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1100&q=80',
  },
  {
    category: 'Studio notes',
    date: '05.29.24',
    title: 'A room that asks you to pay attention',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Fieldwork',
    date: '04.08.24',
    title: 'On the quiet power of consistency',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be5010b?auto=format&fit=crop&w=900&q=80',
  },
];

function scrollToId(id: string, closeMenu?: () => void) {
  closeMenu?.();
  const target = document.querySelector(id);
  if (!target) return;

  document.documentElement.classList.remove('is-navigating');
  void document.documentElement.offsetWidth;
  document.documentElement.classList.add('is-navigating');

  const headerOffset = 24;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  window.history.replaceState(null, '', id);
  window.setTimeout(() => document.documentElement.classList.remove('is-navigating'), 720);
}

function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, href: string, closeMenu?: () => void) {
  event.preventDefault();
  scrollToId(href, closeMenu);
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <>
      <header className="header">
        <a className="wordmark" href="#top" data-testid="link-wordmark" onClick={(event) => handleAnchorClick(event, '#top', () => setMenuOpen(false))}>
          <span className="wordmark-mark" aria-hidden="true" />
          <span>FORGE <i className="copper">&amp;</i> FORM</span>
        </a>
        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => handleAnchorClick(event, item.href)} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#visit" onClick={(event) => handleAnchorClick(event, '#visit')} data-testid="link-header-visit"><span>Visit the studio</span></a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          data-testid="button-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>
      </header>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            data-testid={`link-mobile-${item.label.toLowerCase()}`}
            style={{ transitionDelay: menuOpen ? `${index * 55 + 80}ms` : '0ms' }}
            onClick={(event) => handleAnchorClick(event, item.href, () => setMenuOpen(false))}
          >
            {item.label}
          </a>
        ))}
        <a href="#visit" data-testid="link-mobile-visit" onClick={(event) => handleAnchorClick(event, '#visit', () => setMenuOpen(false))}>Visit the studio <ArrowUpRight size={22} strokeWidth={1.2} /></a>
        <span className="mobile-note">San Francisco · Est. 2018</span>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-content">
        <div className="hero-kicker reveal">A strength and wellness studio</div>
        <h1 className="reveal delay-1">Strength is<br /><em>built,</em> not born.</h1>
        <div className="hero-bottom reveal delay-2">
          <p className="hero-dek">A considered approach to training for people who want to be in their bodies for a long time.</p>
          <div className="hero-actions">
            <a className="solid-cta" href="#membership" data-testid="link-hero-membership"><span>Find your practice</span></a>
            <a className="outline-cta" href="#philosophy" data-testid="link-hero-story"><span>Our approach <ArrowUpRight size={15} /></span></a>
          </div>
        </div>
      </div>
      <div className="scroll-mark">Scroll to explore</div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className="section">
      <div className="intro-grid">
        <div>
          <span className="eyebrow reveal">The philosophy</span>
          <h2 className="intro-title reveal delay-1">More than<br />the mirror.</h2>
          <div className="intro-index reveal delay-2">
            <span>01</span>
            <span>Training for the long game</span>
          </div>
        </div>
        <div className="intro-copy reveal delay-2">
          <p>We build the kind of strength that makes the rest of life feel more possible.</p>
          <p>Forge &amp; Form is for the curious and committed. Every session pairs intelligent programming with patient coaching, so progress is measured in better movement, steadier attention, and a body you can rely on. No quick fixes. No performance for performance's sake. Just a practice worth returning to.</p>
          <div className="intro-principles" aria-label="Forge and Form principles">
            <span>01 / Precision</span>
            <span>02 / Patience</span>
            <span>03 / Practice</span>
          </div>
          <a className="inline-link" href="#coaches" onClick={(event) => handleAnchorClick(event, '#coaches')} data-testid="link-philosophy-coaches">Meet the people behind the practice <span>→</span></a>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="section section-tint">
      <div className="program-header">
        <div>
          <span className="eyebrow reveal">The work</span>
          <h2 className="section-title reveal delay-1">Choose your<br />starting point.</h2>
        </div>
        <a className="inline-link reveal delay-2" href="#visit" data-testid="link-programs-visit">See the studio <span>→</span></a>
      </div>
      <div className="programs">
        {programs.map((program, index) => (
          <a href="#visit" className={`program reveal delay-${index + 1}`} key={program.no} data-testid={`card-program-${program.no}`}>
            <div className="program-content">
              <span className="program-no">{program.no} / 03</span>
              <h3>{program.name}</h3>
              <p>{program.copy}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Coaches() {
  return (
    <section id="coaches" className="section section-dark">
      <div className="coaches-wrap">
        <div className="coaches-intro">
          <span className="eyebrow reveal">The coaching floor</span>
          <h2 className="section-title reveal delay-1">A sharp eye<br />for the work.</h2>
          <p className="reveal delay-2">Our coaches bring years of study and a low-ego approach to every session. They see the detail, then help you see it too.</p>
          <a className="outline-cta reveal delay-3" href="#visit" data-testid="link-coaches-consult"><span>Talk to a coach <ArrowUpRight size={15} /></span></a>
        </div>
        <div className="coaches">
          <article className="coach reveal delay-1">
            <div className="coach-image"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" alt="Coach standing in the studio" /></div>
            <div className="coach-details"><h3>Leah Okafor</h3><p>Strength · Mobility</p></div>
          </article>
          <article className="coach reveal delay-2">
            <div className="coach-image"><img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1000&q=80" alt="Coach preparing for a session" /></div>
            <div className="coach-details"><h3>Jonah Reed</h3><p>Power · Movement</p></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="section">
      <div className="mosaic reveal">
        <div className="mosaic-item"><img src="https://images.unsplash.com/photo-1584380931214-dbb5b72e7fd0?auto=format&fit=crop&w=1100&q=80" alt="Barbell and training equipment" /></div>
        <div className="mosaic-item"><img src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=80" alt="Light crossing the studio floor" /></div>
        <div className="mosaic-item"><img src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1100&q=80" alt="Close view of training rings" /></div>
        <div className="mosaic-item"><img src="https://images.unsplash.com/photo-1517964603305-11c0f6f66012?auto=format&fit=crop&w=900&q=80" alt="Studio floor detail" /></div>
      </div>
      <div className="design-note">
        <h2 className="reveal">A room with<br /><em className="copper">intention.</em></h2>
        <p className="reveal delay-1">Raw oak. Brushed steel. Light that changes with the day. The studio is a tool in itself: quiet, tactile, and stripped back enough to let the work speak.</p>
      </div>
    </section>
  );
}

function Membership() {
  const tiers = [
    { no: '01', name: 'Open Floor', copy: 'For independent practice with all the right tools and a little room to think.', price: '$185', suffix: '/ month', includes: ['Unlimited floor access', 'Personalized starting plan', 'Weekly coach check-in'] },
    { no: '02', name: 'The Forge', copy: 'Our full practice. Small-group coaching, open floor, and a program built around you.', price: '$295', suffix: '/ month', recommended: true, includes: ['Small-group coaching', 'Unlimited floor access', 'Monthly programming review'] },
    { no: '03', name: 'Private Form', copy: 'One-to-one attention for a focused block of work, built around your particular goals.', price: '$520', suffix: '/ 4 sessions', includes: ['Four private sessions', 'Movement assessment', 'A plan built around your life'] },
  ];
  return (
    <section id="membership" className="section section-tint">
      <div className="membership-head">
        <div><span className="eyebrow reveal">Membership</span><h2 className="section-title reveal delay-1">Make a practice<br />of it.</h2></div>
        <p className="reveal delay-2">Not a contract. A place to return to, with enough structure to keep you honest.</p>
      </div>
      <div className="tiers">
        {tiers.map((tier, index) => (
          <article className={`tier reveal delay-${index + 1}${tier.recommended ? ' recommended' : ''}`} key={tier.name} data-testid={`card-membership-${tier.name.toLowerCase().replaceAll(' ', '-')}`}>
            <span className="tier-no">{tier.no} / 03</span>
            <h3>{tier.name}</h3>
            <p>{tier.copy}</p>
            <ul className="tier-includes">
              {tier.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="price">{tier.price} <small>{tier.suffix}</small></div>
            <a className="tier-link" href="#visit" onClick={(event) => handleAnchorClick(event, '#visit')} data-testid={`link-membership-${tier.name.toLowerCase().replaceAll(' ', '-')}`}>Start here <ArrowRight size={14} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="section quote">
      <div className="quote-inner">
        <span className="eyebrow reveal">A member's note</span>
        <blockquote className="reveal delay-1">“I came in wanting to get stronger. I left with a much better relationship to my own attention.”</blockquote>
        <cite className="reveal delay-2">Mara L. / Member since 2021</cite>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="section">
      <div className="journal-head">
        <div><span className="eyebrow reveal">From the journal</span><h2 className="section-title reveal delay-1">Notes on<br />the work.</h2></div>
        <a className="inline-link reveal delay-2" href="#journal" data-testid="link-journal-all">Read all notes <span>→</span></a>
      </div>
      <div className="journal-list">
        {journal.map((item, index) => (
          <a className={`journal-card reveal delay-${index + 1}`} href="#visit" key={item.title} data-testid={`card-journal-${index}`}>
            <div className="journal-meta"><span>{item.category}</span><span>{item.date}</span></div>
            <div className="journal-image"><img src={item.image} alt="" /></div>
            <h3>{item.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [contactError, setContactError] = useState(false);
  const handleContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSending(true);
    setSent(false);
    setContactError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') ?? ''),
          email: String(formData.get('email') ?? ''),
          interest: String(formData.get('interest') ?? ''),
        }),
      });

      if (!response.ok) throw new Error('Contact request failed');
      setSent(true);
    } catch {
      setContactError(true);
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <section id="visit" className="section section-tint">
        <div className="contact">
          <div className="contact-copy">
            <span className="eyebrow reveal">Come by</span>
            <h2 className="reveal delay-1">Your next<br /><em className="copper">stronger</em> day.</h2>
            <p className="reveal delay-2">Start with a conversation. Tell us where you are, and we will help you find the right way in.</p>
            <div className="contact-details reveal delay-3">
              <div><span>Find us</span><strong>418 Valencia Street<br />San Francisco, CA 94103</strong></div>
              <div><span>Hours</span><strong>Mon–Fri · 6am–8pm<br />Sat–Sun · 8am–2pm</strong></div>
            </div>
          </div>
          <form className="contact-form reveal delay-1" onSubmit={handleContact} data-testid="form-contact">
            <div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" required data-testid="input-contact-name" /></div>
            <div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" required data-testid="input-contact-email" /></div>
            <div className="field"><label htmlFor="contact-interest">What brings you in?</label><textarea id="contact-interest" name="interest" rows={2} required data-testid="input-contact-interest" /></div>
            <div className="form-foot">
              <button className="solid-cta" type="submit" disabled={sending} data-testid="button-contact-submit"><span>{sending ? 'Sending…' : 'Send a note'} {!sending && <ArrowRight size={15} />}</span></button>
              {sent && <span className="form-status" role="status" data-testid="status-contact-success">Thank you. Your note was sent to the studio.</span>}
              {contactError && <span className="form-status form-status-error" role="alert" data-testid="status-contact-error">We couldn’t send your note. Please try again.</span>}
            </div>
          </form>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="wordmark" href="#top" data-testid="link-footer-wordmark"><span className="wordmark-mark" aria-hidden="true" /><span>FORGE <i className="copper">&amp;</i> FORM</span></a>
            <p>Strength is built, not born.<br />A studio for the long game.</p>
          </div>
          <div><h3>Explore</h3><nav><a href="#philosophy" data-testid="link-footer-philosophy">Philosophy</a><a href="#programs" data-testid="link-footer-programs">Programs</a><a href="#membership" data-testid="link-footer-membership">Membership</a></nav></div>
          <div className="newsletter"><h3>Occasional notes</h3><p>A thoughtful dispatch from the floor. No noise, just the useful things.</p><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setNewsletterSent(true); event.currentTarget.reset(); }} data-testid="form-newsletter"><input type="email" required placeholder="Your email address" aria-label="Your email address" data-testid="input-newsletter-email" /><button type="submit" aria-label="Subscribe" data-testid="button-newsletter-submit"><ArrowRight size={17} /></button></form>{newsletterSent && <span className="form-status" role="status" data-testid="status-newsletter-success">You're on the list.</span>}</div>
        </div>
        <div className="footer-bottom"><span>© 2024 Forge &amp; Form Studio</span><span>Made for the long game</span></div>
      </footer>
    </>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observerRef.current?.observe(element));
    return () => observerRef.current?.disconnect();
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  return (
    <main className="site">
      <div className="route-transition" aria-hidden="true" />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Philosophy />
      <Programs />
      <Coaches />
      <Studio />
      <Membership />
      <Testimonial />
      <Journal />
      <Contact />
    </main>
  );
}

export default Home;