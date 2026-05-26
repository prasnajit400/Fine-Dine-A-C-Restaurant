// Initialize Lucide Icons
lucide.createIcons();

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIconOpen.classList.toggle('hidden');
    menuIconClose.classList.toggle('hidden');
});

// Smooth scroll and mobile menu close
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            }
        }
    });
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        modalImg.src = imgSrc;
        modal.classList.remove('hidden');
        // Small delay to allow display:flex to apply before changing opacity for smooth transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalImg.classList.remove('scale-95');
        }, 10);
    });
});

closeModal.addEventListener('click', closeGalleryModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGalleryModal();
    }
});

function closeGalleryModal() {
    modal.classList.add('opacity-0');
    modalImg.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Reservation WhatsApp Submit
const form = document.getElementById('reservation-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('res-name').value;
    const phone = document.getElementById('res-phone').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    
    if (!name || !phone || !date || !time) {
        alert('Please fill out all fields before submitting.');
        return;
    }
    
    const message = `*New Reservation Request*\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919348779657"; // Extracted from data.ts
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});
