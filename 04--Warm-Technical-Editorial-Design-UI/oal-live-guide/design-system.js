const themeButtons = document.querySelectorAll('#themeToggle button');
const navigationLinks = document.querySelectorAll('#nav a');

function syncThemeState() {
  const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeVal === activeTheme));
  });
}

function syncNavigationState() {
  navigationLinks.forEach((link) => {
    if (link.classList.contains('active')) {
      link.setAttribute('aria-current', 'step');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

themeButtons.forEach((button) => button.addEventListener('click', syncThemeState));

new MutationObserver(syncNavigationState).observe(document.getElementById('nav'), {
  attributes: true,
  attributeFilter: ['class'],
  subtree: true
});

syncThemeState();
syncNavigationState();