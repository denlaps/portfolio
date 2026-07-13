export class ScrollWatcher {
  constructor() {
    this.$header = document.querySelector('.js-header');
    this.$advantages = document.querySelectorAll('.js-advantage');
    this.$scalable = document.querySelector('.js-scalable');
    this.scrollTop = null;
    this.SHOW_DELAY = 200;
    this.HEADER_HEIGHT = 64;
    this.dir = {};
    this.SCROLL_STEP = 50;

    this.onScrollHandler();
    this.addListeners();
  }

  scaleOnScroll() {
    const scrollBottom = this.scrollTop + window.innerHeight + this.HEADER_HEIGHT * 3;
    const sectionTop = this.$scalable.closest('section').offsetTop;
    const diff = (scrollBottom - sectionTop) / 1000;
    debugger
    if (diff < 0) {
      this.$scalable.style.transform = `scale(0.1)`;
      return;
    }

    if (diff >= 1) {
      this.$scalable.style.transform = `scale(1)`;
      return;
    }

    this.$scalable.style.transform = `scale(${diff})`
  }

  showAdvantages() {
    const advantagesShowed = this.$advantages[0] && this.$advantages[0].classList.contains('_show');
    
    if (advantagesShowed) {
      return false;
    }

    if (this.scrollTop > 0) {
      let timeMS = 50;
      this.$advantages.forEach(($el) => {
        timeMS += this.SHOW_DELAY;
        setTimeout(() => {
          $el.classList.add('_show');
        }, timeMS);
      })
    }
  }

  addHeaderShadow() {
    if (this.scrollTop === 0) {
      this.$header.classList.remove('_shadow-mode');
      return;
    }

    this.$header.classList.add('_shadow-mode');
  }

  setMenuPoint() {
    document.querySelectorAll('.js-section').forEach($section => {
      const $menuLink = document.querySelectorAll(`[href="#${ $section.id }"]`);
      const sectionTop = $section.offsetTop - this.HEADER_HEIGHT;
      const sectionBottom = sectionTop + $section.offsetHeight;
      const isBlockSelect = this.scrollTop >= sectionTop && this.scrollTop <= sectionBottom;
      const action = isBlockSelect ? 'add' : 'remove';

      $menuLink.forEach($point => {
        $point.classList[action]('_active');
      });
    });
  }

  animateScroll(scrollTo, step, isInit) {
    if (isInit) {
      this.dir['top'] = scrollTo < this.scrollTop
      this.dir['bottom'] = ! this.dir['top'];
      step = this.dir['top'] ? -step : step;
    }

    if (
      this.dir['top'] && this.scrollTop - this.SCROLL_STEP <= scrollTo || 
      this.dir['bottom'] && this.scrollTop + this.SCROLL_STEP >= scrollTo
    ) {
      window.scrollTo(0, scrollTo);
      return;
    }

    window.scrollTo(0, this.scrollTop + step);
    requestAnimationFrame(this.animateScroll.bind(this, scrollTo, step, false));
  }

  setScrollTop() {
    this.scrollTop = window.scrollY;
  }

  onScrollHandler() {
    this.setScrollTop();

    this.addHeaderShadow();
    this.showAdvantages();
    this.setMenuPoint();
    this.scaleOnScroll();
  }

  addListeners() {
    window.addEventListener('scroll', this.onScrollHandler.bind(this));
    
    document.querySelectorAll('.header__menu__item').forEach($point => {
      $point.addEventListener('click', (ev) => {
        ev.preventDefault();

        const sectionID = $point.getAttribute('href').replace('#', '');
        const sectionTop = document.getElementById(sectionID).offsetTop;

        document.querySelector('.js-menu-burger').classList.remove('_show');
        document.querySelector('.js-menu-mobile').classList.remove('_show');
        this.animateScroll(sectionTop, this.SCROLL_STEP, true);
      })
    })
  }
}