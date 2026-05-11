// Basic interactivity: mobile menu, smooth scroll offset, scroll reveal, testimonials slider

document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    // toggle visible attribute for CSS
    if (nav.getAttribute('aria-hidden') === 'false') {
      nav.setAttribute('aria-hidden', 'true');
    } else {
      nav.setAttribute('aria-hidden', 'false');
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-list a').forEach(a => a.addEventListener('click', () => {
    nav.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // Scroll reveal using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        observer.unobserve(e.target);
      }
    });
  }, {rootMargin: "0px 0px -8% 0px", threshold: 0.05});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Smooth scroll with offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = document.querySelector('.site-header').offsetHeight + 12;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // Simple testimonials slider
  const slides = Array.from(document.querySelectorAll('.testimonial'));
  let current = 0;
  const showSlide = (idx) => {
    slides.forEach((s,i) => s.classList.toggle('active', i === idx));
  };
  document.getElementById('prevTest').addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });
  document.getElementById('nextTest').addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  // Auto-advance testimonials every 7s
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 7000);

  // lightweight form stub
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.textContent = 'Sending...';
    setTimeout(() => {
      sendBtn.textContent = 'Send Message';
      alert('This is a static demo. Connect your form to an email service or backend to receive messages.');
      contactForm.reset();
    }, 900);
  });

});

// JavaScript for animations and interactivity
window.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');

    // Add hover effects
    document.querySelectorAll('.hover-effect').forEach(el => {
        el.addEventListener('mouseover', () => {
            el.classList.add('glow-effect');
        });
        el.addEventListener('mouseout', () => {
            el.classList.remove('glow-effect');
        });
    });
});