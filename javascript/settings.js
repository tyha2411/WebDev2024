
document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');

    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    themeSelect.value = savedTheme;

    themeSelect.addEventListener('change', function () {
        const selectedTheme = themeSelect.value.toLowerCase();
        setTheme(selectedTheme);
    });

    function setTheme(theme) {
        if (theme === 'system') {
            document.documentElement.removeAttribute('data-theme');  // light mode
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }

        localStorage.setItem('theme', theme);
    }
});


