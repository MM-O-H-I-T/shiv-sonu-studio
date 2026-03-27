
        AOS.init({ duration: 800, once: true });


        // Loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if (loader) { loader.style.opacity = '0'; loader.style.visibility = 'hidden'; }
                document.body.classList.remove('loading');
            }, 2000);
        });


        // MENU LOGIC
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const toggleIcon = menuToggle.querySelector('i');

        // Open/Close Menu
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop click from bubbling to document
            navMenu.classList.toggle('active');
            toggleIcon.classList.toggle('fa-bars');
            toggleIcon.classList.toggle('fa-times');
        });

        // Close when clicking a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                toggleIcon.classList.add('fa-bars');
                toggleIcon.classList.remove('fa-times');
            });
        });

        // CLOSE WHEN CLICKING OUTSIDE (IMPORTANT FIX)
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);

            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleIcon.classList.add('fa-bars');
                toggleIcon.classList.remove('fa-times');
            }
        });
        // --- NEW IMPROVED REVIEW SLIDER LOGIC ---
        const slider = document.getElementById('reviewSlider');
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollActive = true;
        const autoScrollSpeed = 0.8; // Slow smooth movement

        // Clone content for infinite loop effect
        const initialContent = slider.innerHTML;
        slider.innerHTML += initialContent;

        // Auto Scroll Loop
        function autoScroll() {
            if (autoScrollActive && !isDown) {
                slider.scrollLeft += autoScrollSpeed;
                // Reset when half way (since content is duplicated)
                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        }
        autoScroll();

        // Mouse Down (Start Drag)
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            autoScrollActive = false; // Stop auto scroll
        });

        // Mouse Leave (Stop Drag)
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            autoScrollActive = true; // Resume auto scroll
        });

        // Mouse Up (Stop Drag)
        slider.addEventListener('mouseup', () => {
            isDown = false;
            autoScrollActive = true; // Resume auto scroll
        });

        // Mouse Move (Dragging)
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // Stop text selection
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Drag speed
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch Support for Mobile
        slider.addEventListener('touchstart', () => {
            isDown = true;
            autoScrollActive = false;
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
            autoScrollActive = true;
        });

        slider.addEventListener('touchmove', (e) => {
            // Touch move handled by browser naturally, but we stop auto scroll
            autoScrollActive = false;
        });




        document.querySelectorAll('#navMenu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
