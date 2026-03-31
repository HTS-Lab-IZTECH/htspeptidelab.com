/* =========================================================================
   HTS LAB - MAIN JAVASCRIPT LOGIC
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const cacheBuster = `v=${Date.now()}`;
    // Allow subpages in subdirectories to set a base path for components
    const base = window.SITE_BASE || '';
    
    // 1. Load Header Component dynamically
    fetch(`${base}components/header.html?${cacheBuster}`, { cache: 'no-store' })
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // If we're in a subdirectory, fix relative paths in header links and images
            if (base) {
                const header = document.getElementById('header-placeholder');
                // Fix all anchor hrefs that are not absolute (http/https/mailto/#)
                header.querySelectorAll('a[href]').forEach(a => {
                    const href = a.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto')) {
                        a.setAttribute('href', base + href);
                    }
                });
                // Fix all img src that are not absolute
                header.querySelectorAll('img[src]').forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                        img.setAttribute('src', base + src);
                    }
                });
            }
            
            // Re-initialize any JS reliant on header like active links or mobile menu toggle
            setActiveLink();
            initMobileMenu();
        })
        .catch(error => console.error('Error loading header:', error));

    // 2. Load Footer Component dynamically
    fetch(`${base}components/footer.html?${cacheBuster}`, { cache: 'no-store' })
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // 3. Initialize Intersection Observer for Scroll Animations (fade-up effects)
    initScrollAnimations();

    // 4. Initialize Gallery Lightbox if present
    initLightbox();

    // 5. Initialize Person Modal if present
    initPersonModal();

    // 6. Initialize Project Modal if present
    initProjectModal();
});



/* Helper Functions */

// Highlights the current navigation link based on the page URL
function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
            // If it's a dropdown item, also highlight the parent dropdown toggle
            const dropdown = link.closest('.dropdown');
            if (dropdown) {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.classList.add('active');
            }
        } else {
            // Only remove if it's not a dropdown toggle that needs to stay active
            if (!link.classList.contains('dropdown-toggle')) {
                link.classList.remove('active');
            }
        }
    });

    // Ensure dropdown toggles that don't have active children lose the active class
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const hasActiveChild = dropdown.querySelector('.dropdown-menu a.active');
        if (toggle && !hasActiveChild) {
            toggle.classList.remove('active');
        }
    });
}

// Mobile Menu Toggle functionality
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const isExpanded = navLinks.classList.contains('show');
            mobileBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Dropdown toggle for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

// Scroll Animations to reveal elements smoothly as the user scrolls
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));
}

// Lightbox Gallery Functionality
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    // Create Lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
        <div class="lightbox-content">
            <img id="lightbox-img" src="" alt="">
            <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>
        <button class="lightbox-next" aria-label="Next image">&#10095;</button>
    `;
    document.body.appendChild(lightbox);

    const imgEl = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    const items = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        const captionText = item.querySelector('.gallery-caption p') ? item.querySelector('.gallery-caption p').innerText : '';
        const titleText = item.querySelector('.gallery-caption strong') ? item.querySelector('.gallery-caption strong').innerText : '';
        return {
            src: img.src,
            alt: img.alt,
            caption: `<strong>${titleText}</strong><br>${captionText}`
        };
    });

    function openLightbox(index) {
        if (index < 0 || index >= items.length) return;
        currentIndex = index;
        imgEl.src = items[currentIndex].src;
        imgEl.alt = items[currentIndex].alt;
        captionEl.innerHTML = items[currentIndex].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

// Person Modal Functionality
function initPersonModal() {
    const modal = document.getElementById('person-modal');
    if (!modal) return;
    
    const closeBtn = document.getElementById('person-modal-close');
    const cards = document.querySelectorAll('.person-card');
    
    // Elements to populate
    const map = {
        photo: document.getElementById('modal-photo'),
        name: document.getElementById('modal-name'),
        jobTitle: document.getElementById('modal-job-title'),
        email: document.getElementById('modal-email'),
        emailText: document.getElementById('modal-email-text'),
        socials: document.getElementById('modal-socials'),
        affiliations: document.getElementById('modal-affiliations'),
        bio: document.getElementById('modal-bio'),
        educationContainer: document.getElementById('modal-education-container'),
        education: document.getElementById('modal-education'),
        researchContainer: document.getElementById('modal-research-container'),
        research: document.getElementById('modal-research')
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Basic Info extraction
            const imgEl = card.querySelector('img');
            const nameEl = card.querySelector('h2, h4');
            const jobTitleEl = card.querySelector('.person-role') || card.querySelector('p.text-muted');
            const emailEl = card.querySelector('a[href^="mailto:"]');
            
            // Extract socials: 'a' tags that aren't mailto, inside a flex container 
            const flexDivs = card.querySelectorAll('div[style*="display: flex"]');
            let socialLinks = '';
            flexDivs.forEach(div => {
                const nonMailtoA = Array.from(div.querySelectorAll('a:not([href^="mailto:"])'));
                nonMailtoA.forEach(a => {
                    socialLinks += a.outerHTML;
                });
            });
            
            // Hidden Data extraction
            const hiddenData = card.querySelector('.person-details-hidden');
            
            // Populate Modal
            if (imgEl) map.photo.src = imgEl.src;
            if (nameEl) map.name.innerText = nameEl.innerText;
            if (jobTitleEl) map.jobTitle.innerText = jobTitleEl.innerText;
            
            if (emailEl) {
                map.email.style.display = 'inline-flex';
                map.email.href = emailEl.href;
                map.emailText.innerText = emailEl.innerText === 'Email' ? emailEl.href.replace('mailto:', '') : emailEl.innerText;
            } else {
                map.email.style.display = 'none';
            }
            
            map.socials.innerHTML = socialLinks;
            
            // Reset modal data areas
            map.affiliations.innerHTML = '';
            map.bio.innerHTML = '<p>Detailed biography currently unavailable.</p>';
            map.educationContainer.style.display = 'none';
            map.researchContainer.style.display = 'none';
            
            if (hiddenData) {
                const bioData = hiddenData.querySelector('.person-bio');
                const eduData = hiddenData.querySelector('.person-education');
                const researchData = hiddenData.querySelector('.person-research');
                const affilData = hiddenData.querySelector('.person-affiliations');
                
                if (bioData) map.bio.innerHTML = bioData.innerHTML;
                
                if (eduData && eduData.innerHTML.trim() !== '') {
                    map.educationContainer.style.display = 'block';
                    map.education.innerHTML = eduData.innerHTML;
                }
                
                if (researchData && researchData.innerHTML.trim() !== '') {
                    map.researchContainer.style.display = 'block';
                    map.research.innerHTML = researchData.innerHTML;
                }
                
                if (affilData) {
                    map.affiliations.innerHTML = affilData.innerHTML;
                }
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close logic
    function close() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('person-modal-overlay')) {
             close();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
}

// Project Modal Functionality
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    const closeBtn = document.getElementById('project-modal-close');
    const btns = document.querySelectorAll('.project-details-btn');
    
    // Elements to populate
    const map = {
        photo: document.getElementById('project-modal-photo'),
        title: document.getElementById('project-modal-title'),
        desc: document.getElementById('project-modal-desc'),
        subjects: document.getElementById('project-modal-subjects'),
        keywordsContainer: document.getElementById('project-modal-keywords-container'),
        keywords: document.getElementById('project-modal-keywords')
    };

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.project-card');
            if (!card) return;
            
            // Basic Info extraction
            const titleEl = card.querySelector('.project-card-title');
            
            // Hidden Data extraction
            const hiddenData = card.querySelector('.project-details-hidden');
            
            // Populate Modal
            if (titleEl) map.title.innerText = titleEl.innerText;
            
            // Reset modal data areas
            map.photo.src = '';
            map.desc.innerHTML = '<p>Detailed description currently unavailable.</p>';
            map.subjects.innerHTML = '';
            map.keywordsContainer.style.display = 'none';
            
            if (hiddenData) {
                const imgData = hiddenData.querySelector('.project-hidden-img');
                const descData = hiddenData.querySelector('.project-full-desc');
                const keywordsData = hiddenData.querySelector('.project-keywords');
                const subjectsData = hiddenData.querySelector('.project-subjects');
                
                if (imgData) map.photo.src = imgData.src;
                if (descData) map.desc.innerHTML = descData.innerHTML;
                if (subjectsData) map.subjects.innerHTML = subjectsData.innerHTML;
                
                if (keywordsData && keywordsData.innerHTML.trim() !== '') {
                    map.keywordsContainer.style.display = 'block';
                    map.keywords.innerHTML = keywordsData.innerHTML;
                }
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close logic
    function close() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('project-modal-overlay')) {
             close();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
}
