/**
 * Gestionnaire de menu mobile - Gère l'affichage et le comportement du menu mobile
 */
import { toggleTheme } from './theme-manager.js';

class MobileMenuManager {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.navActions = document.querySelector('.nav-actions');
        
        this.init();
    }
    
    /**
     * Initialise le gestionnaire de menu mobile
     */
    init() {
        if (this.mobileMenuBtn && this.navLinks) {
            this.setupEventListeners();
        }
    }
    
    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        this.mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        
        // Fermer le menu mobile lors du clic sur un lien
        const links = this.navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', this.handleLinkClick.bind(this));
        });
        
        // Fermer le menu mobile lors du redimensionnement de la fenêtre
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    /**
     * Bascule l'affichage du menu mobile
     */
    toggleMobileMenu() {
        // Toggle de la classe active sur le bouton
        this.mobileMenuBtn.classList.toggle('active');
        
        // Si le menu mobile n'est pas visible, on l'affiche
        if (this.navLinks.style.display === 'none' || this.navLinks.style.display === '') {
            this.showMobileMenu();
        } else {
            this.hideMobileMenu();
        }
        
        // Animation des barres du hamburger
        this.animateHamburgerIcon();
    }
    
    /**
     * Affiche le menu mobile
     */
    showMobileMenu() {
        // Ajouter la classe mobile-active au menu de navigation
        this.navLinks.classList.add('mobile-active');
        
        // Configurer les styles CSS pour le menu mobile
        this.navLinks.style.display = 'flex';
        this.navLinks.style.flexDirection = 'column';
        this.navLinks.style.position = 'absolute';
        this.navLinks.style.top = '100%';
        this.navLinks.style.left = '0';
        this.navLinks.style.width = '100%';
        this.navLinks.style.backgroundColor = 'var(--color-background)';
        this.navLinks.style.padding = 'var(--spacing-md)';
        this.navLinks.style.boxShadow = 'var(--shadow-md)';
        this.navLinks.style.zIndex = '1000';
        
        // Afficher aussi les actions de navigation dans le menu mobile
        if (this.navActions) {
            // Créer un conteneur dédié pour le bouton de thème et les actions
            const mobileActionsContainer = document.createElement('div');
            mobileActionsContainer.className = 'mobile-actions-container';
            
            // Appliquer des styles au conteneur
            mobileActionsContainer.style.display = 'flex';
            mobileActionsContainer.style.flexDirection = 'column';
            mobileActionsContainer.style.alignItems = 'center';
            mobileActionsContainer.style.width = '100%';
            mobileActionsContainer.style.marginTop = 'var(--spacing-md)';
            mobileActionsContainer.style.padding = 'var(--spacing-sm) 0';
            
            // Clone les actions de navigation
            const actionsClone = this.navActions.cloneNode(true);
            
            // Appliquer les styles au clone
            actionsClone.style.display = 'flex';
            actionsClone.style.flexDirection = 'column';
            actionsClone.style.alignItems = 'center';
            actionsClone.style.width = '100%';
            actionsClone.style.gap = 'var(--spacing-md)';
            
            // S'assurer que le bouton de thème est bien positionné
            const themeToggle = actionsClone.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.style.margin = '0 auto var(--spacing-sm) auto';
                // Le changement de thème est géré par l'écouteur global dans l'HTML
            }
            
            // S'assurer que le bouton d'action est bien positionné
            const actionButton = actionsClone.querySelector('.btn');
            if (actionButton) {
                actionButton.style.width = '100%';
                actionButton.style.textAlign = 'center';
                actionButton.style.margin = '0 auto';
            }
            
            // Ajouter le clone au conteneur et le conteneur au menu
            mobileActionsContainer.appendChild(actionsClone);
            this.navLinks.appendChild(mobileActionsContainer);
        }
    }
    
    /**
     * Cache le menu mobile
     */
    hideMobileMenu() {
        // Supprimer la classe mobile-active
        this.navLinks.classList.remove('mobile-active');
        
        // Réinitialiser les styles
        this.navLinks.style.display = '';
        this.navLinks.style.flexDirection = '';
        this.navLinks.style.position = '';
        this.navLinks.style.top = '';
        this.navLinks.style.left = '';
        this.navLinks.style.width = '';
        this.navLinks.style.backgroundColor = '';
        this.navLinks.style.padding = '';
        this.navLinks.style.boxShadow = '';
        this.navLinks.style.zIndex = '';
        
        // Retirer le conteneur des actions de navigation
        const mobileActionsContainer = this.navLinks.querySelector('.mobile-actions-container');
        if (mobileActionsContainer) {
            this.navLinks.removeChild(mobileActionsContainer);
        }
    }
    
    /**
     * Anime l'icône hamburger
     */
    animateHamburgerIcon() {
        const spans = this.mobileMenuBtn.querySelectorAll('span');
        
        if (this.mobileMenuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }
    
    /**
     * Gère le clic sur un lien du menu mobile
     */
    handleLinkClick() {
        if (window.innerWidth <= 768) {
            this.hideMobileMenu();
            this.mobileMenuBtn.classList.remove('active');
            
            // Réinitialiser l'icône hamburger
            const spans = this.mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }
    
    /**
     * Gère le redimensionnement de la fenêtre
     */
    handleResize() {
        if (window.innerWidth > 768) {
            // Réinitialiser tous les styles
            this.hideMobileMenu();
            this.mobileMenuBtn.classList.remove('active');
            
            // Réinitialiser l'icône hamburger
            const spans = this.mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }
    
    /**
     * Retourne le conteneur des actions mobiles
     * @returns {HTMLElement|null} Le conteneur des actions ou null
     */
    getMobileActionsContainer() {
        return this.navLinks.querySelector('.mobile-actions-container');
    }
    
    /**
     * Retourne le clone des actions de navigation
     * @returns {HTMLElement|null} Le clone des actions ou null
     */
    getActionClone() {
        const container = this.getMobileActionsContainer();
        return container ? container.querySelector('.nav-actions') : null;
    }
}

// Créer l'instance du gestionnaire de menu mobile
const mobileMenuManager = new MobileMenuManager();

// Fonction d'initialisation pour être utilisée dans main.js
export function initMobileMenu() {
    // L'initialisation est déjà faite dans le constructeur
    // Cette fonction est fournie pour compatibilité avec l'API existante
}

// Exporter également l'instance pour une utilisation directe
export default mobileMenuManager; 