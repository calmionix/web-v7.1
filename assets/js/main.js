/**
 * Calmionix V7 - Main JavaScript
 * Modern Premium Agency Website
 * Frontend-only logic, no backend
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initTheme();
  initMobileMenu();
  initNavbarScroll();
  initScrollReveal();
  initAccordion();
  initActiveNavLink();
});

/**
 * Theme Toggle (Dark/Light Mode)
 */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add transition class for smooth theme change
      html.classList.add('theme-transition');
      setTimeout(() => html.classList.remove('theme-transition'), 300);
    });
  }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarNav = document.querySelector('.navbar-nav');
  
  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navbarNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a nav link
    const navLinks = navbarNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navbarNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
        menuToggle.classList.remove('active');
        navbarNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add shadow when scrolled
      if (currentScroll > 10) {
        navbar.style.boxShadow = 'var(--shadow-md)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      
      // Hide/show navbar on scroll (optional)
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load
}

/**
 * Accordion (FAQ)
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = item.classList.contains('is-open');
        
        // Close all other items (optional - remove this block to allow multiple open)
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
          }
        });
        
        // Toggle current item
        item.classList.toggle('is-open', !isOpen);
      });
    }
  });
}

/**
 * Active Navigation Link
 */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Format Date to Indonesian
 */
function formatDate(date) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  return {
    dayName: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    monthShort: months[date.getMonth()].substring(0, 3),
    year: date.getFullYear(),
    fullDate: `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  };
}

/**
 * Generate WhatsApp Link for Content Booking
 */
function generateWhatsAppLink(date, time = '15:00') {
  const phone = '6282130570915';
  const formattedDate = formatDate(date);
  const message = `Halo, saya ingin ambil slot tanggal ${formattedDate.fullDate} jam ${time}`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp Link for Live Booking
 */
function generateLiveWhatsAppLink(date, time, duration, server) {
  const phone = '6282130570915';
  const formattedDate = formatDate(date);
  const message = `Halo, saya mau booking:\n\nTipe: Live TikTok\nTanggal: ${formattedDate.fullDate}\nJam: ${time}\nDurasi: ${duration} jam\nServer: ${server || 'Belum ditentukan'}`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Debounce Function
 */
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

/**
 * Smooth Scroll to Element
 */
function scrollToElement(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Copy to Clipboard
 */
function copyToClipboard(text, successCallback, errorCallback) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(successCallback)
      .catch(errorCallback);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      if (successCallback) successCallback();
    } catch (err) {
      if (errorCallback) errorCallback(err);
    }
    
    document.body.removeChild(textArea);
  }
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'success', duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Remove after duration
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ========================================
   V7 SCHEDULE SYSTEM
   ======================================== */

let currentScheduleType = 'konten';
let kontenData = [];
let liveData = [];

/**
 * Load Schedule Data (both konten and live)
 */
async function loadScheduleData() {
  try {
    const [kontenRes, liveRes] = await Promise.all([
      fetch('data/konten.json?v=' + Date.now()),
      fetch('data/live.json?v=' + Date.now())
    ]);
    
    kontenData = await kontenRes.json();
    liveData = await liveRes.json();
    
    return true;
  } catch (error) {
    console.error('Error loading schedule data:', error);
    return false;
  }
}

/**
 * Check if date has konten data
 */
function hasKonten(dateStr) {
  return kontenData.some(item => item.date === dateStr);
}

/**
 * Check if date has live data
 */
function hasLive(dateStr) {
  return liveData.some(item => item.date === dateStr);
}

/**
 * Get konten data for date
 */
function getKontenForDate(dateStr) {
  return kontenData.filter(item => item.date === dateStr);
}

/**
 * Get live data for date
 */
function getLiveForDate(dateStr) {
  return liveData.filter(item => item.date === dateStr);
}

/**
 * Generate next 20 days array
 */
function generateFutureDates(daysCount = 20) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < daysCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  
  return days;
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDateStr(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Toggle schedule type
 */
function toggleScheduleType(type) {
  currentScheduleType = type;
  
  // Update buttons
  document.querySelectorAll('.schedule-type-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  
  // Reload schedule
  renderSchedule();
}

/**
 * Render schedule grid
 */
async function renderSchedule() {
  const container = document.getElementById('scheduleGrid');
  if (!container) return;
  
  const loaded = await loadScheduleData();
  
  if (!loaded) {
    container.innerHTML = `
      <div class="text-center" style="grid-column: 1 / -1; padding: var(--space-2xl);">
        <i class="fas fa-exclamation-circle" style="font-size: var(--text-4xl); color: var(--danger); margin-bottom: var(--space-md);"></i>
        <h3>Gagal memuat jadwal</h3>
        <p>Silakan refresh halaman atau hubungi kami jika masalah berlanjut.</p>
      </div>
    `;
    return;
  }
  
  const days = generateFutureDates(20);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  
  let html = '';
  
  days.forEach((date, index) => {
    const dateStr = formatDateStr(date);
    const isToday = index === 0;
    const isSunday = date.getDay() === 0;
    
    if (currentScheduleType === 'konten') {
      const bookedSlots = getKontenForDate(dateStr);
      const isBooked = bookedSlots.length > 0;
      
      let statusClass = 'available';
      let statusText = 'Book Now';
      let timeText = '15:00 WIB';
      
      if (isToday) {
        statusClass = 'today';
        statusText = 'Hari Ini';
      } else if (isBooked) {
        statusClass = 'booked';
        statusText = 'FULL';
        timeText = bookedSlots[0].time + ' WIB';
      }
      
      const staggerClass = index < 6 ? `stagger-${(index % 6) + 1}` : '';
      
      let bookedContent = '';
      if (isBooked) {
        bookedSlots.forEach(slot => {
          bookedContent += `
            <div class="server-name">${slot.server}</div>
            <div class="platform-name">${slot.platform} | ${slot.time}</div>
          `;
        });
      }
      
      html += `
        <div class="schedule-item ${statusClass} reveal ${staggerClass}">
          <div class="date">${dayNames[date.getDay()]}</div>
          <div class="day">${date.getDate()}</div>
          <div class="month">${monthNames[date.getMonth()]} ${date.getFullYear()}</div>
          ${!isBooked ? `<div class="time">${timeText}</div>` : ''}
          ${isBooked ? bookedContent : `<div class="status">${statusText}</div>`}
          ${!isBooked ? `
            <a href="${Calmionix.generateWhatsAppLink(date, '15:00')}" class="btn btn-primary btn-sm" target="_blank">
              Book Now
            </a>
          ` : ''}
        </div>
      `;
    } else {
      // Live TikTok
      const bookedSlots = getLiveForDate(dateStr);
      const isBooked = bookedSlots.length > 0;
      
      let statusClass = 'available';
      let statusText = 'Book Now';
      let timeText = isSunday ? 'Bebas' : '16:00-18:00';
      
      if (isToday) {
        statusClass = 'today';
        statusText = 'Hari Ini';
      } else if (isBooked) {
        statusClass = 'booked';
        statusText = 'FULL';
      }
      
      const staggerClass = index < 6 ? `stagger-${(index % 6) + 1}` : '';
      
      let bookedContent = '';
      if (isBooked) {
        bookedSlots.forEach(slot => {
          bookedContent += `
            <div class="server-name">${slot.server}</div>
            <div class="platform-name">Live ${slot.time} | ${slot.duration} jam</div>
          `;
        });
      }
      
      html += `
        <div class="schedule-item ${statusClass} reveal ${staggerClass}">
          <div class="date">${dayNames[date.getDay()]}</div>
          <div class="day">${date.getDate()}</div>
          <div class="month">${monthNames[date.getMonth()]} ${date.getFullYear()}</div>
          ${!isBooked ? `<div class="time">${timeText}</div>` : ''}
          ${isBooked ? bookedContent : `<div class="status">${statusText}</div>`}
          ${!isBooked ? `
            <button class="btn btn-primary btn-sm" onclick="openLiveBooking('${dateStr}', ${date.getDay()})">
              Book Now
            </button>
          ` : ''}
        </div>
      `;
    }
  });
  
  if (html === '') {
    html = `
      <div class="schedule-empty">
        <i class="fas fa-calendar-times" style="font-size: var(--text-4xl); margin-bottom: var(--space-md);"></i>
        <h3>Belum ada jadwal tersedia</h3>
      </div>
    `;
  }
  
  container.innerHTML = html;
  
  // Re-initialize scroll reveal for new elements
  initScrollReveal();
}

/**
 * Open Live Booking Form inline
 */
function openLiveBooking(dateStr, dayIndex) {
  const item = document.querySelector(`button[onclick="openLiveBooking('${dateStr}', ${dayIndex})"]`).closest('.schedule-item');
  const isSunday = dayIndex === 0;
  
  item.innerHTML = `
    <div class="date">${item.querySelector('.date').textContent}</div>
    <div class="day">${item.querySelector('.day').textContent}</div>
    <div class="month">${item.querySelector('.month').textContent}</div>
    <div class="booking-form">
      <input type="text" id="live-server-${dateStr}" placeholder="Nama Server" required>
      <input type="time" id="live-time-${dateStr}" value="16:00" ${!isSunday ? 'min="16:00" max="18:00"' : ''} required>
      <select id="live-duration-${dateStr}" required>
        <option value="1">1 Jam</option>
        <option value="2">2 Jam</option>
      </select>
      <div class="validation-error" id="live-error-${dateStr}"></div>
      <button class="btn btn-primary btn-sm" onclick="submitLiveBooking('${dateStr}', ${dayIndex})">
        <i class="fab fa-whatsapp"></i> Booking
      </button>
      <button class="btn btn-ghost btn-sm" onclick="renderSchedule()">
        Batal
      </button>
    </div>
  `;
}

/**
 * Validate and submit live booking
 */
function submitLiveBooking(dateStr, dayIndex) {
  const serverInput = document.getElementById(`live-server-${dateStr}`);
  const timeInput = document.getElementById(`live-time-${dateStr}`);
  const durationInput = document.getElementById(`live-duration-${dateStr}`);
  const errorDiv = document.getElementById(`live-error-${dateStr}`);
  
  const server = serverInput.value.trim();
  const time = timeInput.value;
  const duration = parseInt(durationInput.value);
  const isSunday = dayIndex === 0;
  
  errorDiv.textContent = '';
  
  // Validation
  if (!server) {
    errorDiv.textContent = 'Nama server wajib diisi';
    return;
  }
  
  if (!time) {
    errorDiv.textContent = 'Jam wajib diisi';
    return;
  }
  
  // Time validation: Mon-Sat only 16:00-18:00
  if (!isSunday) {
    const [h, m] = time.split(':').map(Number);
    const timeMinutes = h * 60 + m;
    const minMinutes = 16 * 60; // 16:00
    const maxMinutes = 18 * 60; // 18:00
    if (timeMinutes < minMinutes || timeMinutes > maxMinutes) {
      errorDiv.textContent = 'Senin-Sabtu: hanya 16:00-18:00';
      return;
    }
  }
  
  // Duration validation: max 2 hours
  if (duration < 1 || duration > 2) {
    errorDiv.textContent = 'Durasi maksimal 2 jam';
    return;
  }
  
  // Check if slot is still available
  if (hasLive(dateStr)) {
    errorDiv.textContent = 'Slot sudah di booking';
    return;
  }
  
  // Build date object
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  // Generate WhatsApp link
  const waLink = Calmionix.generateLiveWhatsAppLink(date, time, duration, server);
  
  window.open(waLink, '_blank');
}

/**
 * Load schedule preview for homepage
 */
async function loadSchedulePreview() {
  const scheduleContainer = document.getElementById('schedulePreview');
  if (!scheduleContainer) return;
  
  try {
    const response = await fetch('data/konten.json?v=' + Date.now());
    const kontenData = await response.json();
    
    // Create a map of booked dates with details
    const bookedMap = {};
    kontenData.forEach(item => {
      if (!bookedMap[item.date]) {
        bookedMap[item.date] = [];
      }
      bookedMap[item.date].push(item);
    });
    
    // Generate 5 days starting from today
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    let html = '';
    
    days.forEach((date, index) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const bookedSlots = bookedMap[dateStr] || [];
      const isBooked = bookedSlots.length > 0;
      const isToday = index === 0;
      
      let statusClass = 'available';
      let statusText = 'Available';
      let timeText = '15:00 WIB';
      
      if (isToday) {
        statusClass = 'today';
        statusText = 'Hari Ini';
      } else if (isBooked) {
        statusClass = 'booked';
        statusText = 'Booked';
        timeText = bookedSlots[0].time + ' WIB';
      }
      
      // Build booked content
      let bookedContent = '';
      if (isBooked) {
        bookedSlots.forEach(slot => {
          bookedContent += `
            <div style="font-size: var(--text-xs); font-weight: var(--font-semibold); color: var(--danger); margin-top: var(--space-xs);">${slot.server}</div>
            <div style="font-size: var(--text-xs); color: var(--text-muted);">${slot.platform}</div>
          `;
        });
      }
      
      html += `
        <div class="schedule-item ${statusClass} reveal stagger-${index + 1}">
          <div class="date">${dayNames[date.getDay()]}</div>
          <div class="day">${date.getDate()}</div>
          <div class="month">${monthNames[date.getMonth()]}</div>
          ${!isBooked ? `<div class="time">${timeText}</div>` : ''}
          ${isBooked ? bookedContent : `<div class="status">${statusText}</div>`}
          ${!isBooked ? `
            <a href="${Calmionix.generateWhatsAppLink(date, '15:00')}" class="btn btn-primary btn-sm" target="_blank">
              Ambil Slot
            </a>
          ` : ''}
        </div>
      `;
    });
    
    scheduleContainer.innerHTML = html;
    
  } catch (error) {
    console.error('Error loading schedule:', error);
    scheduleContainer.innerHTML = `
      <div class="text-center" style="grid-column: 1 / -1;">
        <p>Gagal memuat jadwal. Silakan refresh halaman.</p>
      </div>
    `;
  }
}

/* ========================================
   V7 PRICE FILTER
   ======================================== */

let currentPriceFilter = 'all';

/**
 * Filter price cards — v7.1 ROBUST SYSTEM
 */
function filterPrice(category) {
  currentPriceFilter = category;
  
  // Update active button
  document.querySelectorAll('.price-filter button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  
  // Show/hide cards
  let visibleCount = 0;
  document.querySelectorAll('.price-card[data-category]').forEach(card => {
    const cardCategory = card.dataset.category;
    const categories = cardCategory.split(',');
    
    if (category === 'all' || categories.includes(category)) {
      card.classList.remove('is-hidden');
      visibleCount++;
    } else {
      card.classList.add('is-hidden');
    }
  });
  
  // Hide/show section headings based on visible cards
  document.querySelectorAll('.pricing-section[data-section]').forEach(section => {
    const sectionCards = section.querySelectorAll('.price-card[data-category]');
    let sectionVisible = 0;
    sectionCards.forEach(card => {
      if (!card.classList.contains('is-hidden')) {
        sectionVisible++;
      }
    });
    
    if (sectionVisible === 0) {
      section.classList.add('is-empty');
    } else {
      section.classList.remove('is-empty');
    }
  });
  
  // Show fallback if nothing visible
  const noResults = document.getElementById('priceNoResults');
  if (noResults) {
    if (visibleCount === 0 && category !== 'all') {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }
  
  // Safety: if category not found, fallback to showing all
  if (visibleCount === 0 && category !== 'all') {
    console.warn('Filter "' + category + '" returned no results. Try another category.');
  }
}

/**
 * Calculate Live TikTok price — v7.1 with validation
 */
function calculateLivePrice() {
  const durationInput = document.getElementById('live-duration');
  const totalDisplay = document.getElementById('live-total');
  
  if (!durationInput || !totalDisplay) return;
  
  let duration = parseInt(durationInput.value);
  
  // Validation: NaN/empty fallback to 1
  if (isNaN(duration) || durationInput.value.trim() === '') {
    duration = 1;
  }
  
  // Clamp: max 2, min 1
  duration = Math.max(1, Math.min(2, duration));
  
  // Update input if clamped
  if (durationInput.value !== String(duration)) {
    durationInput.value = duration;
  }
  
  const total = duration * 40000;
  totalDisplay.textContent = 'Rp ' + total.toLocaleString('id-ID');
}

/**
 * Book Live TikTok from pricing page
 */
function bookLiveTikTok() {
  const durationInput = document.getElementById('live-duration');
  
  let duration = parseInt(durationInput?.value) || 1;
  duration = Math.max(1, Math.min(2, duration));
  
  const total = duration * 40000;
  
  const phone = '6282130570915';
  const message = `Halo, saya mau booking Live TikTok:\n\nTipe: Live TikTok\nDurasi: ${duration} jam\nTotal: Rp ${total.toLocaleString('id-ID')}\nServer: (akan ditentukan)`;
  
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Export functions for use in other scripts
window.Calmionix = {
  formatDate,
  generateWhatsAppLink,
  generateLiveWhatsAppLink,
  toggleScheduleType,
  renderSchedule,
  openLiveBooking,
  submitLiveBooking,
  loadSchedulePreview,
  filterPrice,
  calculateLivePrice,
  bookLiveTikTok,
  debounce,
  scrollToElement,
  copyToClipboard,
  showToast
};
