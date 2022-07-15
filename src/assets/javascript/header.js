const header = document.querySelector("header");
const mobileMenuButton = document.querySelector(".mobile-menu-button");
let mobileMenu;
let isMobileMenuOpen = false;

mobileMenuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMenu();
});

/**
 * Toggle the mobile menu.
 */
const toggleMenu = () => {
  if (isMobileMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

/**
 * Create the mobile menu.
 */
const createMenu = () => {
  mobileMenu = document.createElement("div");
  mobileMenu.classList.add("mobile-menu");
  mobileMenu.addEventListener("click", (event) => {
    if (isMobileMenuOpen) {
      closeMenu();
    }
  });

  const mobileMenuContent = document.createElement("div");
  mobileMenuContent.classList.add("mobile-menu-content");

  const headerMenu = document.querySelector(".header-content nav ul");
  const logo = document.querySelector("a.home-link");
  mobileMenuContent.append(headerMenu.cloneNode(true));
  mobileMenuContent.append(logo.cloneNode(true));
  mobileMenu.append(mobileMenuContent);
};

/**
 * Open the mobile menu.
 */
const openMenu = () => {
  if (!mobileMenu) {
    createMenu();
  }

  header.append(mobileMenu);

  animateMenu({
    timing: getAnimationElapsedTime,
    draw: drawOpeningMenuAnimation,
    duration: 200,
  });

  isMobileMenuOpen = true;
};

/**
 * Close the mobile menu.
 */
const closeMenu = async () => {
  await animateMenu({
    timing: getAnimationElapsedTime,
    draw: drawClosingMenuAnimation,
    duration: 400,
  });
  mobileMenu.remove();

  isMobileMenuOpen = false;
};

/**
 * Animate the menu.
 * @param {function} timing Function which returns the elapsed time in milliseconds.
 * @param {function} draw Function which draws the animation.
 * @param {int} duration Duration of the animation in milliseconds.
 */
const animateMenu = async ({ timing, draw, duration }) => {
  const promise = () =>
    new Promise((resolve) => {
      const start = performance.now();

      const animate = (time) => {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        const progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });

  await promise();
};

/**
 * Get the elapsed time of an animation from a time fraction.
 * @param {float} timeFraction Time fraction of the animation.
 * @returns The elapsed time.
 */
const getAnimationElapsedTime = (timeFraction) => {
  return timeFraction;
};

/**
 * Draw the animation of the mobile menu when it is opening.
 * @param {float} progress Progress of the animation.
 */
const drawOpeningMenuAnimation = (progress) => {
  const mobileMenuContent = mobileMenu.querySelector(".mobile-menu-content");
  const menuBar1 = header.querySelector(".mobile-menu-button .bar-1");
  const menuBar2 = header.querySelector(".mobile-menu-button .bar-2");
  const menuBar3 = header.querySelector(".mobile-menu-button .bar-3");

  mobileMenu.style.opacity = progress;
  mobileMenuContent.style.opacity = progress;
  mobileMenuContent.style.width = progress * 100 + "%";

  let rotation = 2 * progress * 44;
  if (rotation > 44) rotation = 44;

  menuBar1.style.transform = "rotate(-" + rotation + "deg)";
  menuBar2.style.opacity = 0;
  menuBar3.style.transform = "rotate(" + rotation + "deg)";
};

/**
 * Draw the animation of the mobile menu when it is closing.
 * @param {float} progress Progress of the animation.
 */
const drawClosingMenuAnimation = (progress) => {
  const mobileMenuContent = mobileMenu.querySelector(".mobile-menu-content");
  const menuBar1 = header.querySelector(".mobile-menu-button .bar-1");
  const menuBar2 = header.querySelector(".mobile-menu-button .bar-2");
  const menuBar3 = header.querySelector(".mobile-menu-button .bar-3");

  mobileMenu.style.opacity = 1 - progress;
  mobileMenuContent.style.opacity = 1 - progress;
  mobileMenuContent.style.width = (1 - progress) * 100 + "%";

  let rotation = 44 - 2 * progress * 44;
  if (rotation < 0) rotation = 0;

  menuBar1.style.transform = "rotate(-" + rotation + "deg)";
  menuBar2.style.opacity = 0.5 + progress / 2;
  menuBar3.style.transform = "rotate(" + rotation + "deg)";
};
