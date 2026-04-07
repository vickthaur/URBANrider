/**
 * URBAN RIDERS - Script interactif
 * Gère les animations au défilement, le menu mobile et le formulaire.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ANIMATIONS AU DÉFILEMENT (Scroll Reveal)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================================================
       2. EFFET DU HEADER AU SCROLL (Sticky Header)
       ========================================================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. DÉFILEMENT DOUX (Smooth Scroll) POUR LES LIENS D'ANCRAGE
       ========================================================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ==========================================================================
       4. GESTION DU FORMULAIRE DE CONTACT (Simulation d'envoi)
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // 1. État de chargement
            submitBtn.textContent = "Envoi en cours...";
            submitBtn.style.backgroundColor = "var(--accent-yellow)";
            submitBtn.style.color = "var(--text-black)";
            submitBtn.style.pointerEvents = "none";

            // 2. Simulation d'envoi
            setTimeout(() => {
                submitBtn.textContent = "Message envoyé ! 🚀";
                submitBtn.style.backgroundColor = "#00C853"; 
                submitBtn.style.color = "white";
                
                contactForm.reset();

                // 3. Retour à la normale
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = "";
                    submitBtn.style.color = "";
                    submitBtn.style.pointerEvents = "auto";
                }, 3000);
            }, 1500);
        });
    }

    /* ==========================================================================
       5. MENU BURGER MOBILE (Menu interactif plein écran)
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinksMobile = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && mainNav) {
        // Ouvre/Ferme le menu au clic sur le burger
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Empêche de scroller la page derrière le menu
        });

        // Ferme le menu automatiquement quand on clique sur un lien du menu
        navLinksMobile.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
});
