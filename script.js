const navHTML = `
    <div class="nav-container">
        <a href="index.html" class="logo">
            <img src="images/logofirst.webp" alt="Logo" style="height: 45px; width: 45px; border-radius: 50%; object-fit: cover; margin-right: 1rem; border: 2px solid var(--brand-color);">
            <strong>Karpagam Memories</strong>
        </a>
        <div class="nav-right">
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-links" id="nav-links">
                <li><a href="index.html">Dashboard</a></li>
                <li><a href="departments.html">Departments</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="saved.html">My Vault</a></li>
                <li id="auth-link"><a href="login.html" class="btn">Sign In</a></li>
            </ul>
        </div>
    </div>`;

const footerHTML = `
    <div class="footer-container">
        <div class="footer-brand" style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <img src="images/logofirst.webp" alt="Logo" style="height: 35px; width: 35px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--brand-color);">
            <h4 style="margin: 0;">Karpagam Memories</h4>
        </div>
        <div class="footer-nav">
            <a href="index.html">Dashboard</a>
            <a href="departments.html">Departments</a>
            <a href="events.html">Events</a>
            <a href="apply.html">Apply</a>
        </div>
        <p class="copyright">© 2026 Karpagam Memories</p>
    </div>`;

document.addEventListener('DOMContentLoaded', () => {
    const navElement = document.getElementById('main-nav');
    const footerElement = document.getElementById('main-footer');
    
    if (navElement) {
        navElement.innerHTML = navHTML;
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });

            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }
    
    if (footerElement) footerElement.innerHTML = footerHTML;

    const themeHTML = `
        <button class="theme-switch-float" id="theme-switch" aria-label="Toggle theme">
            <span class="theme-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </span>
        </button>`;
    
    const modalHTML = `
        <div class="modal-overlay" id="video-modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <div class="video-wrapper" id="modal-video-container"></div>
                <div class="modal-body">
                    <h2 id="modal-title"></h2>
                    <p id="modal-meta" style="color: var(--text-secondary); margin-bottom: 1rem;"></p>
                    <div class="modal-actions">
                        <button class="btn btn-outline" onclick="saveFromModal()">Save to Vault</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', themeHTML);
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const themeSwitch = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeSwitch) {
        const setIcon = (theme) => {
            const iconWrap = themeSwitch.querySelector('.theme-icon');
            if (theme === 'dark') {
                iconWrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
            } else {
                iconWrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
            }
        };
        setIcon(savedTheme);
        themeSwitch.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
            setIcon(target);
        });
    }

    const searchInput = document.getElementById('video-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('#video-grid article');
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = title.includes(query) ? 'block' : 'none';
            });
        });
    }

    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const authLink = document.getElementById('auth-link');
    if (isLoggedIn && authLink) {
        authLink.innerHTML = `<button class="btn" onclick="logout()">Sign Out</button>`;
    }

    const slider = document.getElementById('hero-slider');
    if (slider) {
        let idx = 0;
        const totalSlides = slider.children.length;
        setInterval(() => {
            idx = (idx + 1) % totalSlides;
            slider.style.transform = `translateX(-${idx * 100}%)`;
        }, 4000);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

let activeVideoData = null;

function playVideo(title, meta, file) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('modal-video-container');
    activeVideoData = { title, meta, fileName: file };
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-meta').textContent = meta;

    if (isLoggedIn) {
        container.innerHTML = `<video width="100%" height="100%" controls autoplay><source src="video/${file}" type="video/mp4"></video>`;
    } else {
        container.innerHTML = `<div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;"><h3>Login Required</h3><a href="login.html" class="btn" style="margin-top: 1rem;">Sign In to Watch</a></div>`;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-video-container').innerHTML = '';
    document.getElementById('video-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function saveFromModal() {
    if (!activeVideoData) return;
    let saved = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    if (saved.find(v => v.title === activeVideoData.title)) {
        alert("Already in your vault!");
        return;
    }
    saved.push(activeVideoData);
    localStorage.setItem('savedVideos', JSON.stringify(saved));
    alert("Saved to My Vault!");
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    });
}