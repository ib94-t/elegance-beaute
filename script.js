// =====================================================
// MENU MOBILE
// =====================================================

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
});


// Fermer le menu après avoir cliqué sur un lien

const navigationLinks = document.querySelectorAll(".navigation a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {
        navigation.classList.remove("active");
    });

});


// =====================================================
// HEADER AU DÉFILEMENT
// =====================================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// =====================================================
// ANIMATION D'APPARITION
// =====================================================

const animatedElements = document.querySelectorAll(
    ".product-card, .advantage, .about-content, .about-images"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

animatedElements.forEach((element) => {
    element.classList.add("animate");
    observer.observe(element);
});


// =====================================================
// FERMER LE MENU AVEC LA TOUCHE ÉCHAP
// =====================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        navigation.classList.remove("active");
    }

});