document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle")
    const closeMenu = document.querySelector(".close-menu")
    const navMenu = document.querySelector(".nav-menu")
    const themeSwitch = document.querySelector("#checkbox")
    const body = document.body
  
    // Toggle menu
    menuToggle.addEventListener("click", () => {
      navMenu.classList.add("active")
    })
  
    closeMenu.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  
    // Theme toggle
    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        body.classList.remove("light-theme")
        body.classList.add("dark-theme")
        localStorage.setItem("theme", "dark")
      } else {
        body.classList.remove("dark-theme")
        body.classList.add("light-theme")
        localStorage.setItem("theme", "light")
      }
    })
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      body.classList.remove("light-theme")
      body.classList.add("dark-theme")
      themeSwitch.checked = true
    } else {
      body.classList.remove("dark-theme")
      body.classList.add("light-theme")
      themeSwitch.checked = false
    }
  })

  // Initialize Lucide icons
 lucide.createIcons();

 // Typewriter animation
 const typewriterElement = document.getElementById('typewriter');
 const words = ['products', 'websites', 'interfaces', 'apps'];
 let wordIndex = 0;
 let charIndex = 0;
 let isDeleting = false;
 let typingSpeed = 100;

 function typeEffect() {
     const currentWord = words[wordIndex];
     
     if (isDeleting) {
         // Deleting text
         typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
         charIndex--;
         typingSpeed = 50; // Faster when deleting
     } else {
         // Typing text
         typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
         charIndex++;
         typingSpeed = 100; // Normal typing speed
     }

     // If word is complete, start deleting after pause
     if (!isDeleting && charIndex === currentWord.length) {
         isDeleting = true;
         typingSpeed = 1500; // Pause at the end of word
     } 
     // If deletion is complete, move to next word
     else if (isDeleting && charIndex === 0) {
         isDeleting = false;
         wordIndex = (wordIndex + 1) % words.length;
         typingSpeed = 500; // Pause before starting new word
     }

     setTimeout(typeEffect, typingSpeed);
 }

 // Start the typewriter effect when the page loads
 window.addEventListener('load', typeEffect);


 (function() {
  const root = document.querySelector('.project-carousel');
  if (!root) return;
  const track = root.querySelector('.carousel-track');
  const prevBtn = root.querySelector('.carousel-arrow.prev');
  const nextBtn = root.querySelector('.carousel-arrow.next');
  const cards = Array.from(root.querySelectorAll('.carousel-card'));
  let itemsPerView = 3;
  let currentIndex = 0;

  function calculateItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1080) return 2;
    return 3;
  }

  function updateCarouselPosition() {
    itemsPerView = calculateItemsPerView();
    const total = cards.length;
    // Clamp index
    if (currentIndex > total - itemsPerView) currentIndex = total - itemsPerView;
    if (currentIndex < 0) currentIndex = 0;
    // percent for proper translation
    const percent = (100 / itemsPerView) * currentIndex;
    track.style.transform = `translateX(-${percent}%)`;
  }

  prevBtn.addEventListener('click', () => {
    itemsPerView = calculateItemsPerView();
    currentIndex -= itemsPerView;
    if (currentIndex < 0) currentIndex = cards.length - itemsPerView;
    updateCarouselPosition();
  });
  nextBtn.addEventListener('click', () => {
    itemsPerView = calculateItemsPerView();
    currentIndex += itemsPerView;
    if (currentIndex > cards.length - itemsPerView) currentIndex = 0;
    updateCarouselPosition();
  });
  window.addEventListener('resize', updateCarouselPosition);

  updateCarouselPosition();
})();


// Accordion: only one open at a time, CSS handles animation via max-height on .exp-desc
const card = document.querySelectorAll('.exp-card');

card.forEach(card => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('active')) {
      // Close all others
      cards.forEach(c => {
        c.classList.remove('active');
      });
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!card.classList.contains('active')) {
        cards.forEach(c => {
          c.classList.remove('active');
        });
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    }
  });
});

// Optional: if window resized, update the open card's height
window.addEventListener('resize', () => {
  cards.forEach(card => {
    if (card.classList.contains('active')) {
      // No manual height calculations needed
    }
  });
});

// FAQ accordion logic
document.querySelectorAll('.faq-accordion').forEach(accordion => {
  accordion.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      // Close all other items in this accordion
      accordion.querySelectorAll('.faq-item.open').forEach(i => {
        if (i !== item) i.classList.remove('open');
      });
      // Toggle this item
      if (open) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
});

const cards = document.querySelectorAll('.testimonial-card');
  const prevButtons = document.querySelectorAll('.prev');
  const nextButtons = document.querySelectorAll('.next');
  const carousel = document.getElementById('carousel');

  let current = 0;
  let autoSlide;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.remove('active');
      if (i === index) card.classList.add('active');
    });
  }

  function nextCard() {
    current = (current + 1) % cards.length;
    showCard(current);
  }

  function prevCard() {
    current = (current - 1 + cards.length) % cards.length;
    showCard(current);
  }

  prevButtons.forEach(btn => btn.addEventListener('click', prevCard));
  nextButtons.forEach(btn => btn.addEventListener('click', nextCard));

  function startAutoSlide() {
    autoSlide = setInterval(nextCard, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  }, false);

  function handleGesture() {
    if (touchEndX < touchStartX - 50) {
      nextCard();
    }
    if (touchEndX > touchStartX + 50) {
      prevCard();
    }
  }

  startAutoSlide();