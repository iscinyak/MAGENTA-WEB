(() => {
    const MOBILE_BREAKPOINT = 980;
    const topbar = document.querySelector('.topbar');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!topbar || !menuToggle) {
        return;
    }

    const closeMenu = () => {
        topbar.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        topbar.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
    };

    menuToggle.addEventListener('click', () => {
        if (topbar.classList.contains('menu-open')) {
            closeMenu();
            return;
        }

        openMenu();
    });

    document.addEventListener('click', (event) => {
        if (!topbar.classList.contains('menu-open')) {
            return;
        }

        if (!topbar.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    const navLinks = topbar.querySelectorAll('.main-nav a');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            closeMenu();
        }
    });
})();
