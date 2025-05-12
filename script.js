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
});
