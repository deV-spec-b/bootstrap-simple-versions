document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill, .experience-card, .practice-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('.goods-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.goods-card').querySelector('.goods-title').textContent;
            const productPrice = this.closest('.goods-card').querySelector('.goods-price').textContent;
            
            this.textContent = 'Добавлено!';
            this.style.background = '#2ecc71';
            
            setTimeout(() => {
                this.textContent = 'В корзину';
                this.style.background = '';
            }, 2000);
            
            console.log(`Товар добавлен: ${productName} - ${productPrice}`);
        });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.card').querySelector('.card-title').textContent;
            const productPrice = this.closest('.card').querySelector('.h5').textContent;
            const originalText = this.innerHTML;
            const originalClass = this.className;
            
            this.innerHTML = '<i class="bi bi-check2 me-2"></i>Добавлено!';
            this.className = this.className.replace(/btn-\w+/, 'btn-success');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.className = originalClass;
            }, 2000);
            
            console.log(`Товар "${productName}" за ${productPrice} добавлен в корзину`);
        });
    });

    const contactModal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openModalBtn');
    
    if (openModalBtn && contactModal) {
        openModalBtn.addEventListener('click', function() {
            console.log('Открываем модальное окно');
            contactModal.showModal();
        });
    }
    
    if (contactModal) {
        contactModal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.close();
            }
        });

        const closeBtn = contactModal.querySelector('.modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                contactModal.close();
            });
        }
    }

    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && event.target.type !== 'textarea') {
                event.preventDefault();
            }
        });
    }

    document.querySelectorAll('.news-card, .contact-card, .goods-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.querySelectorAll('.practice-card').forEach(card => {
        card.addEventListener('click', function() {
            const practiceTitle = this.querySelector('.practice-title').textContent;
            console.log(`Выбрана практика: ${practiceTitle}`);

            this.style.background = '#f8f9fa';
            this.style.borderLeftColor = '#e74c3c';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.borderLeftColor = '';
            }, 1000);
        });
    });

    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function() {
            const contactType = this.querySelector('.contact-card__title').textContent;
            const contactDetail = this.querySelector('.contact-card__detail').textContent;
            
            console.log(`Контакт: ${contactType} - ${contactDetail}`);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    const currentPage = window.location.pathname.split('/').pop();
    
    document.querySelectorAll('.nav__link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('nav__link--active');
        } else {
            link.classList.remove('nav__link--active');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage.includes('index.html')) ||
            (linkPage.includes(currentPage))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.footer__text').forEach(footer => {
        if (footer.textContent.includes('2025')) {
            footer.textContent = footer.textContent.replace('2025', currentYear);
        }
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    window.addEventListener('load', function() {
        const loadTime = performance.now().toFixed(2);
        console.log(`Страница загружена за ${loadTime} мс`);
    });
});

function submitForm() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    const formData = new FormData(form);

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };
    
    console.log('Данные формы:', data);
    
    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');

    const contactModal = document.getElementById('contactModal');
    if (contactModal) contactModal.close();
    
    form.reset();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(function() {
}, 100));

document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/300x200/ecf0f1/34495e?text=Изображение+не+загружено';
        e.target.alt = 'Изображение не доступно';
    }
}, true);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('contactModal');
        if (modal && modal.open) {
            modal.close();
        }
    }

    if (e.key === 'Enter' && e.target.classList.contains('goods-btn')) {
        e.target.click();
    }
});

const openModalBtn = document.getElementById('openModalBtn');
const contactModal = document.getElementById('contactModal');
const closeModalBtn = document.querySelector('.modal__close');
const cancelBtn = document.querySelector('.btn--secondary');

openModalBtn.addEventListener('click', () => {
    contactModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    contactModal.close();
});

cancelBtn.addEventListener('click', () => {
    contactModal.close();
});

contactModal.addEventListener('click', (e) => {
    const dialogDimensions = contactModal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        contactModal.close();
    }
});

function submitForm() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);
    
    console.log('Данные формы:', Object.fromEntries(formData));
    
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    
    contactModal.close();
    
    form.reset();
}

document.getElementById('feedbackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
});