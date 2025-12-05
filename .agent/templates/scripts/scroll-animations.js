/**
 * Scroll Animations - GSAP ScrollTrigger
 * Handles all scroll-based animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    initScrollAnimations();
    initParallaxEffects();
    initStaggerAnimations();
});

/**
 * Initialize basic scroll animations
 */
function initScrollAnimations() {
    // Fade in elements
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Slide in from left
    gsap.utils.toArray('.slide-in-left').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: -80
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Slide in from right
    gsap.utils.toArray('.slide-in-right').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: 80
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Scale in elements
    gsap.utils.toArray('.scale-in').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                scale: 0.8
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

/**
 * Initialize parallax effects
 */
function initParallaxEffects() {
    gsap.utils.toArray('.parallax').forEach(element => {
        const depth = element.dataset.depth || 0.2;

        gsap.to(element, {
            yPercent: -100 * depth,
            ease: 'none',
            scrollTrigger: {
                trigger: element.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Hero image parallax
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

/**
 * Initialize stagger animations for lists and grids
 */
function initStaggerAnimations() {
    // Stagger cards
    gsap.utils.toArray('.stagger-container').forEach(container => {
        const items = container.querySelectorAll('.stagger-item');

        gsap.fromTo(items,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Stagger list items
    gsap.utils.toArray('.content-block ul, .content-block ol').forEach(list => {
        const items = list.querySelectorAll('li');

        gsap.fromTo(items,
            {
                opacity: 0,
                x: -20
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: list,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        const number = header.querySelector('.section-number');
        const title = header.querySelector('.section-title');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        if (number) {
            tl.fromTo(number,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
        }

        if (title) {
            tl.fromTo(title,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                number ? '-=0.2' : 0
            );
        }
    });
}

/**
 * Initialize chart animations
 */
function initChartAnimations() {
    gsap.utils.toArray('.chart-container').forEach(container => {
        gsap.fromTo(container,
            {
                opacity: 0,
                scale: 0.95
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {
                        // Trigger chart animation if Chart.js instance exists
                        const canvas = container.querySelector('canvas');
                        if (canvas && canvas.chart) {
                            canvas.chart.update('show');
                        }
                    }
                }
            }
        );
    });
}

/**
 * Counter animation for numbers
 */
function animateCounter(element, endValue, duration = 2) {
    const startValue = 0;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';

    gsap.to({ value: startValue }, {
        value: endValue,
        duration: duration,
        ease: 'power1.out',
        onUpdate: function () {
            element.textContent = prefix + Math.round(this.targets()[0].value).toLocaleString() + suffix;
        },
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}

// Initialize counter animations for highlight numbers
gsap.utils.toArray('.highlight-number').forEach(element => {
    const value = parseInt(element.dataset.value || element.textContent);
    if (!isNaN(value)) {
        animateCounter(element, value);
    }
});
