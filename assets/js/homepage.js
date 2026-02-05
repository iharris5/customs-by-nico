console.log('calling homepage');

document.addEventListener("DOMContentLoaded", function () {
    let hasRenderedShoes = false;

    const container = document.getElementById('shoe-container');
    function showShoes() {
	    document.getElementById('intro-section').style.display = 'none';
	    container.style.display = 'grid';
    }

    function showIntro() {
	    document.getElementById('intro-section').style.display = 'block';
	    container.style.display = 'none';
    }

    const homeBtn = document.getElementById('home-btn');
    if(homeBtn) {
	    homeBtn.addEventListener('click', (e) => {
		    e.preventDefault();
		    showIntro();
	    });
    }

    // More dropdown
    const moreMenuDropdown = document.querySelector('.more-menu .dropdown');
    const movableItems = document.querySelectorAll('[data-section="about"], [data-section="create"], [data-section="most-popular"]');

    movableItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.addEventListener('click', () => {
            const section = clone.getAttribute('data-section');
            if(section === 'most-popular') displayImages('most-popular');
            else if(section === 'create') displayImages('create');
            else if(section === 'about') displayImages('about');
            showShoes();
            closeSidebar();
        });
        moreMenuDropdown.appendChild(clone);
    });

    const navHome = document.getElementById('nav-home');
	if (navHome) {
    	navHome.addEventListener('click', () => {
        	showIntro();
    	});
    }

    const mostPopularBtn = document.querySelector('[data-section="most-popular"]');
    if (mostPopularBtn) {
	    mostPopularBtn.addEventListener('click', () => {
        	showShoes();
        	displayImages('most-popular');
    	    });
    }

    const categoryButtons = document.querySelectorAll('[data-category]');
    categoryButtons.forEach(cat => {
        cat.addEventListener('click', () => {
            const selected = cat.getAttribute('data-category');
            showShoes();
            displayImages(selected);
            closeSidebar();
        });
    });

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

    	setupSidebarToggle();
	
	function displayImages(category) {
                        const container = document.getElementById('image-container');
    if (!container) {
        console.error('No container found for images!');
        return;
    }

    // Clear previous images
    container.innerHTML = '';

    // Filter images by category
    const filtered = images.filter(img => img.category === category);

    if (filtered.length === 0) {
        container.innerHTML = `<p>No images found for "${category}"</p>`;
        console.log(`No images to display for category: ${category}`);
        return;
    }

    // Add images to container
    filtered.forEach(img => {
        const imageElement = document.createElement('img');
        imageElement.src = img.image_url;
        imageElement.alt = category;
        container.appendChild(imageElement);
    });

    console.log(`Displayed ${filtered.length} images for category: ${category}`);
}

    // Lightbox setup
    function setupLightbox() {
	    document.querySelectorAll('.shoe-pic img').forEach(img => {
            img.addEventListener('click', () => {
                const lightbox = document.getElementById('lightbox');
                lightbox.querySelector('.lightbox-img').src = img.src;
                lightbox.style.display = 'flex';
            });
        });

        const closeBtn = document.querySelector('.lightbox .close');
	if (closeBtn) {
        	closeBtn.addEventListener('click', () => {
            		document.getElementById('lightbox').style.display = 'none';
        	});
	}

        const lightbox = document.getElementById('lightbox');
	if (lightbox) {
        	lightbox.addEventListener('click', e => {
            		if (e.target === lightbox) lightbox.style.display = 'none';
        	});
	}
    }

    // Sidebar toggle
    function setupSidebarToggle() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const closeBtn = document.getElementById('close-btn');

        menuToggle.addEventListener('click', () => sidebar.classList.add('open'));
        closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });

        const themesToggle = document.getElementById('themes-toggle');
        themesToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themesToggle.classList.toggle('open');
        });
    }

    function closeSidebar() {
        document.getElementById('sidebar').classList.remove('open');
    }

    // Anime tags toggle
    const animeToggleBtn = document.getElementById('show-anime-tags');
    if (animeToggleBtn) {
        animeToggleBtn.addEventListener('click', () => {
            document.getElementById('anime-tags').classList.toggle('show');
        });
    }

    document.querySelectorAll('.anime-tag').forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.getAttribute('data-tag');
            showShoes();
            displayImages('anime-cartoons', tag);
        });
    });
});
