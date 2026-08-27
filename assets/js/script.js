document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('menu-open', isOpen);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Scroll-reveal animation
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Listings filter (visual demo, client-side)
  var filterBtns = document.querySelectorAll('.filter-btn');
  var propertyCards = document.querySelectorAll('.property-card');
  if (filterBtns.length && propertyCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        propertyCards.forEach(function (card) {
          var type = card.getAttribute('data-type') || '';
          if (filter === 'all' || type.indexOf(filter) !== -1) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Contact form demo submit
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      status.textContent = "Thank you — this is a placeholder form. Connect it to your email or CRM to start receiving real enquiries.";
      status.style.color = 'var(--success)';
      status.classList.add('show');
      form.reset();
    });
  }

  // Property detail modal
  var modal = document.getElementById('property-modal');
  if (modal) {
    var modalImg = modal.querySelector('.pm-image');
    var modalBadge = modal.querySelector('.pm-badge');
    var modalPrice = modal.querySelector('.pm-price');
    var modalLoc = modal.querySelector('.pm-loc');
    var modalSpecs = modal.querySelector('.pm-specs');
    var modalPhone = modal.querySelector('.pm-phone');
    var closeBtn = modal.querySelector('.pm-close');
    var backdrop = modal.querySelector('.pm-backdrop');

    function openModal(card) {
      var img = card.querySelector('img');
      var badge = card.querySelector('.badge');
      modalImg.src = img ? img.src : '';
      modalImg.alt = img ? img.alt : '';
      modalBadge.textContent = badge ? badge.textContent : '';
      modalBadge.className = 'badge pm-badge' + (badge && badge.classList.contains('gold') ? ' gold' : '');
      modalPrice.textContent = card.querySelector('.property-price') ? card.querySelector('.property-price').textContent : '';
      modalLoc.innerHTML = card.querySelector('.property-loc') ? card.querySelector('.property-loc').innerHTML : '';
      modalSpecs.innerHTML = card.querySelector('.property-specs') ? card.querySelector('.property-specs').innerHTML : '';
      var phoneNumber = card.getAttribute('data-phone') || '+971 50 000 0000';
      modalPhone.textContent = phoneNumber;
      modalPhone.href = 'tel:' + phoneNumber.replace(/\s+/g, '');
      modal.classList.add('open');
      document.body.classList.add('menu-open');
    }
    function closeModal() {
      modal.classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    document.querySelectorAll('.property-card').forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () { openModal(card); });
      card.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') openModal(card);
      });
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }
});
