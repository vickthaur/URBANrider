/**
 * URBAN RIDERS - Script interactif
 * Gère les animations au défilement, le menu et le formulaire.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ANIMATIONS AU DÉFILEMENT (Scroll Reveal)
       ========================================================================== */
    // On sélectionne tous les éléments qui doivent être animés
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    // Configuration de l'observateur (se déclenche quand 15% de l'élément est visible)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si l'élément n'est pas dans le champ de vision, on ne fait rien
            if (!entry.isIntersecting) return;

            // Sinon, on ajoute la classe 'active' pour lancer l'animation CSS
            entry.target.classList.add('active');
            
            // On arrête d'observer cet élément pour que l'animation ne se joue qu'une fois
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    // On applique l'observateur à chaque élément
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================================================
       2. EFFET DU HEADER AU SCROLL (Sticky Header)
       ========================================================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        // Si on descend de plus de 50 pixels, on ajoute une ombre et on réduit le header
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
            
            // Ignorer s'il s'agit juste d'un '#' vide
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
            // Empêche le rechargement de la page
            e.preventDefault();

            // Récupère le bouton pour le modifier
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // 1. État de chargement
            submitBtn.textContent = "Envoi en cours...";
            submitBtn.style.backgroundColor = "var(--accent-yellow)";
            submitBtn.style.color = "var(--text-black)";
            submitBtn.style.pointerEvents = "none";

            // 2. Simulation du délai serveur (1.5 secondes) puis message de succès
            setTimeout(() => {
                submitBtn.textContent = "Message envoyé ! 🚀";
                submitBtn.style.backgroundColor = "#00C853"; // Vert succès
                submitBtn.style.color = "white";
                
                // On vide le formulaire
                contactForm.reset();

                // 3. Retour à l'état initial après 3 secondes
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
       5. MENU BURGER MOBILE (Simple alerte pour l'exemple)
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Dans une vraie application, on basculerait une classe CSS pour afficher le menu.
            // Vu que notre CSS cache le menu principal sur mobile pour simplifier l'exemple :
            alert("Bientôt disponible ! La navigation mobile sera activée dans la version finale.");
        });
    }
});
