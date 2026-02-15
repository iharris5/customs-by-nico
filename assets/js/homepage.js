console.log('calling homepage');

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('shoe-container');
    const reviewsSection = document.getElementById('reviews-section');
    const introSection = document.getElementById('intro-section');
    const createOwn = document.getElementById('create-own');
    const aboutUs = document.getElementById('about-us');
    const globeSection = document.querySelector('.globe-section');

    function updateBanner(category = null) {
        const banner = document.getElementById('banner-switch');
        if (!banner) return;

        if (category === 'anime') {
            banner.src = 'assets/views/main/images/IMG_2888_Original.JPG';
        } else {
            banner.src = 'assets/views/main/images/CustomsByNico.png';
        }
    }
    
    function updateBannerTitle(text = '') {
	    const title = document.getElementById('banner-title');
	    const overlay = document.querySelector('.banner-overlay');

	    if (!title || !overlay) return;

	    title.textContent = text;

	    if (text.trim() === '') {
        	overlay.style.opacity = '0';
    	    } else {
        	overlay.style.opacity = '1';
    	    }
    }

    // ----- Helper to show images and hide intro -----
    function showImages(category, tag = null) {
        updateBanner(category);

	if (category === 'anime') {
    	    updateBannerTitle('Anime');
	} else if (category === 'cartoons') {
            updateBannerTitle('Cartoons');
	} else if (category === 'floral') {
  	    updateBannerTitle('Floral');
	} else if (category === 'most-popular') {
            updateBannerTitle('Most Popular');
    	} else if (category === 'colorways') {
    	    updateBannerTitle('Colorways');
    	} else if (category === 'schools-sports') {
	    updateBannerTitle('Schools, Sports, & Teams');
        } else if (category === 'custom-text') {
	    updateBannerTitle('Events'); 
        } else if (category === 'baby-shoes') {
	    updateBannerTitle('Baby Shoes');
        } else if (category === 'cleats') {
	    updateBannerTitle('Cleats');
	}

	if (!container) return;
        if (introSection) introSection.style.display = 'none';   // hide intro
	if (reviewsSection) reviewsSection.style.display = 'none';
	if (createOwn) createOwn.style.display = 'none';
        if (aboutUs) aboutUs.style.display = 'none';
	if (globeSection) globeSection.style.display = 'none';

	container.style.display = 'grid';                        // show container
        displayImages(category, tag);                             // populate images
        console.log(`Displaying images for category "${category}"${tag ? ' with tag "' + tag + '"' : ''}`);
    }

    // ----- Show intro again (home button) -----
    function showIntro() {
	updateBanner();
	updateBannerTitle('');

        if (introSection) introSection.style.display = 'block';
	if (reviewsSection) reviewsSection.style.display = 'block';
	if (globeSection) globeSection.style.display = 'block';
        if (container) container.style.display = 'none';
	if (createOwn) createOwn.style.display = 'none';
	if (aboutUs) aboutUs.style.display = 'none';

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

    // Generic section toggle
function showSection(section) {
    updateBanner();
    if (section === 'create') {
	    updateBannerTitle('Create Your Own');
    } else if (section === 'about') {
	    updateBannerTitle('About');
    }

    if (introSection) introSection.style.display = 'none';
    if (reviewsSection) reviewsSection.style.display = 'none';
    if (globeSection) globeSection.style.display = 'none';
    if (container) container.style.display = 'none';
    if (createOwn) createOwn.style.display = 'none';
    if (aboutUs) aboutUs.style.display = 'none';

    if (section === 'create' && createOwn) {
        createOwn.style.display = 'flex';
    } else if (section === 'about' && aboutUs) {
        aboutUs.style.display = 'block';
    }
}

// Attach click listeners to all section buttons
document.querySelectorAll('.section-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const section = btn.dataset.section; // "create-own" or "about-us"
        showSection(section);

        // Close sidebar if open
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });
});

    // Make all Home buttons behave like the logo
    const navHome = document.getElementById('nav-home');
    if (navHome && homeBtn) {
        navHome.addEventListener('click', () => {
            homeBtn.click();
        });
    }

    const navHome2 = document.getElementById('sidebar-home');
    if (navHome2 && homeBtn) {
        navHome2.addEventListener('click', () => {
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
    
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menu-toggle');

        // If sidebar is open AND click is outside sidebar and hamburger
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            menuToggle.classList.remove('open'); // for X animation later
        }
    });

    // ----- All images -----
    const images = [
        { image_url: 'assets/views/main/images/IMG_1421.jpeg', category: 'most-popular', tags: ['popular'] },
	{ image_url: 'assets/views/main/images/IMG_2364.jpg', category: 'floral', character: 'Blue Blossoms' },
	{ image_url: 'assets/views/main/images/IMG_4295.jpg', category: 'floral', character: 'Lilac Blossoms' },
        { image_url: 'assets/views/main/images/IMG_3553.jpeg', category: 'floral', character: 'Pink Blossoms' },
	{ image_url: 'assets/views/main/images/IMG_0534.jpg', category: 'floral', character: 'Gold & Emerald Bling Blossoms' },
	{ image_url: 'assets/views/main/images/IMG_8732.jpg', category: 'floral', character: 'Beauty & The Beast' },
	{ image_url: 'assets/views/main/images/IMG_6161.JPG', category: 'floral' },   
	{ image_url: 'assets/views/main/images/IMG_8731.JPG', category: 'floral', character: 'Blue 3M Reflective Butterflies' },
	{ image_url: 'assets/views/main/images/IMG_8730.JPG', category: 'floral', character: 'Lilac 3M Reflective Butterflies' },
	{ image_url: 'assets/views/main/images/IMG_8733.JPG', category: 'floral', character: '3M Reflective Butterflies' },
        { image_url: 'assets/views/main/images/IMG_5545.jpeg', category: 'anime', tags: ['one-piece'], title: 'One Piece', character: 'Monkey D. Luffy & Roronoa Zoro (Full Color)' },
        { image_url: 'assets/views/main/images/IMG_6056.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_9383.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_7955.jpg', category: 'anime', tags: ['vinland'], title: 'Other', character: 'Vinland Saga: Thorfinn' },
	{ image_url: 'assets/views/main/images/IMG_8558.jpg', category: 'anime', tags: ['blue-exorcist'], title: 'Other', character: 'Blue Exorcist: Rin' },
	{ image_url: 'assets/views/main/images/IMG_5932_Original.JPEG', category: 'anime', tags: ['demon-slayer'], title: 'Other', character: 'Demon Slayer: Nezuko' },
	{ image_url: 'assets/views/main/images/IMG_1008.jpg', category: 'anime', tags: ['fullmetal'], title: 'Other', character: 'Fullmetal Alchemist: Brotherhood' },
 	{ image_url: 'assets/views/main/images/IMG_6995.JPG', category: 'anime', tags: ['bungo'], title: 'Other', character: 'Bungo Stray Dogs' },
	{ image_url: 'assets/views/main/images/IMG_6943.JPG', category: 'anime', tags: ['bungo'], title: 'Other', character: 'Bungo Stray Dogs' },
	{ image_url: 'assets/views/main/images/IMG_3424.JPG', category: 'anime', tags: ['death-note'], title: 'Other', character: 'Death Note: Misa Amane' },
	{ image_url: 'assets/views/main/images/IMG_3588_Original.JPG', category: 'anime', tags: ['akame'], title: 'Other', character: 'Akame ga Kill!' },
        { image_url: 'assets/views/main/images/IMG_9082_Original.JPEG', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_8968.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_3082_Original.JPEG', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Joseph Joestar' },
	{ image_url: 'assets/views/main/images/IMG_6770_Original.JPEG', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Leone Abbacchio' },
	{ image_url: 'assets/views/main/images/IMG_2355.jpeg', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Bruno Bucciarati' },
	{ image_url: 'assets/views/main/images/IMG_6077_Original.JPEG', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Noriaki Kakyoin' },
	{ image_url: 'assets/views/main/images/IMG_9446.jpg', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Dio Brando & The World' },
	{ image_url: 'assets/views/main/images/IMG_9430.jpg', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Jotaro Kujo & Star Platinum' },
	{ image_url: 'assets/views/main/images/IMG_7920.jpg', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Joseph Joestar & Caesar Zeppeli' },
	{ image_url: 'assets/views/main/images/IMG_6538_Original.JPG', category: 'anime', tags: ['jojo'], title: "JoJo's Bizarre Adventure", character: 'Jotaro Kujo' },
        { image_url: 'assets/views/main/images/IMG_1490.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_2647.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_2698.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_8451.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_8059.jpg', category: 'anime', tags: ['one-piece'], title: 'One Piece', character: 'Donquixote Rosinante (Corazon)' },
        { image_url: 'assets/views/main/images/IMG_7310.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_8100.jpg', category: 'anime', tags: ['naruto'], title: 'Naruto', character: 'Naruto & Sasuke' },
	{ image_url: 'assets/views/main/images/IMG_3569.JPG', category: 'anime', tags: ['naruto'], title: 'Naruto', character: 'Akatsuki Clouds (White AF1)' },
	{ image_url: 'assets/views/main/images/IMG_1218.JPG', category: 'anime', tags: ['naruto'], title: 'Naruto', character: 'Akatsuki Clouds: Pain' },
	{ image_url: 'assets/views/main/images/IMG_5349.JPG', category: 'anime', tags: ['naruto'], title: 'Naruto', character: 'Akatsuki Clouds (Black AF1)' },
        { image_url: 'assets/views/main/images/IMG_1482.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_1626.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_1566.jpeg', category: 'colorways' },
	{ image_url: 'assets/views/main/images/IMG_7598.jpg', category: 'anime', tags: ['hunter'], title: 'Hunter X Hunter', character: 'Hisoka' },
	{ image_url: 'assets/views/main/images/IMG_6266_Original.JPG', category: 'anime', tags: ['hunter'], title: 'Hunter X Hunter', character: 'Chrollo Lucilfer (Purple)' },
	{ image_url: 'assets/views/main/images/IMG_3268.JPG', category: 'anime', tags: ['hunter'], title: 'Hunter X Hunter', character: 'Chrollo Lucilfer (Black)' },
	{ image_url: 'assets/views/main/images/IMG_6472_Original.JPG', category: 'anime', tags: ['hunter'], title: 'Hunter X Hunter', character: 'Killua Zoldyck' },
	{ image_url: 'assets/views/main/images/IMG_4651.JPG', category: 'anime', tags: ['hunter'], title: 'Hunter X Hunter', character: 'Kurapika' },
        { image_url: 'assets/views/main/images/IMG_7970.jpg', category: 'anime', tags: ['hunter'], title: 'Hunter X Hunter', character: 'Meruem' },
        { image_url: 'assets/views/main/images/IMG_1567.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_5384.jpg', category: 'anime', tags: ['one-piece'], title: 'One Piece', character: 'Monkey D. Luffy & Roronoa Zoro' },
        { image_url: 'assets/views/main/images/IMG_8454.jpg', category: 'colorways' },
        { image_url: 'assets/views/main/images/GreyAndWhite.jpeg', category: 'colorways' },
        { image_url: 'assets/views/main/images/IMG_6477.jpg', category: 'anime', tags: ['hunter'], title: 'Hunter X Hunter', character: 'Illumi Zoldyck' },
//        { image_url: 'assets/views/main/images/IMG_6203.JPG', category: 'custom-text' },
        { image_url: 'assets/views/main/images/IMG_9464.jpg', category: 'schools-sports', title: 'Schools', character: 'Texas State' },
	{ image_url: 'assets/views/main/images/IMG_5067_Original.JPEG', category: 'schools-sports', title: 'Schools', character: 'North Carolina A&T' },
	{ image_url: 'assets/views/main/images/IMG_7641.jpg', category: 'schools-sports', title: 'Football', character: 'Bengals Stripes' },
	{ image_url: 'assets/views/main/images/IMG_8735.jpg', category: 'schools-sports', title: 'Football', character: 'Bengals' },
	{ image_url: 'assets/views/main/images/IMG_8736.jpg', category: 'schools-sports', title: 'Hockey', character: 'Hat Tricks Elite' },
	{ image_url: 'assets/views/main/images/IMG_1985.jpg', category: 'schools-sports', title: 'Hockey', character: 'Pawlings' },
	{ image_url: 'assets/views/main/images/IMG_8101.jpg', category: 'schools-sports', title: 'Baseball', character: 'Yankees' },
        { image_url: 'assets/views/main/images/IMG_8114.jpg', category: 'schools-sports', title: 'Baseball', character: 'Crushers' },
	{ image_url: 'assets/views/main/images/IMG_8738.jpg', category: 'schools-sports', title: 'Soccer', character: 'Chivas Locas' },
	{ image_url: 'assets/views/main/images/IMG_8734.jpg', category: 'schools-sports', title: 'Soccer', character: 'Club de Guadalajara' },
        { image_url: 'assets/views/main/images/IMG_8725.JPG', category: 'cartoons', tags: ['snoopy'], title: 'Snoopy', character: 'Snoopy, Joe Cool, & Woodstock' },
	{ image_url: 'assets/views/main/images/IMG_8724.JPG', category: 'cartoons', tags: ['snoopy'], title: 'Snoopy', character: 'DJ Snoopy' },
	{ image_url: 'assets/views/main/images/IMG_8729.jpg', category: 'cartoons', tags: ['snoopy'], title: 'Snoopy', character: 'Ninja 400 & Gromm Snoopy' },
	{ image_url: 'assets/views/main/images/IMG_8726.JPG', category: 'cartoons', tags: ['snoopy'], title: 'Snoopy' },
	{ image_url: 'assets/views/main/images/IMG_8728.jpg', category: 'cartoons', tags: ['snoopy'], title: 'Snoopy', character: 'Dancing Snoopy' },
	{ image_url: 'assets/views/main/images/IMG_3288.jpg', category: 'cartoons', tags: ['disney'], title: 'Disney', character: 'Lilo & Stitch' },
	{ image_url: 'assets/views/main/images/IMG_3312.JPG', category: 'cartoons', tags: ['disney'], title: 'Disney', character: 'Lilo & Stitch: Gule Leaves' },
	{ image_url: 'assets/views/main/images/IMG_9571.JPG', category: 'cartoons', tags: ['dc'], title: 'DC', character: 'Batman: The Animated Series: Harley Quinn & The Joker' },
	{ image_url: 'assets/views/main/images/IMG_3192_Original.JPG', category: 'cartoons', tags: ['sanrio'], title: 'Sanrio', character: 'My Melody & Kuromi' },
	{ image_url: 'assets/views/main/images/IMG_8722.jpeg', category: 'anime', tags: ['jujutsu'], title: 'Jujutsu Kaisen', character: 'Satoru Gojo (Gold)' },
	{ image_url: 'assets/views/main/images/IMG_8723.jpeg', category: 'anime', tags: ['jujutsu'], title: 'Jujutsu Kaisen', character: 'Ryomen Sukuna' },
	{ image_url: 'assets/views/main/images/IMG_8721.jpeg', category: 'anime', tags: ['jujutsu'], title: 'Jujutsu Kaisen', character: 'Satoru Gojo (Red)' },
	{ image_url: 'assets/views/main/images/IMG_8720.jpeg', category: 'anime', tags: ['jujutsu'], title: 'Jujutsu Kaisen', character: 'Satoru Gojo & Suguru Geto Betta Fish' },
	{ image_url: 'assets/views/main/images/IMG_8741.jpeg', category: 'custom-text', title: 'Special Occasions', character: 'Wedding: Emerald Mr.' },
	{ image_url: 'assets/views/main/images/IMG_8740.jpeg', category: 'custom-text', title: 'Special Occasions', character: 'Wedding: Pearl Mrs.' },
	{ image_url: 'assets/views/main/images/IMG_8739.jpg', category: 'custom-text', title: 'Special Occasions', character: 'Custom Message\n"4lifers"' },
	//        { image_url: 'assets/views/main/images/IMG_6203.JPG', category: 'custom-text' },
	{ image_url: 'assets/views/main/images/IMG_0249.jpg', category: 'baby-shoes', character: '"Luna"' },
	{ image_url: 'assets/views/main/images/IMG_3409.jpeg', category: 'baby-shoes', character: 'Honey Bear' },
	{ image_url: 'assets/views/main/images/IMG_5953_Original.JPEG', category: 'baby-shoes', character: 'Canticos: 1st Birthday' },
	{ image_url: 'assets/views/main/images/IMG_8745.JPG', category: 'baby-shoes', character: 'Pink Split Swoosh' },
	{ image_url: 'assets/views/main/images/IMG_8744.jpg', category: 'baby-shoes', character: 'Red Split Swoosh' },
	{ image_url: 'assets/views/main/images/IMG_3951.jpeg', category: 'baby-shoes', character: 'Sesame Street:\nElmo & Cookie Monster' },
	{ image_url: 'assets/views/main/images/IMG_7846.jpg', category: 'cleats', title: 'Cleats' },
	{ image_url: 'assets/views/main/images/IMG_7648.jpg', category: 'cleats', title: 'Cleats' },
	{ image_url: 'assets/views/main/images/IMG_0447.jpg', category: 'cleats', title: 'Cleats' }
    ];

    // ----- Display images -----
    function displayImages(category, tag = null) {
    if (!container) return;
    container.innerHTML = '';

    // ----- Filter images by category -----
    let filtered = images.filter(img => img.category === category);

    // ----- Filter by tag if present -----
    if (tag) filtered = filtered.filter(img => img.tags && img.tags.includes(tag));

    if (filtered.length === 0) {
        container.innerHTML = `<p>No images found for "${category}"</p>`;
        return;
    }

    // ----- Group images by title (or first tag or "Other") -----
    const groups = {};
    filtered.forEach(img => {
        let groupKey = img.title || (img.tags && img.tags[0]) || '';
        if (!groups[groupKey]) groups[groupKey] = { title: groupKey, images: [] };
        groups[groupKey].images.push(img);
    });

    // ----- Custom anime order -----
    const animeOrder = [
        'Jujutsu Kaisen',
	'One Piece',
        'Hunter X Hunter',
        "JoJo's Bizarre Adventure",
	'Naruto',
        'Other'
    ];

    // ----- Sort groups according to custom order -----
    const sortedGroups = Object.values(groups).sort((a, b) => {
        const indexA = animeOrder.indexOf(a.title) !== -1 ? animeOrder.indexOf(a.title) : animeOrder.length;
        const indexB = animeOrder.indexOf(b.title) !== -1 ? animeOrder.indexOf(b.title) : animeOrder.length;
        return indexA - indexB;
    });

    // ----- Render each sorted group -----
    sortedGroups.forEach(group => {
        const section = document.createElement('div');
        section.classList.add('shoe-group');

        // Section header
        if (group.title) {
	    const heading = document.createElement('h2');
            heading.textContent = group.title;
            section.appendChild(heading);
	}

        const grid = document.createElement('div');
        grid.classList.add('shoe-grid');

        group.images.forEach(img => {
            const div = document.createElement('div');
            div.classList.add('shoe-pic');

            const imageElement = document.createElement('img');
            imageElement.src = img.image_url;
            imageElement.alt = img.character || '';
            imageElement.classList.add('shoe-pic');

            const caption = document.createElement('div');
            caption.classList.add('shoe-name');
            caption.textContent = img.character || '';

            div.appendChild(imageElement);
            div.appendChild(caption);
            grid.appendChild(div);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });

    setupLightbox(); // keep your lightbox working
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
    if (globeSection) globeSection.style.display = 'block';
    if (createOwn) createOwn.style.display = 'none';
    if (aboutUs) aboutUs.style.display = 'none';

    // ----- Sidebar & Hamburger Menu -----
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');

    // Toggle sidebar open/close
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
	menuToggle.classList.toggle('open');
    });

    // Close sidebar with close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // Close sidebar when a category or section is clicked
    document.querySelectorAll('.sidebar [data-category], .sidebar [data-section]').forEach(item => {
        item.addEventListener('click', (e) => {

	    if (e.target.closest('.js-toggle')) {
		    return;
	    }
            sidebar.classList.remove('open');
	    menuToggle.classList.remove('open');
        });
    });

    // Toggle submenu
    document.addEventListener('click', e => {
      const toggle = e.target.closest('.js-toggle');
      if (!toggle) return;

      e.stopPropagation();

      const parent = toggle.closest('.has-subdropdown');
      if (!parent) return;

      parent.classList.toggle('open');
    });

    // Close HEADER dropdowns when a category is clicked
    document.querySelectorAll('.site-header [data-category]').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.site-header .has-subdropdown.open')
          .forEach(openMenu => openMenu.classList.remove('open'));
      });
    });
    
    // Close sidebar when window is resized above mobile breakpoint
    function handleResize() {
      const sidebar = document.getElementById('sidebar');
      const menuToggle = document.getElementById('menu-toggle');

      // Adjust this to match when your hamburger disappears (Bootstrap md = 768px)
      if (window.innerWidth >= 801 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
	menuToggle.classList.remove('open');
      }
    }

    // ----- Responsive "More" menu -----
function handleHeaderOverflow() {
    const nav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');
    const moreMenu = document.querySelector('.more-menu');
    const moreDropdown = moreMenu.querySelector('.dropdown');

    if (!nav || !navList || !moreMenu) return;

    // Always show More so we can measure correctly
    moreMenu.style.display = 'inline-flex';

    // Move everything back from More
    while (moreDropdown.firstChild) {
        navList.insertBefore(moreDropdown.firstChild, moreMenu);
    }

    const availableWidth = nav.clientWidth;
    let usedWidth = moreMenu.offsetWidth;

    const items = Array.from(navList.children).filter(
        item => !item.classList.contains('more-menu')
    );

    for (let item of items) {
        usedWidth += item.offsetWidth + 25; // match gap

        if (usedWidth > availableWidth) {
            moreDropdown.appendChild(item);
        }
    }

    // Hide More if empty
    moreMenu.style.display =
        moreDropdown.children.length ? 'inline-flex' : 'none';
}

// Run on load and resize
window.addEventListener('resize', handleHeaderOverflow);
window.addEventListener('load', handleHeaderOverflow);

    // Run on resize
    window.addEventListener('resize', handleResize);

    handleResize();

    // ----- 3D Globe -----
const globeContainer = document.getElementById('globeViz');

if (globeContainer) {
    function getGlobeSize() {
        const maxSize = 500; // max desktop size
        const padding = 40; // optional margin around globe
        return Math.min(maxSize, window.innerWidth - padding * 2);
    }

    const globe = Globe()(globeContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
	.backgroundColor('rgba(0,0,0,0)')
        .pointsData([
            { lat: 40.9200, lng: -73.7863, label: "New Rochelle, NY" },
            { lat: 40.8448, lng: -73.8648, label: "Bronx, NY" },
            { lat: 40.9126, lng: -73.8371, label: "Mount Vernon, NY" },
            { lat: 13.5344, lng: 144.8856, label: "Yigo, Guam" },
	    { lat: 39.1845, lng: -77.3125, label: "Boyds, MD" },
	    { lat: 40.9319, lng: -73.8990, label: "Yonkers, NY" },
	    { lat: -37.6372, lng: 145.0935, label: "South Morang, Melbourne, Victoria, Australia" },
	    { lat: 40.6782, lng: -73.9442, label: "Brooklyn, NY" },
	    { lat: 52.5144, lng: 4.9641, label: "Purmerend, Noord-Holland, Netherlands" },
	    { lat: 41.8273, lng: -86.3611, label: "Buchanan, MI" },
	    { lat: 32.7357, lng: -97.1081, label: "Arlington, TX" },
	    { lat: 55.9533, lng: -3.1883, label: "Edinburgh, United Kingdom" },
	    { lat: 32.6401, lng: -117.0842, label: "Chula Vista, CA" },
	    { lat: 34.1685, lng: -118.6058, label: "Woodland Hills, CA" },
	    { lat: 28.1614, lng: -81.6017, label: "Davenport, FL" },
	    { lat: 47.2088, lng: 7.5323, label: "Solothurn, Switzerland" },
	    { lat: 38.6582, lng: -77.2497, label: "Woodbridge, VA" },
	    { lat: 43.0268, lng: -76.1784, label: "Onondaga County, NY" },
	    { lat: 40.9700, lng: -73.7176, label: "Harrison, NY" },
	    { lat: 37.3387, lng: -121.8853, label: "San Jose, CA" },
	    { lat: 42.3212, lng: -85.1797, label: "Battle Creek, MI" },
	    { lat: 42.3555, lng: -71.0565, label: "Boston, MA" },
	    { lat: 40.9170, lng: -72.6620, label: "Riverhead, NY" },
	    { lat: 39.7680, lng: -74.2136, label: "Barnegat, NJ" },
	    { lat: 41.5048, lng: -73.9696, label: "Beacon, NY" },
	    { lat: 33.5387, lng: -112.1860, label: "Glendale, AZ" },
	    { lat: 38.8121, lng: -77.6364, label: "Haymarket, VA" },
	    { lat: 42.9704, lng: -85.6722, label: "Grand Rapids, MI" },
	    { lat: 27.3365, lng: -82.5310, label: "Sarasota, FL" },
	    { lat: 40.0362, lng: -75.5138, label: "Malvern, PA" },
	    { lat: 38.0389, lng: -84.5153, label: "Lexington, KY" },
	    { lat: 42.1525, lng: -83.2663, label: "Brownstown, MI" },
	    { lat: 40.4896, lng: -81.4455, label: "New Philadelphia, OH" },
	    { lat: 40.9382, lng: -73.8321, label: "Bronxville, NY" },
	    { lat: 39.3701, lng: -76.4545, label: "Nottingham, MD" },
	    { lat: 41.5840, lng: -73.8087, label: "Hopewell Junction, NY" },
	    { lat: 34.0549, lng: -118.2426, label: "Los Angeles, California" }
        ])
        .pointLabel('label')
        .pointColor(() => '#87CEEB')
        .pointAltitude(0.05);

	// Responsive sizing
        function resizeGlobe() {
            const size = getGlobeSize();
            globe.width(size).height(size);
        }

        // Initial size
        resizeGlobe();

        // Update size on window resize
        window.addEventListener('resize', resizeGlobe);

	const origin = { lat: 40.9115, lng: -73.7824 }; // New Rochelle, NY

	const destinations = globe.pointsData(); // get all points you just set
    globe.arcsData(
        destinations
            .filter(d => !(d.lat === origin.lat && d.lng === origin.lng)) // skip origin itself
            .map(d => ({
                startLat: origin.lat,
                startLng: origin.lng,
                endLat: d.lat,
                endLng: d.lng,
                color: '#ff6666',
                dashLength: 0.4,
                stroke: 0.5,
                animationDuration: 2000
            }))
    )
    .arcColor('color')
    .arcDashLength('dashLength')
    .arcDashGap(0.5)
    .arcDashAnimateTime('animationDuration');

    // Slow auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
}

});

