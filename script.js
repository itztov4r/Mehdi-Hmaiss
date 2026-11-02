
document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("theme-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const yearElement = document.getElementById("year");


    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    function updateThemeButton() {
        if (!themeToggle) return;

        const dark = document.body.classList.contains("dark");

        themeToggle.textContent = dark ? "☀" : "☾";
        themeToggle.setAttribute(
            "aria-label",
            dark ? "Activer le thème clair" : "Activer le thème sombre"
        );
        themeToggle.setAttribute("aria-pressed", String(dark));
    }

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            const theme = document.body.classList.contains("dark")
                ? "dark"
                : "light";

            localStorage.setItem("portfolio-theme", theme);
            updateThemeButton();
        });
    }


    function closeMenu() {
        if (!navLinks || !menuToggle) return;

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Fermer le menu avec la touche Échap
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }


    const elements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        elements.forEach(element => observer.observe(element));
    } else {
        elements.forEach(element => {
            element.classList.add("visible");
        });
    }
});
