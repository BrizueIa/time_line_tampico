document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.scroll-wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;
    let momentumID;
    let velocity = 0;
    let lastX = 0;
    let timestamp = 0;

    function applyMomentum() {
        if (!isDown && Math.abs(velocity) > 0.1) {
            slider.scrollLeft -= velocity;
            velocity *= 0.95; // Fricción
            momentumID = requestAnimationFrame(applyMomentum);
        }
    }

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX;
        scrollLeft = slider.scrollLeft;
        lastX = e.pageX;
        timestamp = Date.now();
        
        cancelAnimationFrame(momentumID);
        velocity = 0;
        
        e.preventDefault();
    });

    slider.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            slider.style.cursor = 'grab';
            requestAnimationFrame(applyMomentum);
        }
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        requestAnimationFrame(applyMomentum);
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX;
        const deltaX = x - lastX;
        const now = Date.now();
        const deltaTime = now - timestamp;
        
        velocity = deltaX * 2; // Ajusta este valor para cambiar la sensibilidad
        
        slider.scrollLeft = scrollLeft - (x - startX);
        
        lastX = x;
        timestamp = now;
    });

    // Suavizar el scroll con la rueda del mouse
    slider.addEventListener('wheel', (e) => {
        if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            const smoothScroll = e.deltaY || e.deltaX;
            velocity = smoothScroll * 0.5;
            slider.scrollLeft += smoothScroll;
            cancelAnimationFrame(momentumID);
            requestAnimationFrame(applyMomentum);
        }
    }, { passive: false });

    // Mejorar el comportamiento táctil
    let touchStartX;
    let touchVelocity = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        scrollLeft = slider.scrollLeft;
        cancelAnimationFrame(momentumID);
    });

    slider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX;
        const walk = (touchStartX - x);
        touchVelocity = walk * 0.1;
        slider.scrollLeft = scrollLeft + walk;
    });

    slider.addEventListener('touchend', () => {
        velocity = touchVelocity;
        requestAnimationFrame(applyMomentum);
    });
});
