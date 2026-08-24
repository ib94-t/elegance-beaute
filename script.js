/* =========================================================
   ÉLÉGANCE BEAUTÉ — SCRIPT.JS
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("active");

    });


    /* Fermer le menu après avoir cliqué sur un lien */

    const navigationLinks =
        navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

        });

    });

}


/* =========================================================
   FERMER LE MENU EN CLIQUANT AILLEURS
========================================================= */

document.addEventListener("click", (event) => {

    if (!menuButton || !navigation) {
        return;
    }

    const clickedInsideMenu =
        navigation.contains(event.target);

    const clickedButton =
        menuButton.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedButton
    ) {

        navigation.classList.remove("active");

    }

});


/* =========================================================
   ANIMATION DES CARTES PRODUITS
========================================================= */

const productCards =
    document.querySelectorAll(".product-card");


if (productCards.length > 0) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    productCards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(25px)";

        card.style.transition =
            `opacity 0.6s ease ${index * 0.08}s,
             transform 0.6s ease ${index * 0.08}s`;

        observer.observe(card);

    });

}


/* =========================================================
   APPARITION DES SECTIONS
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".about-content, .request-card, .contact-card"
    );


if (animatedElements.length > 0) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        sectionObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        sectionObserver.observe(element);

    });

}


/* =========================================================
   HEADER AU SCROLL
========================================================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 25px rgba(80, 40, 50, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =========================================================
   LIENS ANCRES — SCROLL DOUX
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   MESSAGE DE CONFIRMATION POUR LES COMMANDES
========================================================= */

const orderLinks =
    document.querySelectorAll(
        '.product-footer a, .request-button, .whatsapp-button'
    );


orderLinks.forEach((link) => {

    link.addEventListener("click", () => {

        console.log(
            "Redirection vers WhatsApp..."
        );

    });

});


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "✨ Élégance Beauté — site chargé avec succès."
);