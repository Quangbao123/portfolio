const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const themeToggle = document.getElementById('themeToggle');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const navLinksMobile = Array.from(document.querySelectorAll('.nav-link-mobile'));
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const certificateCards = Array.from(document.querySelectorAll('.certificate-card'));

// Set the active state for navigation links when the user scrolls or clicks.
const setActiveLink = (targetId) => {
  const allLinks = [...navLinks, ...navLinksMobile];
  allLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === targetId);
  });
};

const handleNavClick = (event) => {
  const link = event.currentTarget;
  const targetId = link.dataset.target;
  const targetSection = document.getElementById(targetId);

  if (!targetSection) return;

  event.preventDefault();
  targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActiveLink(targetId);

  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }
};

navLinks.forEach((link) => link.addEventListener('click', handleNavClick));
navLinksMobile.forEach((link) => link.addEventListener('click', handleNavClick));

mobileMenuButton?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
});

const sections = ['about', 'projects', 'certificates', 'contact'];
const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    rootMargin: '-35% 0px -45% 0px',
    threshold: 0.2,
  }
);

sectionElements.forEach((section) => observer.observe(section));

const storedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialDarkMode = storedTheme ? storedTheme === 'dark' : systemPrefersDark;

if (initialDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.category;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    certificateCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const shouldShow = selectedCategory === 'all' || cardCategory === selectedCategory;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

setActiveLink('about');
