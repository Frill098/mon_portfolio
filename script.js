document.addEventListener('DOMContentLoaded', function() {
 console.log('Portfolio chargé avec succès !');

 // Animation simple au scroll
 const sections = document.querySelectorAll('section');

 window.addEventListener('scroll', function() {
 sections.forEach(section => {
 const rect = section.getBoundingClientRect();
 if (rect.top < window.innerHeight && rect.bottom >= 0) {
 section.style.opacity = '1';
            }
        });
    });
});
