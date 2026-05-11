document.addEventListener('DOMContentLoaded', function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tabletBreakpoint = 860;

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.setAttribute('aria-hidden', expanded ? 'true' : 'false');
    });

    document.querySelectorAll('.nav-list a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal animation
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Animated counters
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = target * progress;
        el.textContent = `${value.toFixed(decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('.counter').forEach((counter) => counterObserver.observe(counter));

  // Smooth anchor scrolling with sticky header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const headerOffset = document.querySelector('.site-header').offsetHeight + 10;
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
  });

  // Testimonials slider
  const slides = Array.from(document.querySelectorAll('.testimonial'));
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  let current = 0;

  const showSlide = (index) => {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
  };

  if (slides.length && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 7000);
  }

  // Service card 3D hover effect
  if (!prefersReducedMotion) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      let tiltFrame = null;
      let tiltX = 0;
      let tiltY = 0;

      const applyTilt = () => {
        const rotateX = ((tiltY) - 0.5) * -8;
        const rotateY = ((tiltX) - 0.5) * 8;
        card.style.transform = `translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        tiltFrame = null;
      };

      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        tiltX = (event.clientX - rect.left) / rect.width;
        tiltY = (event.clientY - rect.top) / rect.height;
        if (!tiltFrame) {
          tiltFrame = requestAnimationFrame(applyTilt);
        }
      });

      card.addEventListener('mouseleave', () => {
        if (tiltFrame) {
          cancelAnimationFrame(tiltFrame);
          tiltFrame = null;
        }
        card.style.transform = '';
      });
    });
  }

  // Hero parallax effect
  const parallaxElements = document.querySelectorAll('.parallax');
  if (!prefersReducedMotion && parallaxElements.length) {
    let latestX = 0;
    let latestY = 0;
    let rafId = null;

    const applyParallax = () => {
      parallaxElements.forEach((el) => {
        const depth = Number(el.dataset.depth || 12);
        el.style.transform = `translate3d(${(-latestX * depth).toFixed(1)}px, ${(-latestY * depth).toFixed(1)}px, 0)`;
      });
      rafId = null;
    };

    window.addEventListener('mousemove', (event) => {
      latestX = (event.clientX / window.innerWidth) - 0.5;
      latestY = (event.clientY / window.innerHeight) - 0.5;
      if (!rafId) {
        rafId = requestAnimationFrame(applyParallax);
      }
    });
  }

  // Hero particles
  const particlesRoot = document.querySelector('.hero-particles');
  if (particlesRoot && !prefersReducedMotion) {
    const particleCount = window.matchMedia(`(max-width: ${tabletBreakpoint}px)`).matches ? 16 : 24;
    for (let i = 0; i < particleCount; i += 1) {
      const p = document.createElement('i');
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.animationDuration = `${6 + Math.random() * 10}s`;
      p.style.animationDelay = `${Math.random() * 4}s`;
      p.style.opacity = `${0.25 + Math.random() * 0.65}`;
      particlesRoot.appendChild(p);
    }
  }

  // Form demo behavior
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sendBtn = document.getElementById('sendBtn');
      if (!sendBtn) return;
      sendBtn.textContent = 'Sending...';
      sendBtn.disabled = true;
      setTimeout(() => {
        sendBtn.textContent = 'Send Message';
        sendBtn.disabled = false;
        alert('This is a static demo. Connect your form to an email service or backend to receive messages.');
        contactForm.reset();
      }, 900);
    });
  }
});
