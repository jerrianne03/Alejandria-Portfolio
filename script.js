/* =========================================================
   JERRIANNE KENT ALEJANDRIA
   PERSONAL PORTFOLIO — SCRIPT.JS
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = [...document.querySelectorAll('.nav-link')];

const header = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');

const revealItems = document.querySelectorAll('.reveal');

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const typedRole = document.querySelector('.typed-role');

const profilePhoto = document.querySelector('.profile-photo');
const profileFrame = document.querySelector('.profile-frame');

const heroSection = document.querySelector('.hero');

const reduceMotionQuery =
  window.matchMedia('(prefers-reduced-motion: reduce)');

const finePointerQuery =
  window.matchMedia('(pointer: fine)');


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const closeMenu = () => {
  if (!navMenu || !navToggle) return;

  navMenu.classList.remove('is-open');
  navToggle.classList.remove('is-open');

  navToggle.setAttribute(
    'aria-expanded',
    'false'
  );

  navToggle.setAttribute(
    'aria-label',
    'Open navigation menu'
  );
};


if (navToggle && navMenu) {

  navToggle.addEventListener('click', () => {

    const isOpen =
      navMenu.classList.toggle('is-open');

    navToggle.classList.toggle(
      'is-open',
      isOpen
    );

    navToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    navToggle.setAttribute(
      'aria-label',
      isOpen
        ? 'Close navigation menu'
        : 'Open navigation menu'
    );

  });


  navLinks.forEach((link) => {

    link.addEventListener(
      'click',
      closeMenu
    );

  });


  /* Close when clicking outside */

  document.addEventListener(
    'click',
    (event) => {

      const clickedInsideMenu =
        navMenu.contains(event.target);

      const clickedToggle =
        navToggle.contains(event.target);

      if (
        !clickedInsideMenu &&
        !clickedToggle
      ) {
        closeMenu();
      }

    }
  );


  /* Close with Escape */

  document.addEventListener(
    'keydown',
    (event) => {

      if (event.key === 'Escape') {
        closeMenu();
      }

    }
  );

}


/* =========================================================
   ACTIVE NAVIGATION + HEADER SCROLL STATE
========================================================= */

const sections = [
  ...document.querySelectorAll(
    'main section[id]'
  )
];


const updateScrollUI = () => {

  const scrollY =
    window.scrollY;


  /* Header background */

  if (header) {

    header.classList.toggle(
      'scrolled',
      scrollY > 30
    );

  }


  /* Back to top */

  if (backToTop) {

    backToTop.classList.toggle(
      'visible',
      scrollY > 420
    );

  }


  /* Active navigation */

  const marker =
    scrollY + 140;

  let currentSection =
    'home';


  sections.forEach(
    (section) => {

      const top =
        section.offsetTop;

      const bottom =
        top + section.offsetHeight;


      if (
        marker >= top &&
        marker < bottom
      ) {

        currentSection =
          section.id;

      }

    }
  );


  navLinks.forEach(
    (link) => {

      const target =
        link.getAttribute('href');

      link.classList.toggle(
        'active',
        target === `#${currentSection}`
      );

    }
  );

};


/* Improve scroll performance */

window.addEventListener(
  'scroll',
  updateScrollUI,
  { passive: true }
);


/* Initial state */

updateScrollUI();


/* =========================================================
   BACK TO TOP
========================================================= */

if (backToTop) {

  backToTop.addEventListener(
    'click',
    () => {

      window.scrollTo({
        top: 0,
        behavior:
          reduceMotionQuery.matches
            ? 'auto'
            : 'smooth'
      });

    }
  );

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              'is-visible'
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.14,
      rootMargin:
        '0px 0px -40px 0px'
    }
  );


if (reduceMotionQuery.matches) {

  revealItems.forEach(
    (item) => {

      item.classList.add(
        'is-visible'
      );

    }
  );

} else {

  revealItems.forEach(
    (item, index) => {

      item.style.setProperty(
        '--reveal-delay',
        `${Math.min(index * 35, 210)}ms`
      );

      revealObserver.observe(
        item
      );

    }
  );

}


/* =========================================================
   PROFILE IMAGE
   - Tilt
   - Mouse movement
   - Hover glow
========================================================= */

if (
  profilePhoto &&
  profileFrame
) {

  /* Image loading error */

  profilePhoto.addEventListener(
    'error',
    () => {

      profileFrame.classList.add(
        'is-fallback'
      );

      profilePhoto.style.display =
        'none';

    }
  );


  /* Desktop pointer interaction */

  if (
    finePointerQuery.matches &&
    !reduceMotionQuery.matches
  ) {

    profileFrame.addEventListener(
      'pointermove',
      (event) => {

        const rect =
          profileFrame.getBoundingClientRect();


        const offsetX =
          (
            (event.clientX - rect.left) /
              rect.width
            - 0.5
          ) * 2;


        const offsetY =
          (
            (event.clientY - rect.top) /
              rect.height
            - 0.5
          ) * 2;


        /* Position movement */

        profileFrame.style.setProperty(
          '--drag-x',
          `${(offsetX * 8).toFixed(2)}px`
        );

        profileFrame.style.setProperty(
          '--drag-y',
          `${(offsetY * 8).toFixed(2)}px`
        );


        /* 3D tilt */

        profileFrame.style.setProperty(
          '--tilt-x',
          `${(-offsetY * 2.2).toFixed(2)}deg`
        );

        profileFrame.style.setProperty(
          '--tilt-y',
          `${(offsetX * 2.2).toFixed(2)}deg`
        );


        profileFrame.classList.add(
          'is-hovered'
        );

      }
    );


    /* Reset */

    profileFrame.addEventListener(
      'pointerleave',
      () => {

        profileFrame.style.setProperty(
          '--drag-x',
          '0px'
        );

        profileFrame.style.setProperty(
          '--drag-y',
          '0px'
        );

        profileFrame.style.setProperty(
          '--tilt-x',
          '0deg'
        );

        profileFrame.style.setProperty(
          '--tilt-y',
          '0deg'
        );

        profileFrame.classList.remove(
          'is-hovered'
        );

      }
    );

  }

}


/* =========================================================
   HERO MOUSE GLOW
========================================================= */

if (
  heroSection &&
  finePointerQuery.matches &&
  !reduceMotionQuery.matches
) {

  heroSection.addEventListener(
    'pointermove',
    (event) => {

      const rect =
        heroSection.getBoundingClientRect();


      const x =
        (
          (event.clientX - rect.left) /
            rect.width
        ) * 100;


      const y =
        (
          (event.clientY - rect.top) /
            rect.height
        ) * 100;


      heroSection.style.setProperty(
        '--mouse-x',
        `${x}%`
      );

      heroSection.style.setProperty(
        '--mouse-y',
        `${y}%`
      );

    }
  );


  heroSection.addEventListener(
    'pointerleave',
    () => {

      heroSection.style.setProperty(
        '--mouse-x',
        '50%'
      );

      heroSection.style.setProperty(
        '--mouse-y',
        '50%'
      );

    }
  );

}


/* =========================================================
   TYPING EFFECT
========================================================= */

const roleText = [

  'Graphic Designer',

  'Social Media Designer',

  'Branding & Marketing Graphics Designer',

  'Digital Content Designer',

  'BSIS Graduate and Web Developer'

];


if (typedRole) {

  /* Reduced motion */

  if (
    reduceMotionQuery.matches
  ) {

    typedRole.textContent =
      roleText[0];

  } else {

    let roleIndex = 0;

    let charIndex = 0;

    let deleting = false;


    const typeLoop = () => {

      const currentText =
        roleText[roleIndex];


      /* Typing */

      if (!deleting) {

        charIndex += 1;

        typedRole.textContent =
          currentText.slice(
            0,
            charIndex
          );


        if (
          charIndex >=
          currentText.length
        ) {

          deleting = true;

          setTimeout(
            typeLoop,
            1400
          );

          return;

        }

      }


      /* Deleting */

      else {

        charIndex -= 1;

        typedRole.textContent =
          currentText.slice(
            0,
            charIndex
          );


        if (
          charIndex <= 0
        ) {

          deleting = false;

          roleIndex =
            (
              roleIndex + 1
            ) %
            roleText.length;

        }

      }


      setTimeout(
        typeLoop,
        deleting
          ? 38
          : 82
      );

    };


    typeLoop();

  }

}


/* =========================================================
   PROJECT FILTERS
========================================================= */

const filterButtons = [
  ...document.querySelectorAll(
    '.filter-btn'
  )
];


const projectCards = [
  ...document.querySelectorAll(
    '.project-card'
  )
];


filterButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        const filter =
          button.dataset.filter;


        /* Active filter */

        filterButtons.forEach(
          (item) => {

            item.classList.remove(
              'active'
            );

          }
        );


        button.classList.add(
          'active'
        );


        /* Filter cards */

        projectCards.forEach(
          (card) => {

            const categories =
              (
                card.dataset.category ||
                ''
              ).split(' ');


            const visible =
              filter === 'all' ||
              categories.includes(
                filter
              );


            card.classList.toggle(
              'is-hidden',
              !visible
            );

          }
        );

      }
    );

  }
);


/* =========================================================
   PROJECT MODAL
========================================================= */

const modal =
  document.getElementById(
    'projectModal'
  );

const modalImage =
  document.getElementById(
    'modalImage'
  );

const modalCategory =
  document.getElementById(
    'modalCategory'
  );

const modalTitle =
  document.getElementById(
    'modalTitle'
  );

const modalDescription =
  document.getElementById(
    'modalDescription'
  );

const modalFocus =
  document.getElementById(
    'modalFocus'
  );

const modalTools =
  document.getElementById(
    'modalTools'
  );


const projectOpenButtons = [
  ...document.querySelectorAll(
    '.project-open'
  )
];


const modalCloseElements = [
  ...document.querySelectorAll(
    '[data-modal-close]'
  )
];


/* Project content */

const projectData = {

  butuan: {

    title:
      'Butuan Studio',

    category:
      'Brand Identity · Self-Initiated Concept',

    description:
      'A modern creative studio brand concept inspired by the growing design and creative community of Butuan City.',

    focus:
      'Logo system, visual identity, social media presence, brand applications',

    tools:
      'Canva · Photoshop · Illustrator',

    image:
      'assets/projects/butuan-studio.svg'

  },


  amaya: {

    title:
      'Amaya Café',

    category:
      'Social Media Branding · Self-Initiated Concept',

    description:
      'A warm and modern café concept created to demonstrate consistent social media branding and promotional design.',

    focus:
      'Posts, stories, menu design, promotional graphics',

    tools:
      'Canva · Photoshop · Illustrator',

    image:
      'assets/projects/amaya-cafe.svg'

  },


  luna: {

    title:
      'LÚNA Beauty',

    category:
      'Branding & Marketing · Self-Initiated Concept',

    description:
      'A minimalist beauty brand concept focused on clean presentation, promotional visuals, and product-centered marketing.',

    focus:
      'Logo, packaging concept, campaign graphics, product ads',

    tools:
      'Photoshop · Illustrator · Canva',

    image:
      'assets/projects/luna-beauty.svg'

  },


  localloop: {

    title:
      'LocalLoop',

    category:
      'UI/UX & Web Design · Self-Initiated Concept',

    description:
      'A modern platform concept designed to connect users with local businesses, products, and services through a simple digital experience.',

    focus:
      'Landing page, navigation, UI cards, responsive layout',

    tools:
      'HTML · CSS · JavaScript',

    image:
      'assets/projects/localloop.svg'

  },


  kasa: {

    title:
      'KASA Living',

    category:
      'Marketing Design · Self-Initiated Concept',

    description:
      'A lifestyle brand concept created to showcase product presentation, promotional campaigns, and social media marketing assets.',

    focus:
      'Product posts, banners, campaign graphics, social templates',

    tools:
      'Canva · Photoshop',

    image:
      'assets/projects/kasa-living.svg'

  }

};


/* =========================================================
   OPEN PROJECT MODAL
========================================================= */

const openModal = (key) => {

  const data =
    projectData[key];


  if (
    !modal ||
    !data
  ) {
    return;
  }


  /* Update modal */

  modalImage.src =
    data.image;

  modalImage.alt =
    `${data.title} project preview`;

  modalCategory.textContent =
    data.category;

  modalTitle.textContent =
    data.title;

  modalDescription.textContent =
    data.description;

  modalFocus.textContent =
    data.focus;

  modalTools.textContent =
    data.tools;


  /* Show */

  modal.classList.add(
    'is-open'
  );

  modal.setAttribute(
    'aria-hidden',
    'false'
  );

  document.body.classList.add(
    'modal-open'
  );


  /* Focus close button */

  modal
    .querySelector(
      '.modal-close'
    )
    ?.focus();

};


/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

const closeModal = () => {

  if (!modal) {
    return;
  }


  modal.classList.remove(
    'is-open'
  );

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'modal-open'
  );

};


/* Project buttons */

projectOpenButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        openModal(
          button.dataset.project
        );

      }
    );

  }
);


/* Close buttons / backdrop */

modalCloseElements.forEach(
  (element) => {

    element.addEventListener(
      'click',
      closeModal
    );

  }
);


/* Escape key */

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Escape' &&
      modal?.classList.contains(
        'is-open'
      )
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

  contactForm.addEventListener(
    'submit',
    (event) => {

      event.preventDefault();


      const name =
        document
          .getElementById('name')
          ?.value
          .trim() || '';


      const email =
        document
          .getElementById('email')
          ?.value
          .trim() || '';


      const projectType =
        document
          .getElementById('projectType')
          ?.value
          .trim() || '';


      const subject =
        document
          .getElementById('subject')
          ?.value
          .trim() || '';


      const message =
        document
          .getElementById('message')
          ?.value
          .trim() || '';


      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!formStatus) {
        return;
      }


      /* Required fields */

      if (
        !name ||
        !email ||
        !projectType ||
        !subject ||
        !message
      ) {

        formStatus.textContent =
          'Please complete all required fields before sending your message.';

        formStatus.className =
          'form-status error';

        return;

      }


      /* Email validation */

      if (
        !emailPattern.test(
          email
        )
      ) {

        formStatus.textContent =
          'Please enter a valid email address.';

        formStatus.className =
          'form-status error';

        return;

      }


      /* Message length */

      if (
        message.length < 20
      ) {

        formStatus.textContent =
          'Please tell me a little more about your project (at least 20 characters).';

        formStatus.className =
          'form-status error';

        return;

      }


      /* Success */

      formStatus.textContent =
        'Thanks! Your project details are ready. This is currently a frontend demo form and does not send emails yet.';

      formStatus.className =
        'form-status success';


      contactForm.reset();

    }
  );

}