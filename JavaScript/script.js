/* ============================================
   ECO MANAGEMENT SYSTEM - JAVASCRIPT
   Form Validation & Interactivity
   ============================================ */

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setActiveNavLink();
    attachFormListeners();
    setupThemeToggle();
});

// ===== THEME FUNCTIONALITY =====

/**
 * Initialize theme from localStorage
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

/**
 * Set theme
 */
function setTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
        html.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeButton('☀️ Light');
    } else {
        html.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        updateThemeButton('🌙 Dark');
    }
}

/**
 * Toggle theme
 */
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

/**
 * Update theme button text
 */
function updateThemeButton(text) {
    const themeButton = document.getElementById('themeToggle');
    if (themeButton) {
        themeButton.textContent = text;
    }
}

/**
 * Setup theme toggle button
 */
function setupThemeToggle() {
    const themeButton = document.getElementById('themeToggle');
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
    }
}

// ===== SET ACTIVE NAVIGATION LINK =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== ATTACH FORM LISTENERS =====
function attachFormListeners() {
    const reportForm = document.getElementById('reportGarbageForm');
    const bookForm = document.getElementById('bookVehicleForm');
    const contactForm = document.getElementById('contactForm');
    
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportGarbageSubmit);
    }
    
    if (bookForm) {
        bookForm.addEventListener('submit', handleBookingSubmit);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// ===== GARBAGE REPORT FORM VALIDATION =====
function handleReportGarbageSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('reportName').value.trim();
    const location = document.getElementById('reportLocation').value.trim();
    const garbageLevel = document.getElementById('garbageLevel').value;
    
    // Clear previous errors
    clearErrors('report-form');
    
    // Validation
    let isValid = true;
    
    if (!name) {
        showError('reportName', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('reportName', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!location) {
        showError('reportLocation', 'Please enter your area/location');
        isValid = false;
    } else if (location.length < 3) {
        showError('reportLocation', 'Location must be at least 3 characters');
        isValid = false;
    }
    
    if (!garbageLevel) {
        showError('garbageLevel', 'Please select garbage level');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        showSuccessMessage(
            'report-form',
            'Garbage report sent successfully to the nearest garbage vehicle',
            'reportGarbageForm'
        );
    }
}

// ===== BOOK GARBAGE VEHICLE FORM VALIDATION =====
function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('bookName').value.trim();
    const address = document.getElementById('bookAddress').value.trim();
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    const garbageType = document.getElementById('garbageType').value;
    
    // Clear previous errors
    clearErrors('book-form');
    
    // Validation
    let isValid = true;
    
    if (!name) {
        showError('bookName', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('bookName', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!address) {
        showError('bookAddress', 'Please enter your address');
        isValid = false;
    } else if (address.length < 5) {
        showError('bookAddress', 'Address must be at least 5 characters');
        isValid = false;
    }
    
    if (!date) {
        showError('bookDate', 'Please select a date');
        isValid = false;
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError('bookDate', 'Please select a future date');
            isValid = false;
        }
    }
    
    if (!time) {
        showError('bookTime', 'Please select a time');
        isValid = false;
    }
    
    if (!garbageType) {
        showError('garbageType', 'Please select garbage type');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        showSuccessMessage(
            'book-form',
            'Garbage vehicle booked successfully. Expected arrival in 2-3 hours.',
            'bookVehicleForm'
        );
    }
}

// ===== CONTACT FORM VALIDATION =====
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Clear previous errors
    clearErrors('contact-form');
    
    // Validation
    let isValid = true;
    
    if (!name) {
        showError('contactName', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('contactName', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!email) {
        showError('contactEmail', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('contactEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message) {
        showError('contactMessage', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('contactMessage', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        showSuccessMessage(
            'contact-form',
            'Thank you for contacting us! We will respond shortly.',
            'contactForm'
        );
    }
}

// ===== HELPER FUNCTIONS =====

/**
 * Show error message for form field
 */
function showError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (field) {
        const errorElement = field.parentElement.querySelector('.error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }
}

/**
 * Clear all error messages in a form
 */
function clearErrors(formSelector) {
    const errors = document.querySelectorAll(`#${formSelector.replace('-', '')} .error`);
    errors.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
}

/**
 * Show success message and reset form
 */
function showSuccessMessage(formSelector, message, formId) {
    // Create or update success message div
    let successDiv = document.querySelector(`#${formSelector} .success-message`);
    
    if (!successDiv) {
        const formElement = document.getElementById(formId);
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        formElement.insertBefore(successDiv, formElement.firstChild);
    }
    
    successDiv.textContent = message;
    successDiv.classList.add('show');
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Reset form
    const formElement = document.getElementById(formId);
    formElement.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
    }, 5000);
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Generic form validation helper
 */
function validateField(fieldId, minLength = 1, maxLength = 255) {
    const field = document.getElementById(fieldId);
    if (!field) return false;
    
    const value = field.value.trim();
    
    if (value.length < minLength) {
        return false;
    }
    
    if (value.length > maxLength) {
        return false;
    }
    
    return true;
}

// ===== UTILITY FUNCTIONS =====

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Set minimum date for date input (today)
 */
function setMinDateToday() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = formatDate(new Date());
    
    dateInputs.forEach(input => {
        if (!input.getAttribute('min')) {
            input.setAttribute('min', today);
        }
    });
}

// Initialize date inputs
document.addEventListener('DOMContentLoaded', setMinDateToday);

// ===== LOCAL STORAGE HELPERS (Optional) =====

/**
 * Save form data to local storage (for recovery)
 */
function saveFormData(formId) {
    const formElement = document.getElementById(formId);
    if (!formElement) return;
    
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    localStorage.setItem(`formData_${formId}`, JSON.stringify(data));
}

/**
 * Load form data from local storage
 */
function loadFormData(formId) {
    const savedData = localStorage.getItem(`formData_${formId}`);
    if (!savedData) return;
    
    const data = JSON.parse(savedData);
    const formElement = document.getElementById(formId);
    
    if (!formElement) return;
    
    Object.keys(data).forEach(key => {
        const field = formElement.elements[key];
        if (field) {
            field.value = data[key];
        }
    });
}

/**
 * Clear saved form data
 */
function clearSavedFormData(formId) {
    localStorage.removeItem(`formData_${formId}`);
}
