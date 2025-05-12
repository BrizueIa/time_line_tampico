document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.scroll-wrapper');
    
    // Convertir scroll vertical a horizontal
    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // Si se presiona shift, usar deltaX, si no, usar deltaY
        const delta = e.shiftKey ? e.deltaX : e.deltaY;
        slider.scrollLeft += delta;
    }, { passive: false });
});
