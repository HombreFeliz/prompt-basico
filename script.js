document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '20px 0';
        }
    });

    // Galería de imágenes
    const galleryContainer = document.querySelector('.gallery-container');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // Imágenes de muestra para la galería (en un proyecto real, estas vendrían de una base de datos)
    const galleryImages = [
        {
            src: 'https://source.unsplash.com/random/600x600/?portrait',
            title: 'Retrato Profesional',
            category: 'Retratos'
        },
        {
            src: 'https://source.unsplash.com/random/600x600/?wedding',
            title: 'Boda Romántica',
            category: 'Bodas'
        },
        {
            src: 'https://source.unsplash.com/random/600x600/?event',
            title: 'Evento Corporativo',
            category: 'Eventos'
        },
        {
            src: 'https://source.unsplash.com/random/600x600/?family',
            title: 'Sesión Familiar',
            category: 'Familias'
        },
        {
            src: 'https://source.unsplash.com/random/600x600/?nature',
            title: 'Paisaje Natural',
            category: 'Paisajes'
        },
        {
            src: 'https://source.unsplash.com/random/600x600/?architecture',
            title: 'Arquitectura Urbana',
            category: 'Arquitectura'
        }
    ];

    let currentImageIndex = 0;

    // Crear elementos de la galería
    if (galleryContainer) {
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            
            const info = document.createElement('div');
            info.className = 'gallery-item-info';
            
            const title = document.createElement('h3');
            title.textContent = image.title;
            
            const category = document.createElement('p');
            category.textContent = image.category;
            
            info.appendChild(title);
            info.appendChild(category);
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(info);
            
            galleryItem.addEventListener('click', () => openModal(index));
            
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Funciones para el modal de la galería
    function openModal(index) {
        if (modal) {
            currentImageIndex = index;
            modalImg.src = galleryImages[index].src;
            modalCaption.textContent = galleryImages[index].title;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
    }

    function closeModalFunc() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex].src;
        modalCaption.textContent = galleryImages[currentImageIndex].title;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex].src;
        modalCaption.textContent = galleryImages[currentImageIndex].title;
    }

    // Event listeners para el modal
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // Cerrar modal con la tecla Escape
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModalFunc();
        }
    });

    // Navegación con teclado en el modal
    window.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // En un proyecto real, aquí enviarías los datos a un servidor
            // Por ahora, solo mostraremos un mensaje de éxito
            alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.`);
            
            // Limpiar el formulario
            contactForm.reset();
        });
    }

    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about-content, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar estilos para animación
    document.querySelectorAll('.service-card, .about-content, .contact-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});