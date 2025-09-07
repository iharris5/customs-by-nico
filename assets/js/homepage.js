console.log('calling homepage');

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('shoe-container');

    const images = [
	    { image_url: 'assets/views/main/images/IMG_1421.jpeg' },
	    { image_url: 'assets/views/main/images/IMG_2355.jpeg', category: 'anime-cartoons' },
    	    { image_url: 'assets/views/main/images/IMG_3409.jpeg' },
            { image_url: 'assets/views/main/images/IMG_3553.jpeg' },
	    { image_url: 'assets/views/main/images/IMG_3575.jpeg', category: 'anime-cartoons' },
	    { image_url: 'assets/views/main/images/IMG_3951.jpeg' },
            { image_url: 'assets/views/main/images/IMG_5545.jpeg', category: 'anime-cartoons' },
            { image_url: 'assets/views/main/images/IMG_6056.jpeg', category: 'colorways'},
            { image_url: 'assets/views/main/images/IMG_6161.jpeg' },
            { image_url: 'assets/views/main/images/IMG_9383.jpeg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_9082_Original.JPEG', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_8968.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_1490.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_2647.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_2698.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_8451.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_7310.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_1482.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_1626.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_1566.jpeg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_1567.jpeg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_8454.jpg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/GreyAndWhite.jpeg', category: 'colorways'},
	    { image_url: 'assets/views/main/images/IMG_7641.jpg', category: 'schools-sports'},
	    { image_url: 'assets/views/main/images/IMG_8101.jpg', category: 'schools-sports'},
	    { image_url: 'assets/views/main/images/IMG_1985.jpg', category: 'schools-sports'},
	    { image_url: 'assets/views/main/images/IMG_9464.jpg', category: 'schools-sports'},
	    { image_url: 'assets/views/main/images/IMG_8114.jpg', category: 'schools-sports'},
	    { image_url: 'assets/views/main/images/IMG_5067_Original.JPEG', category: 'schools-sports'}
    ];

    displayImages();
    setupCategoryFiltering();
    setupSidebarToggle();

    function displayImages(filter = 'all') {
	    container.innerHTML = '';

            images.forEach(img => {
                if (filter === 'all' || img.category === filter) {
			const div = document.createElement('div');
                	div.className = 'shoe-pic';
                	const image = document.createElement('img');
                	image.src = img.image_url;
                	image.alt = 'NicoShoe';
                	div.appendChild(image);
                	container.appendChild(div);
	    	}
	    
            });

            setupLightbox();
    }

    function setupCategoryFiltering() {
        const categories = document.querySelectorAll('[data-category]');
        categories.forEach(cat => {
            cat.addEventListener('click', () => {
                const selected = cat.getAttribute('data-category');
                displayImages(selected);
                closeSidebar(); // close sidebar after selecting
            });
        });
    }

    function setupLightbox() {
        document.querySelectorAll('.shoe-pic img').forEach(img => {
            img.addEventListener('click', () => {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = lightbox.querySelector('.lightbox-img');
                lightboxImg.src = img.src;
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
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });
        }
    }

    function setupSidebarToggle() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const closeBtn = document.getElementById('close-btn');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
        });

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
	
	const themesToggle = document.getElementById('themes-toggle');
	themesToggle.addEventListener('click', (e) => {
  		e.stopPropagation(); // To stop it from closing sidebar if needed
  		themesToggle.classList.toggle('open');
	});

        // To close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    function closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
    }
});
