/**
 * Main JavaScript - Presentation Framework
 * Tab navigation and general functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProgressBar();
    initSectionObserver();
});

/**
 * Initialize tab navigation
 */
function initNavigation() {
    const navTabsContainer = document.getElementById('navTabs');
    const sections = document.querySelectorAll('.presentation-section[data-section]');

    if (!navTabsContainer || !sections.length) return;

    // Generate tabs from sections
    sections.forEach((section, index) => {
        const sectionId = section.id;
        const sectionName = section.dataset.section;
        const displayName = formatSectionName(sectionName);

        const tab = document.createElement('button');
        tab.className = 'nav-tab';
        tab.dataset.target = sectionId;
        tab.textContent = displayName;
        tab.setAttribute('aria-label', `Navigate to ${displayName}`);

        if (index === 0) {
            tab.classList.add('active');
        }

        tab.addEventListener('click', () => {
            scrollToSection(sectionId);
        });

        navTabsContainer.appendChild(tab);
    });
}

/**
 * Format section name for display
 */
function formatSectionName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Scroll to section smoothly
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navHeight = document.querySelector('.tab-navigation')?.offsetHeight || 64;
    const targetPosition = section.offsetTop - navHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Initialize progress bar
 */
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }, { passive: true });
}

/**
 * Initialize section observer for active tab highlighting
 */
function initSectionObserver() {
    const sections = document.querySelectorAll('.presentation-section[data-section]');
    const tabs = document.querySelectorAll('.nav-tab');

    if (!sections.length || !tabs.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;

                // Update active tab
                tabs.forEach(tab => {
                    if (tab.dataset.target === sectionId) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });

                // Update section active state
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
