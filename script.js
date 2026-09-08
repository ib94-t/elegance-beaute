/* =========================================================
   ÉLÉGANCE BEAUTÉ — SCRIPT.JS
   ========================================================= */


/* =========================================================
   MENU MOBILE
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (nav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Fermer le menu après avoir cliqué sur un lien */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   PANIER
   ========================================================= */

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

const cartItemsContainer = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutWhatsApp = document.getElementById("checkoutWhatsApp");
const clearCartButton = document.getElementById("clearCart");

const continueShoppingButton =
    document.getElementById("continueShopping");


/* =========================================================
   DONNÉES DES PRODUITS
   ========================================================= */

const products = {

    1: {
        id: 1,
        name: "Medicube Collagen Night Wrapping Mask",
        price: 6000,
        image: "images/produit1.jpeg"
    },

    2: {
        id: 2,
        name: "Garnier Vitamin C+ Sérum Éclat Anti-Taches",
        price: 13000,
        image: "images/produit2.jpeg"
    },

    3: {
        id: 3,
        name: "Nourishing Serum Snail",
        price: 2500,
        image: "images/produit3.jpeg"
    },

    4: {
        id: 4,
        name: "Medix Vitamin C + Turmeric Brighten + Firm Body Cream",
        price: 20000,
        image: "images/produit4.jpeg"
    },

    5: {
        id: 5,
        name: "La Roche-Posay Pure Vitamin C12 Serum",
        price: 25000,
        image: "images/produit5.jpeg"
    },

    6: {
        id: 6,
        name: "Mixa Crème Cica Réparation",
        price: 12000,
        image: "images/produit6.jpeg"
    },

   8: {
    id: 8,
    name: "ACM Azéane – Acide Azélaïque 15%",
    price: 20000,
    image: "images/produit8.jpeg"
},

9: {
    id: 9,
    name: "Anua Niacinamide 10 + TXA 4 Serum",
    price: 15000,
    image: "images/produit9.jpeg"
},

    10: {
        id: 10,
        name: "345 Relief Cream",
        price: 10000,
        image: "images/produit10.jpeg"
    },

    11: {
        id: 11,
        name: "Arencia Vitamin C Booster Shot",
        price: 10000,
        image: "images/produit11.jpeg"
    }
};


/* =========================================================
   CHARGER LE PANIER
   ========================================================= */

let cart = [];

try {

    const savedCart = localStorage.getItem("eleganceBeauteCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    console.log("Impossible de charger le panier.");

    cart = [];

}


/* =========================================================
   SAUVEGARDER LE PANIER
   ========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            "eleganceBeauteCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.log("Impossible de sauvegarder le panier.");

    }

}


/* =========================================================
   FORMATAGE DU PRIX
   ========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

}


/* =========================================================
   OUVRIR LE PANIER
   ========================================================= */

function openCart() {

    if (!cartDrawer || !cartOverlay) {
        return;
    }

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   FERMER LE PANIER
   ========================================================= */

function closeCart() {

    if (!cartDrawer || !cartOverlay) {
        return;
    }

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   ÉVÉNEMENTS OUVERTURE / FERMETURE
   ========================================================= */

if (openCartButton) {

    openCartButton.addEventListener("click", openCart);

}


if (closeCartButton) {

    closeCartButton.addEventListener("click", closeCart);

}


if (cartOverlay) {

    cartOverlay.addEventListener("click", closeCart);

}


if (continueShoppingButton) {

    continueShoppingButton.addEventListener("click", () => {

        closeCart();

        const productsSection =
            document.getElementById("produits");

        if (productsSection) {

            productsSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* =========================================================
   AJOUTER AU PANIER
   ========================================================= */

function addToCart(productId) {

    const product = products[productId];

    if (!product) {
        return;
    }


    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* =========================================================
   BOUTONS "AJOUTER"
   ========================================================= */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const productId = Number(
            button.dataset.id
        );

        addToCart(productId);

    });

});


/* =========================================================
   CHANGER LA QUANTITÉ
   ========================================================= */

function changeQuantity(productId, change) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== productId
        );

    }


    saveCart();

    updateCart();

}


/* =========================================================
   SUPPRIMER UN PRODUIT
   ========================================================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    updateCart();

}


/* =========================================================
   VIDER LE PANIER
   ========================================================= */

function clearCart() {

    if (cart.length === 0) {
        return;
    }


    const confirmation = confirm(
        "Voulez-vous vraiment vider votre panier ?"
    );


    if (!confirmation) {
        return;
    }


    cart = [];

    saveCart();

    updateCart();

}


/* =========================================================
   BOUTON VIDER
   ========================================================= */

if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        clearCart
    );

}


/* =========================================================
   CALCUL DU NOMBRE D'ARTICLES
   ========================================================= */

function getCartItemCount() {

    return cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

}


/* =========================================================
   CALCUL DU TOTAL
   ========================================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (item.price * item.quantity);

        },
        0
    );

}


/* =========================================================
   AFFICHER LE PANIER
   ========================================================= */

function renderCart() {

    if (!cartItemsContainer) {
        return;
    }


    cartItemsContainer.innerHTML = "";


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>


                <div class="cart-item-price">

                    ${formatPrice(item.price)}

                </div>


                <div class="cart-item-controls">


                    <div class="quantity-controls">

                        <button
                            type="button"
                            class="quantity-btn decrease"
                            data-id="${item.id}"
                            aria-label="Diminuer la quantité"
                        >
                            <i class="fa-solid fa-minus"></i>
                        </button>


                        <span class="quantity">

                            ${item.quantity}

                        </span>


                        <button
                            type="button"
                            class="quantity-btn increase"
                            data-id="${item.id}"
                            aria-label="Augmenter la quantité"
                        >
                            <i class="fa-solid fa-plus"></i>
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-item"
                        data-id="${item.id}"
                        aria-label="Supprimer ${item.name}"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>


                </div>

            </div>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    /* Boutons - */

    cartItemsContainer
        .querySelectorAll(".decrease")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        Number(button.dataset.id),
                        -1
                    );

                }
            );

        });


    /* Boutons + */

    cartItemsContainer
        .querySelectorAll(".increase")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        Number(button.dataset.id),
                        1
                    );

                }
            );

        });


    /* Boutons supprimer */

    cartItemsContainer
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        Number(button.dataset.id)
                    );

                }
            );

        });

}


/* =========================================================
   METTRE À JOUR LE PANIER
   ========================================================= */

function updateCart() {

    const itemCount = getCartItemCount();
    const total = getCartTotal();


    /* COMPTEUR */

    if (cartCount) {

        cartCount.textContent = itemCount;

    }


    /* TOTAL */

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(total);

    }


    /* PRODUITS */

    renderCart();


    /* PANIER VIDE / NON VIDE */

    if (cart.length === 0) {

        if (cartEmpty) {
            cartEmpty.classList.add("active");
        }

        if (cartFooter) {
            cartFooter.classList.remove("active");
        }

        if (cartItemsContainer) {
            cartItemsContainer.style.display = "none";
        }

    } else {

        if (cartEmpty) {
            cartEmpty.classList.remove("active");
        }

        if (cartFooter) {
            cartFooter.classList.add("active");
        }

        if (cartItemsContainer) {
            cartItemsContainer.style.display = "block";
        }

    }

}


/* =========================================================
   COMMANDE WHATSAPP
   ========================================================= */

function checkoutWhatsAppOrder() {

    if (cart.length === 0) {

        alert(
            "Votre panier est vide."
        );

        return;

    }


    let message =
        "Bonjour, je souhaite commander les produits suivants :%0A%0A";


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;


        message +=
            "• " +
            item.name +
            " x" +
            item.quantity +
            " — " +
            formatPrice(subtotal) +
            "%0A";

    });


    const total = getCartTotal();


    message +=
        "%0A" +
        "Total : " +
        formatPrice(total) +
        "%0A%0A";


    message +=
        "Merci de me confirmer la disponibilité et les modalités de livraison.";


    const whatsappNumber =
        "22390371793";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================================
   BOUTON CHECKOUT
   ========================================================= */

if (checkoutWhatsApp) {

    checkoutWhatsApp.addEventListener(
        "click",
        checkoutWhatsAppOrder
    );

}


/* =========================================================
   FERMER PANIER AVEC ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCart();

        }

    }
);


/* =========================================================
   SCROLL FLUIDE
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


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


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   ANIMATION DES CARTES
   ========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".product-card, .advantage-card, .about-content, .hero-text"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

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
                threshold: 0.12
            }
        );


    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);

    });

}


/* =========================================================
   OMBRE DU HEADER AU SCROLL
   ========================================================= */

const header =
    document.querySelector(".header");


function updateHeader() {

    if (!header) {
        return;
    }


    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 8px 30px rgba(80, 30, 50, 0.08)";

    } else {

        header.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    updateHeader
);


updateHeader();


/* =========================================================
   INITIALISATION
   ========================================================= */

updateCart();


console.log(
    "✨ Élégance Beauté — panier activé avec succès."
);