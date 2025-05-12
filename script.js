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
});
