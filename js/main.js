/* Mộc Sương Atelier — progressive enhancement. Each module no-ops if its elements are missing. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const NAV_IDS = ['bo-suu-tap', 'hoa-ban-chay', 'theo-dip', 'cau-chuyen', 'cach-dat-hoa'];
  const MENU_MS = 400; // --dur-slow
  const FLASH_MS = 1600;
  const SUBMIT_MS = 900;
  const MAX_DAYS = 90;
  const CUTOFF_HOUR = 16;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  let activeFilter = 'all'; // shared by the filter (§7.6) and prefill (§7.7)
  let orderForm = null; // API exposed by initOrderForm() to initPrefill()

  /* §7.9 Image fallback */
  function initImageFallbacks() {
    $$('.media img').forEach((img) => {
      const frame = img.closest('.media');
      const fail = () => frame.classList.add('is-error');
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
      else img.addEventListener('error', fail, { once: true });
    });
  }

  /* §7.1 Header scrolled state */
  function initHeader() {
    const header = $('.site-header');
    if (!header) return;

    let ticking = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* §7.2 Mobile navigation */
  function initMobileNav() {
    const toggle = $('.nav-toggle');
    const panel = $('#mobile-menu');
    if (!toggle || !panel) return;
    toggle.hidden = false;

    const root = document.documentElement;
    const background = [$('.skip-link'), $('main'), $('footer')].filter(Boolean);
    let hideTimer = 0;
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    function setExpanded(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
      background.forEach((el) => el.toggleAttribute('inert', open));
      root.classList.toggle('is-menu-open', open);
    }

    function openMenu() {
      window.clearTimeout(hideTimer);
      panel.hidden = false;
      void panel.offsetHeight; // reflow so the opening transition plays
      panel.classList.add('is-open');
      setExpanded(true);
      const firstLink = $('a', panel);
      if (firstLink) firstLink.focus();
    }

    function closeMenu({ returnFocus = false } = {}) {
      if (!isOpen()) return;
      panel.classList.remove('is-open');
      setExpanded(false);
      const hide = () => {
        if (!panel.classList.contains('is-open')) panel.hidden = true;
      };
      if (reduceMotion.matches) hide();
      else hideTimer = window.setTimeout(hide, MENU_MS);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => (isOpen() ? closeMenu({ returnFocus: true }) : openMenu()));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) closeMenu({ returnFocus: true });
    });
    // Close only; the browser still follows the anchor.
    panel.addEventListener('click', (event) => {
      if (event.target.closest('a[href^="#"]')) closeMenu();
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  /* §7.4 Scrollspy */
  function initScrollSpy() {
    const links = $$('.site-nav__link, .mobile-menu__link');
    const sections = $$('main > section[id]');
    if (!('IntersectionObserver' in window) || !links.length || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = NAV_IDS.includes(entry.target.id) ? entry.target.id : null;
        links.forEach((link) => {
          if (id && link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  /* §7.5 Scroll reveal */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (reduceMotion.matches || !('IntersectionObserver' in window) || !items.length) return;

    document.documentElement.classList.add('reveal-ready');
    $$('[data-reveal-group]').forEach((group) => {
      Array.from(group.children)
        .filter((child) => child.hasAttribute('data-reveal'))
        .forEach((child, index) => child.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 80}ms`));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Elements taller than the viewport can never reach 15%, so they reveal on entry.
        const tall = entry.boundingClientRect.height > window.innerHeight;
        if (!entry.isIntersecting || (entry.intersectionRatio < 0.15 && !tall)) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: [0, 0.15], rootMargin: '0px 0px -10% 0px' });
    items.forEach((item) => observer.observe(item));
  }

  /* §7.6 Product filter */
  function initProductFilter() {
    const filter = $('.filter');
    const items = $$('.products__item');
    if (!filter || !items.length) return;

    const chips = $$('.chip[data-filter]', filter);
    const status = $('#product-status');
    const empty = $('.products__empty');

    function applyFilter(chip) {
      const value = chip.dataset.filter;
      activeFilter = value;
      chips.forEach((other) => other.setAttribute('aria-pressed', String(other === chip)));

      let count = 0;
      items.forEach((item) => {
        const match = value === 'all' || (item.dataset.occasions || '').split(/\s+/).includes(value);
        const wasHidden = item.hidden;
        item.hidden = !match;
        if (!match) {
          item.classList.remove('is-entering');
          return;
        }
        count += 1;
        if (wasHidden && !reduceMotion.matches) {
          item.classList.add('is-entering');
          item.addEventListener('animationend', () => item.classList.remove('is-entering'), { once: true });
        }
      });

      if (empty) empty.hidden = count > 0;
      if (status) {
        status.textContent = value === 'all'
          ? `Đang hiển thị tất cả ${count} mẫu hoa.`
          : `Đang hiển thị ${count} mẫu hoa cho dịp ${chip.textContent.trim()}.`;
      }
    }

    chips.forEach((chip) => chip.addEventListener('click', () => applyFilter(chip)));
    filter.hidden = false;
  }

  /* §7.8 Order form: validation and simulated submit */
  const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]{1,59}$/u;
  const PHONE_RE = /^(?:\+84|84|0)(?:[35789]\d{8}|2\d{9})$/;
  const cleanName = (value) => value.trim().replace(/\s+/g, ' ');
  const cleanPhone = (value) => value.replace(/[\s.\-()]/g, '');
  const pad = (n) => String(n).padStart(2, '0');
  // Local date parts only: toISOString() is UTC and wrong in Vietnam before 07:00.
  const isoDate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const today = (offsetDays = 0) => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + offsetDays);
  };

  function parseDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return null;
    const [y, m, d] = match.slice(1).map(Number);
    const date = new Date(y, m - 1, d);
    // Reject rolled-over dates such as 2026-02-31.
    return date.getMonth() === m - 1 && date.getDate() === d ? date : null;
  }

  const validators = {
    'order-name': ({ value }) => {
      const name = cleanName(value);
      if (!name) return 'Vui lòng nhập họ và tên.';
      return NAME_RE.test(name) ? '' : 'Họ và tên chỉ gồm chữ cái và khoảng trắng, từ 2 đến 60 ký tự.';
    },
    'order-phone': ({ value }) => {
      const phone = cleanPhone(value);
      if (!phone) return 'Vui lòng nhập số điện thoại.';
      return PHONE_RE.test(phone) ? '' : 'Số điện thoại chưa đúng. Ví dụ: 0901 234 567 hoặc +84 901 234 567.';
    },
    'order-occasion': ({ value }) => (value ? '' : 'Vui lòng chọn dịp tặng hoa.'),
    'order-date': ({ value }) => {
      const date = parseDate(value);
      if (!date) return 'Vui lòng chọn ngày giao hoa.';
      if (date < today()) return 'Ngày giao không thể là ngày đã qua.';
      if (date.getTime() === today().getTime() && new Date().getHours() >= CUTOFF_HOUR) {
        return 'Đơn giao trong hôm nay cần đặt trước 16:00. Vui lòng chọn ngày mai hoặc gọi 0900 123 456.';
      }
      return date > today(MAX_DAYS) ? 'Mộc Sương nhận đặt trước tối đa 90 ngày.' : '';
    },
  };

  function initOrderForm() {
    const form = $('#order-form');
    const success = $('#order-success');
    const submit = form && $('[type="submit"]', form);
    const label = submit && $('.btn__label', submit);
    const status = $('#form-status');
    const statusText = status && $('.form-status__text', status);
    const message = $('#order-message');
    const counter = $('#order-message-count');
    const title = $('#order-success-title');
    const outName = success && $('[data-success-name]', success);
    const outPhone = success && $('[data-success-phone]', success);
    const resetButton = success && $('.order-success__reset', success);
    const controls = Object.keys(validators).map((id) => document.getElementById(id));
    const [nameInput, phoneInput, , dateInput] = controls;
    const required = [label, statusText, message, counter, title, outName, outPhone, resetButton, ...controls];
    if (required.some((el) => !el)) return;

    const defaultLabel = label.textContent;
    const touched = new Set();
    let loading = false;

    form.noValidate = true;

    const setDateLimits = () => {
      dateInput.min = isoDate(today());
      dateInput.max = isoDate(today(MAX_DAYS));
    };
    const updateCounter = () => {
      counter.textContent = `${message.value.length}/${message.maxLength}`;
    };

    function setError(control, text) {
      const error = document.getElementById(`${control.id}-error`);
      control.closest('.field').classList.toggle('is-invalid', Boolean(text));
      control.setAttribute('aria-invalid', String(Boolean(text)));
      $('.field__error-text', error).textContent = text;
      error.hidden = !text;
    }

    function validate(control) {
      const text = validators[control.id](control);
      setError(control, text);
      return !text;
    }

    function setStatus(count) {
      statusText.textContent = count ? `Vui lòng kiểm tra lại ${count} mục được đánh dấu.` : '';
      status.classList.toggle('is-visible', count > 0);
    }

    function revalidate(control) {
      if (!touched.has(control)) return;
      validate(control);
      // While the summary is shown it tracks the live error count.
      if (status.classList.contains('is-visible')) {
        setStatus(controls.filter((c) => c.getAttribute('aria-invalid') === 'true').length);
      }
    }

    function setLoading(on) {
      loading = on;
      submit.classList.toggle('is-loading', on);
      // aria-disabled (not disabled) keeps focus on the button.
      if (on) submit.setAttribute('aria-disabled', 'true');
      else submit.removeAttribute('aria-disabled');
      label.textContent = on ? 'Đang gửi…' : defaultLabel;
    }

    function reset() {
      form.reset();
      controls.forEach((control) => setError(control, ''));
      touched.clear();
      setStatus(0);
      updateCounter();
      success.hidden = true;
      form.hidden = false;
      nameInput.focus();
    }

    controls.forEach((control) => {
      control.addEventListener('blur', () => {
        touched.add(control);
        revalidate(control);
      });
      const live = control.tagName === 'SELECT' || control.type === 'date' ? 'change' : 'input';
      control.addEventListener(live, () => revalidate(control));
    });
    dateInput.addEventListener('focus', setDateLimits);
    message.addEventListener('input', updateCounter);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (loading) return;

      setDateLimits();
      controls.forEach((control) => touched.add(control));
      const invalid = controls.filter((control) => !validate(control));
      if (invalid.length) {
        setStatus(invalid.length);
        invalid[0].focus();
        return;
      }

      setStatus(0);
      setLoading(true);
      // TODO: kết nối API đặt hoa khi có backend
      window.setTimeout(() => {
        outName.textContent = cleanName(nameInput.value);
        outPhone.textContent = phoneInput.value.trim();
        form.hidden = true;
        success.hidden = false;
        setLoading(false);
        title.focus();
      }, SUBMIT_MS);
    });

    resetButton.addEventListener('click', reset);

    setDateLimits();
    updateCounter();
    orderForm = { reset, revalidate, isSuccessVisible: () => !success.hidden };
  }

  /* §7.7 Prefill from occasions, products and collections */
  function initPrefill() {
    const occasion = $('#order-occasion');
    const product = $('#order-product');
    if (!occasion || !product) return;

    const timers = new Map();

    function flash(select) {
      const field = select.closest('.field');
      window.clearTimeout(timers.get(field));
      field.classList.remove('is-prefilled');
      void field.offsetWidth; // restart the animation
      field.classList.add('is-prefilled');
      timers.set(field, window.setTimeout(() => field.classList.remove('is-prefilled'), FLASH_MS));
    }

    function prefill(select, value) {
      if (!value || !Array.from(select.options).some((option) => option.value === value)) return;
      select.value = value;
      flash(select);
      if (orderForm) orderForm.revalidate(select);
    }

    // Default is never prevented: the browser still scrolls to #dat-hoa.
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-occasion], a[data-product]');
      if (!link) return;
      if (orderForm && orderForm.isSuccessVisible()) orderForm.reset();

      prefill(occasion, link.dataset.occasion);
      if (link.dataset.product) {
        prefill(product, link.dataset.product);
        if (activeFilter !== 'all' && !occasion.value) prefill(occasion, activeFilter);
      }
    });
  }

  /* §7.10 Footer year */
  function initYear() {
    $$('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function init() {
    initImageFallbacks();
    initHeader();
    initMobileNav();
    initScrollSpy();
    initReveal();
    initProductFilter();
    initOrderForm();
    initPrefill();
    initYear();
  }

  init();
})();
