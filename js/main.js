/**
 * Fichier principal - Point d'entrée de l'application
 * Importe et initialise tous les modules
 */
import { initTheme, toggleTheme } from './theme-manager.js';
import { initMobileMenu } from './mobile-menu.js';
import { onDOMReady, debounce } from './utils.js';

// Fonction principale d'initialisation
function initApp() {
    console.log('Initialisation de l\'application...');
    
    // Initialisation du gestionnaire de thème (chargement initial)
    // initTheme(); // initTheme est déjà appelé par le script inline dans <head>
    
    // Initialisation du menu mobile
    initMobileMenu();
    
    // Ajout de l'écouteur pour le bouton de changement de thème (utilisation de la délégation)
    document.addEventListener('click', function(event) {
        // Remonter dans le DOM pour trouver un parent .theme-toggle
        const toggleButton = event.target.closest('.theme-toggle');
        if (toggleButton) {
            console.log('Clic sur le bouton de thème détecté via délégation!');
            toggleTheme(); // Appelle la fonction importée pour changer le thème
        }
    });
    
    // Initialiser l'adaptation du logo au thème (si nécessaire)
    // initLogoThemeAdapter(); // Cette fonction semble obsolète car le logo est SVG maintenant
    
    // Gestion des événements de redimensionnement (optionnel)
    // window.addEventListener('resize', debounce(() => {
    //     console.log('Fenêtre redimensionnée');
    // }, 250));
    
    console.log('Application initialisée avec succès!');
}

// Lancer l'initialisation une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', initApp);

// Exporter les fonctions pour l'utilisation dans d'autres modules (si nécessaire)
export { initApp };


/* Fonction pour adapter le logo au thème - Semble obsolète avec le logo SVG actuel
function initLogoThemeAdapter() {
    const updateLogoColors = () => {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        console.log('État du thème détecté:', isDarkMode ? 'sombre' : 'clair');
        
        const logos = document.querySelectorAll('img.logo-img'); // Cible les anciennes images
        
        logos.forEach(logo => {
            // Ajuster les classes en fonction du thème
            if (isDarkMode) {
                logo.classList.add('dark-logo');
                logo.classList.remove('light-logo');
            } else {
                logo.classList.add('light-logo');
                logo.classList.remove('dark-logo');
            }
        });
    };
    
    // Observer les changements de thème
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-theme') {
                console.log('Changement de thème détecté:', document.documentElement.getAttribute('data-theme'));
                updateLogoColors();
            }
        });
    });
    
    // Surveiller les changements d'attribut sur l'élément html
    observer.observe(document.documentElement, { attributes: true });
    
    // Appliquer les couleurs initiales
    updateLogoColors();
}
*/ 