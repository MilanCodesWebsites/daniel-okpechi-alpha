 // Initialize Lucide icons
 lucide.createIcons();

 // Combined UI/UX design-related icons
 const designIcons = [
     // Lucide icons
     { type: 'lucide', name: 'layout' },
     { type: 'lucide', name: 'pen-tool' },
     { type: 'lucide', name: 'component' },
     { type: 'lucide', name: 'palette' },
     { type: 'lucide', name: 'type' },
     { type: 'lucide', name: 'layers' },
     { type: 'lucide', name: 'figma' },
     
     // Font Awesome icons
     { type: 'fa', name: 'fa-pencil-ruler' },
     { type: 'fa', name: 'fa-object-group' },
     { type: 'fa', name: 'fa-mobile-screen' },
     { type: 'fa', name: 'fa-desktop' },
     { type: 'fa', name: 'fa-bezier-curve' },
     { type: 'fa', name: 'fa-sliders' },
     { type: 'fa', name: 'fa-icons' },
     { type: 'fa', name: 'fa-font' },
     { type: 'fa', name: 'fa-square' },
     { type: 'fa', name: 'fa-circle' },
     { type: 'fa', name: 'fa-wand-magic-sparkles' }
 ];

 // Create floating icons
 function createFloatingIcons() {
     const container = document.querySelector('.loading-wrapper');
     const iconCount = 15;
     
     for (let i = 0; i < iconCount; i++) {
         const icon = document.createElement('i');
         const randomIcon = designIcons[Math.floor(Math.random() * designIcons.length)];
         
         // Random position
         const posX = Math.random() * 100;
         const posY = Math.random() * 100;
         
         // Random movement
         const moveX = (Math.random() - 0.5) * 300;
         const moveY = (Math.random() - 0.5) * 300;
         
         // Random size
         const size = Math.random() * 24 + 16;
         
         icon.style.left = `${posX}%`;
         icon.style.top = `${posY}%`;
         icon.style.fontSize = `${size}px`;
         icon.style.setProperty('--move-x', `${moveX}px`);
         icon.style.setProperty('--move-y', `${moveY}px`);
         icon.style.animationDelay = `${Math.random() * 5}s`;
         icon.style.animationDuration = `${15 + Math.random() * 10}s`;
         
         if (randomIcon.type === 'lucide') {
             icon.className = `floating-icon`;
             icon.setAttribute('data-lucide', randomIcon.name);
         } else {
             icon.className = `floating-icon fa-icon ${randomIcon.name}`;
         }
         
         container.appendChild(icon);
     }
     
     lucide.createIcons();
 }

 // Animate progress bar and handle transition
 const progressBar = document.querySelector('.progress');
 let progress = 0;
 const interval = setInterval(() => {
     progress += Math.random() * 5;
     progressBar.style.width = `${Math.min(progress, 100)}%`;
     
     if (progress >= 100) {
         clearInterval(interval);
         document.body.classList.add('loading-complete');
         
         setTimeout(() => {
             const loadingWrapper = document.querySelector('.loading-wrapper');
             if (loadingWrapper) {
                 loadingWrapper.remove();
             }
         }, 500);
     }
 }, 300);

 // Initialize everything when page loads
 window.addEventListener('load', () => {
     createFloatingIcons();
     
     // Example: Remove loading screen after 5 seconds max if something fails
     setTimeout(() => {
         if (!document.body.classList.contains('loading-complete')) {
             document.body.classList.add('loading-complete');
             document.querySelector('.loading-wrapper')?.remove();
         }
     }, 5000);
 });

 const core = document.querySelector('.cursor-core');
 const lasers = [];
 const trailCount = 25;

 for (let i = 0; i < trailCount; i++) {
   const laser = document.createElement('div');
   laser.classList.add('laser');
   document.body.appendChild(laser);
   lasers.push({ el: laser, x: 0, y: 0 });
 }

 let mouseX = window.innerWidth / 2;
 let mouseY = window.innerHeight / 2;

 document.addEventListener('mousemove', e => {
   mouseX = e.clientX;
   mouseY = e.clientY;
 });

 document.addEventListener('mousedown', () => {
   core.classList.add('clicked');
   setTimeout(() => core.classList.remove('clicked'), 400);
 });

 document.querySelectorAll('a, button, input, textarea').forEach(el => {
   el.addEventListener('mouseenter', () => core.classList.add('hovering'));
   el.addEventListener('mouseleave', () => core.classList.remove('hovering'));
 });

 function animate() {
   let lastX = mouseX;
   let lastY = mouseY;

   lasers.forEach((laser, i) => {
     laser.x += (lastX - laser.x) * 0.12;
     laser.y += (lastY - laser.y) * 0.12;
     laser.el.style.left = `${laser.x}px`;
     laser.el.style.top = `${laser.y}px`;
     lastX = laser.x;
     lastY = laser.y;
   });

   core.style.left = `${mouseX}px`;
   core.style.top = `${mouseY}px`;

   requestAnimationFrame(animate);
 }

 animate();