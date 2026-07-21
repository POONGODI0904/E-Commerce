// Hero Slider Component

class HeroSlider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.slides = this.container.querySelectorAll('.slide');
        this.prevBtn = this.container.querySelector('.prev-slide');
        this.nextBtn = this.container.querySelector('.next-slide');
        this.dotsContainer = this.container.querySelector('.slider-dots');
        
        this.currentIndex = 0;
        this.interval = null;
        this.autoplayTime = 6000; // 6 seconds per slide
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Setup Dots
        if (this.dotsContainer) {
            this.dotsContainer.innerHTML = '';
            this.slides.forEach((_, idx) => {
                const dot = document.createElement('span');
                dot.classList.add('slider-dot');
                if (idx === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(idx));
                this.dotsContainer.appendChild(dot);
            });
        }
        
        // Setup Navigation Arrows
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoplay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoplay();
            });
        }
        
        this.showSlide(0);
        this.startAutoplay();
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        const dots = this.dotsContainer ? this.dotsContainer.querySelectorAll('.slider-dot') : [];
        dots.forEach(dot => dot.classList.remove('active'));
        
        this.currentIndex = index;
        if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
        if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
        
        this.slides[this.currentIndex].classList.add('active');
        if (dots[this.currentIndex]) {
            dots[this.currentIndex].classList.add('active');
        }
    }
    
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
    
    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoplay();
    }
    
    startAutoplay() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayTime);
    }
    
    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Instantiate slider when window loads
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider('hero-slider');
});
