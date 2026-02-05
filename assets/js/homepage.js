console.log('calling homepage');

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('shoe-container');
    const reviewsSection = document.getElementById('reviews-section');
    const introSection = document.getElementById('intro-section');

    // ----- Helper to show images and hide intro -----
    function showImages(category, tag = null) {
        if (!container) return;
        if (introSection) introSection.style.display = 'none';   // hide intro
	if (reviewsSection) reviewsSection.style.display = 'none';

        container.style.display = 'grid';                        // show container
        displayImages(category, tag);                             // populate images
        console.log(`Displaying images for category "${category}"${tag ? ' with tag "' + tag + '"' : ''}`);
    }

    // ----- Show intro again (home button) -----
    function showIntro() {
        if (introSection) introSection.style.display = 'block';
	if (reviewsSection) reviewsSection.style.display = 'block';
        if (container) container.style.display = 'none';
        console.log('Showing intro section');
    }

    // ----- Home button -----
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showIntro();
        });
    }

    // Make all Home buttons behave like the logo
    const navHome = document.getElementById('nav-home');
    if (navHome && homeBtn) {
        navHome.addEventListener('click', () => {
            homeBtn.click();
        });
    }

    document.querySelectorAll('[data-category="home"]').forEach(item => {
        item.addEventListener('click', () => {
            homeBtn.click();
        });
    });


    // ----- Category buttons (sidebar or nav) -----
    document.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            showImages(category);
        });
    });

    // ----- Anime filter buttons -----
    const animeTags = document.querySelectorAll('.anime-tag');
    animeTags.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.getAttribute('data-tag');
            showImages('anime-cartoons', tag);
        });
    });

    // ----- All images -----
    const images = [
        { image_url: 'assets/views/main/images/IMG_1421.jpeg', category: 'most-popular' },
        { image_url: 'assets/views/main/images/IMG_2355.jpeg', category: 'anime-cartoons', tags: ['jojo'] },
        { image_url: 'assets/views/main/images/IMG_3409.jpeg', category: 'baby-shoes' },
        { image_url: 'assets/views/main/images/IMG_3553.jpeg', category: 'floral' },
        { image_url: 'assets/views/main/images/IMG_3575.jpeg', category: 'custom-text' },
        { image_url: 'assets/views/main/images/IMG_3951.jpeg', category: 'baby-shoes' },
        { image_url: 'assets/views/main/images/IMG_5545.jpeg', category: 'anime-cartoons', tags: ['one-piece'] },
        { image_url: 'assets/views/main/images/IMG_6056.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_9383.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_8558.jpg', category: 'anime-cartoons', tags: ['blue-exorcist'] },
        { image_url: 'assets/views/main/images/IMG_9082_Original.JPEG', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_6161.JPG', category: 'floral' },
        { image_url: 'assets/views/main/images/IMG_8968.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_3082_Original.JPEG', category: 'anime-cartoons', tags: ['jojo'] },
        { image_url: 'assets/views/main/images/IMG_1490.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_6077_Original.JPEG', category: 'anime-cartoons', tags: ['jojo'] },
        { image_url: 'assets/views/main/images/IMG_2647.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_7846.jpg', category: 'cleats' },
        { image_url: 'assets/views/main/images/IMG_2698.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_5932_Original.JPEG', category: 'anime-cartoons', tags: ['demon-slayer'] },
        { image_url: 'assets/views/main/images/IMG_8451.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_8059.jpg', category: 'anime-cartoons', tags: ['one-piece'] },
        { image_url: 'assets/views/main/images/IMG_7310.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_4295.jpg', category: 'floral' },
        { image_url: 'assets/views/main/images/IMG_8100.jpg', category: 'anime-cartoons', tags: ['naruto'] },
        { image_url: 'assets/views/main/images/IMG_6770_Original.JPEG', category: 'anime-cartoons', tags: ['jojo'] },
        { image_url: 'assets/views/main/images/IMG_1482.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_1626.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_7920.jpg', category: 'anime-cartoons', tags: ['jojo'] },
        { image_url: 'assets/views/main/images/IMG_1566.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_7970.jpg', category: 'anime-cartoons', tags: ['hunter'] },
        { image_url: 'assets/views/main/images/IMG_2364.jpg', category: 'floral' },
        { image_url: 'assets/views/main/images/IMG_1567.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_5384.jpg', category: 'anime-cartoons', tags: ['one-piece'] },
        { image_url: 'assets/views/main/images/IMG_8454.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/GreyAndWhite.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_9430.jpg', category: 'anime-cartoons', tags: ['jojo'] },
        { image_url: 'assets/views/main/images/IMG_7641.jpg', category: 'schools-sports' },
        { image_url: 'assets/views/main/images/IMG_9446.jpg', category: 'anime-cartoons', tags: ['jojo'] },
        { image_url: 'assets/views/main/images/IMG_8101.jpg', category: 'schools-sports' },
        { image_url: 'assets/views/main/images/IMG_0534.jpg', category: 'floral' },
        { image_url: 'assets/views/main/images/IMG_6477.jpg', category: 'anime-cartoons', tags: ['hunter'] },
        { image_url: 'assets/views/main/images/IMG_6203.JPG', category: 'custom-text' },
        { image_url: 'assets/views/main/images/IMG_1985.jpg', category: 'schools-sports' },
        { image_url: 'assets/views/main/images/IMG_7648.jpg', category: 'cleats' },
        { image_url: 'assets/views/main/images/IMG_9464.jpg', category: 'schools-sports' },
        { image_url: 'assets/views/main/images/IMG_7955.jpg', category: 'anime-cartoons', tags: ['vinland'] },
        { image_url: 'assets/views/main/images/IMG_8114.jpg', category: 'schools-sports' },
        { image_url: 'assets/views/main/images/IMG_1008.jpg', category: 'anime-cartoons', tags: ['fullmetal'] },
        { image_url: 'assets/views/main/images/IMG_5067_Original.JPEG', category: 'schools-sports' },
        { image_url: 'assets/views/main/images/IMG_3288.jpg', category: 'anime-cartoons', tags: ['lilo-stitch'] },
        { image_url: 'assets/views/main/images/IMG_5953_Original.JPEG', category: 'baby-shoes' },
        { image_url: 'assets/views/main/images/IMG_0447.jpg', category: 'cleats' },
        { image_url: 'assets/views/main/images/IMG_7598.jpg', category: 'anime-cartoons', tags: ['hunter'] },
        { image_url: 'assets/views/main/images/IMG_0249.jpg', category: 'baby-shoes' }
    ];

    // ----- Display images -----
    function displayImages(category, tag = null) {
        if (!container) return;
        container.innerHTML = '';

        // filter by category
        let filtered = images.filter(img => img.category === category);

        // filter by tag if present
        if (tag) filtered = filtered.filter(img => img.tags && img.tags.includes(tag));

        if (filtered.length === 0) {
            container.innerHTML = `<p>No images found for "${category}"</p>`;
            return;
        }

        filtered.forEach(img => {
            const div = document.createElement('div');
            div.classList.add('shoe-pic');

            const imageElement = document.createElement('img');
            imageElement.src = img.image_url;
            imageElement.alt = category;

            div.appendChild(imageElement);
            container.appendChild(div);
        });

        setupLightbox();
    }

    // ----- Lightbox -----
    function setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        document.querySelectorAll('.shoe-pic img').forEach(img => {
            img.addEventListener('click', () => {
                lightbox.querySelector('.lightbox-img').src = img.src;
                lightbox.style.display = 'flex';
            });
        });

        const closeBtn = lightbox.querySelector('.close');
        if (closeBtn) closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    // ----- Initial state -----
    if (container) container.style.display = 'none'; // hide images initially
    if (introSection) introSection.style.display = 'block'; // show intro
});

