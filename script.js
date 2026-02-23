/* ============================================
   GEO-DASST — Portfolio Script
   Smooth scroll, header effect, card reveal,
   mobile nav toggle, and ambient particles.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Smooth Scroll ---------- */
  const navLinks = document.querySelectorAll('.nav__link, .hero__cta');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu if open
          navList.classList.remove('open');
          navToggle.classList.remove('active');
        }
      }
    });
  });

  /* ---------- Header Scroll Effect ---------- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile Navigation Toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav__list');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navList.classList.toggle('open');
  });

  /* ---------- Scroll Reveal for Cards ---------- */
  const cards = document.querySelectorAll('.card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach(card => revealObserver.observe(card));

  /* ---------- Ambient Floating Particles ---------- */
  const particlesContainer = document.getElementById('hero-particles');

  function createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 6;

    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      background: `rgba(0, 212, 255, ${Math.random() * 0.3 + 0.05})`,
      borderRadius: '50%',
      left: `${x}%`,
      bottom: '-10px',
      animation: `particleFloat ${duration}s ${delay}s linear infinite`,
      pointerEvents: 'none',
    });

    particlesContainer.appendChild(particle);
  }

  // Create particles
  for (let i = 0; i < 30; i++) {
    createParticle();
  }

  // Inject keyframes for particles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes particleFloat {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 60 + 20}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);

});
