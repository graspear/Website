
    document.addEventListener('DOMContentLoaded', () => {
        "use strict";

        /**
         * Select an element
         */
        const select = (el, all = false) => {
            el = el.trim()
            if (all) {
                return [...document.querySelectorAll(el)]
            } else {
                return document.querySelector(el)
            }
        }

        /**
         * Event listener function
         */
        const on = (type, el, listener, all = false) => {
            let selectEl = select(el, all)
            if (selectEl) {
                if (all) {
                    selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                    selectEl.addEventListener(type, listener)
                }
            }
        }

        /**
         * On scroll event listener
         */
        const onscroll = (el, listener) => {
            el.addEventListener('scroll', listener)
        }
        
        /**
         * Animate on scroll function
         */
        const aosElements = select('.aos-animate', true);
        const animateOnScroll = () => {
             const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        const delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0');
                        setTimeout(() => {
                           entry.target.style.transitionDelay = '0s';
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            aosElements.forEach(el => {
                observer.observe(el);
            });
        };
        window.addEventListener('load', animateOnScroll);


        /**
         * Header scroll class
         */
        const header = select('#header');
        if (header) {
            const headerScrolled = () => {
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            };
            window.addEventListener('load', headerScrolled);
            onscroll(document, headerScrolled);
        }

        /**
         * Back to top button
         */
        const backtotop = select('.back-to-top');
        if (backtotop) {
            const toggleBacktotop = () => {
                if (window.scrollY > 100) {
                    backtotop.classList.add('active');
                } else {
                    backtotop.classList.remove('active');
                }
            }
            window.addEventListener('load', toggleBacktotop);
            onscroll(document, toggleBacktotop);
            on('click', '.back-to-top', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        /**
         * Mobile nav toggle
         */
        on('click', '.mobile-nav-toggle', function(e) {
            select('#navbar').classList.toggle('navbar-mobile');
            this.classList.toggle('bx-menu');
            this.classList.toggle('bx-x');
        });


        /**
         * Scrool with ofset on links with a class name .scrollto
         */
        on('click', '.scrollto', function(e) {
            if (select(this.hash)) {
                e.preventDefault();

                let navbar = select('#navbar');
                if (navbar.classList.contains('navbar-mobile')) {
                    navbar.classList.remove('navbar-mobile');
                    let navbarToggle = select('.mobile-nav-toggle');
                    navbarToggle.classList.toggle('bx-menu');
                    navbarToggle.classList.toggle('bx-x');
                }

                const element = select(this.hash);
                const header = select('#header');
                let offset = header.offsetHeight;
                
                if (!header.classList.contains('header-scrolled')) {
                    offset -= 10;
                }

                let elementPosition = element.offsetTop;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        }, true);


        /**
         * Navbar links active state on scroll
         */
        let navbarlinks = select('#navbar .scrollto', true);
        const navbarlinksActive = () => {
            let position = window.scrollY + 200;
            navbarlinks.forEach(navbarlink => {
                if (!navbarlink.hash) return;
                let section = select(navbarlink.hash);
                if (!section) return;
                if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                    navbarlink.classList.add('active');
                } else {
                    navbarlink.classList.remove('active');
                }
            })
        }
        window.addEventListener('load', navbarlinksActive);
        onscroll(document, navbarlinksActive);

        
        /**
         * Porfolio isotope and filter
         */
        window.addEventListener('load', () => {
            let portfolioContainer = select('.portfolio-container');
            if (portfolioContainer) {
                let portfolioFilters = select('#portfolio-filters li', true);

                on('click', '#portfolio-filters li', function(e) {
                    e.preventDefault();
                    portfolioFilters.forEach(function(el) {
                        el.classList.remove('filter-active');
                    });
                    this.classList.add('filter-active');

                    const filterValue = this.getAttribute('data-filter');
                    const portfolioItems = select('.portfolio-item', true);

                    portfolioItems.forEach(item => {
                       if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                           item.classList.remove('hidden');
                       } else {
                           item.classList.add('hidden');
                       }
                    });
                });
            }
        });

    });

    


    
    