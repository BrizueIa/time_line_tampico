document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.scroll-wrapper');
    
    // Función para detectar si es dispositivo móvil
    const isMobile = () => window.innerWidth <= 768;
    
    // Manejador de scroll
    slider.addEventListener('wheel', (e) => {
        // En móvil, permitir scroll vertical normal
        if (isMobile()) return;
        
        // En desktop, convertir scroll vertical a horizontal
        e.preventDefault();
        const delta = e.shiftKey ? e.deltaX : e.deltaY;
        slider.scrollLeft += delta;
    }, { passive: false });

    // Manejador para botones de información
    document.querySelectorAll('.info-button').forEach(button => {
        button.addEventListener('click', () => {
            const infoAdicional = button.nextElementSibling;
            const estaVisible = infoAdicional.classList.contains('visible');
            
            // Cerrar todos los paneles de información abiertos
            document.querySelectorAll('.info-adicional.visible').forEach(panel => {
                panel.classList.remove('visible');
                panel.previousElementSibling.textContent = 'Más información';
            });
            
            // Si el panel clickeado no estaba visible, mostrarlo
            if (!estaVisible) {
                infoAdicional.classList.add('visible');
                button.textContent = 'Menos información';
            } else {
                button.textContent = 'Más información';
            }
        });
    });

    // Funcionalidad del carrusel
    document.querySelectorAll('.carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('.imagen');
        const dots = carousel.querySelectorAll('.dot');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'translateX(100%)';
            });
            dots.forEach(dot => dot.classList.remove('active'));

            const targetImage = images[index];
            targetImage.style.opacity = '1';
            targetImage.style.transform = 'translateX(0)';
            dots[index].classList.add('active');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        // Event listeners para los botones
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            nextImage();
        });

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            prevImage();
        });

        // Event listeners para los dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
            });
        });

        // Autoplay del carrusel
        let autoplayInterval = setInterval(nextImage, 5000);

        // Pausar autoplay cuando el mouse está sobre el carrusel
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        // Reanudar autoplay cuando el mouse sale del carrusel
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextImage, 5000);
        });
    });
});
