/* =========================================================
   DR. MEOW JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        const isHidden = mobileMenu.classList.contains("hidden");

        mobileMenu.classList.toggle("hidden");
        menuButton.setAttribute("aria-expanded", String(isHidden));

    });


    /* Tutup menu ketika link diklik */

    mobileMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.add("hidden");
            menuButton.setAttribute("aria-expanded", "false");

        });

    });

}


/* =========================================================
   NAVBAR - PILL YANG MELUNCUR (DESKTOP)

   #navIndicator (span di dalam #mainNav) adalah background
   rounded yang mengikuti kursor:

   - mouseenter link  → pill dipindah ke posisi & lebar link
   - click link       → status is-active berpindah, pill
                        diukur ulang (lebar teks bisa berubah)
   - mouseleave nav   → pill menghilang

   Posisi dihitung dari offsetLeft/offsetWidth link, jadi
   selalu cocok tanpa perlu event resize.
   ========================================================= */

const mainNav = document.getElementById("mainNav");
const navIndicator = document.getElementById("navIndicator");

if (mainNav && navIndicator) {

    const navLinks = mainNav.querySelectorAll(".dm-nav-link");

    let activeLink = mainNav.querySelector(".dm-nav-link.is-active");


    function moveIndicator(link) {

        navIndicator.style.left = link.offsetLeft + "px";
        navIndicator.style.width = link.offsetWidth + "px";
        navIndicator.style.opacity = "1";

    }


    navLinks.forEach((link) => {

        link.addEventListener("mouseenter", () => moveIndicator(link));


        link.addEventListener("click", () => {

            if (activeLink) {
                activeLink.classList.remove("is-active");
            }

            link.classList.add("is-active");
            activeLink = link;

            /* Ukur ulang setelah class is-active dipasang
               karena berat teks (font-weight) bisa berubah */
            moveIndicator(link);

        });

    });


    mainNav.addEventListener("mouseleave", () => {

        navIndicator.style.opacity = "0";

    });

}


/* =========================================================
   BOOKING MODAL
   ========================================================= */

const bookingModal = document.getElementById("bookingModal");
const closeBooking = document.getElementById("closeBooking");
const bookingButtons = document.querySelectorAll("[data-open-booking]");


/* Buka modal */

bookingButtons.forEach((button) => {

    button.addEventListener("click", () => {

        bookingModal.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");

    });

});


/* Tutup modal */

if (closeBooking) {

    closeBooking.addEventListener("click", closeBookingModal);

}


/* Klik background modal */

if (bookingModal) {

    bookingModal.addEventListener("click", (event) => {

        if (event.target === bookingModal) {
            closeBookingModal();
        }

    });

}


/* ESC untuk menutup */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && !bookingModal.classList.contains("hidden")) {
        closeBookingModal();
    }

});


function closeBookingModal() {

    bookingModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");

}


/* =========================================================
   METODE KEDATANGAN

   Event "change" hanya menyala untuk radio yang baru
   dicentang, jadi radio.checked selalu true di sini.
   ========================================================= */

const arrivalMethods = document.querySelectorAll('input[name="arrivalMethod"]');
const pickupAddressContainer = document.getElementById("pickupAddressContainer");
const pickupAddress = document.getElementById("pickupAddress");

arrivalMethods.forEach((radio) => {

    radio.addEventListener("change", () => {

        const usesPickup = radio.value === "Antar-Jemput";

        pickupAddressContainer.classList.toggle("hidden", !usesPickup);

        if (usesPickup) {
            pickupAddress.setAttribute("required", "required");
        } else {
            pickupAddress.removeAttribute("required");
            pickupAddress.value = "";
        }

    });

});


/* =========================================================
   BOOKING FORM
   ========================================================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const submitLabel = submitButton.textContent;

    bookingForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const payload = Object.fromEntries(new FormData(bookingForm));


        /* LOADING */

        submitButton.disabled = true;
        submitButton.textContent = "Mengirim...";


        try {

            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const body = await res.json();

            if (!res.ok || !body.success) {
                throw new Error(body.error || "HTTP " + res.status);
            }


            /* SUKSES */

            alert("Reservasi berhasil dikirim!\n\nID: " + body.data.id);

            closeBookingModal();
            bookingForm.reset();

            pickupAddressContainer.classList.add("hidden");
            pickupAddress.removeAttribute("required");

        } catch (err) {

            /* ERROR — modal tetap terbuka agar bisa dicoba ulang */

            console.error("Gagal mengirim reservasi:", err);
            alert("Gagal mengirim reservasi:\n" + err.message);

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = submitLabel;

        }

    });

}


/* =========================================================
   CHAT
   ========================================================= */

const chatButton = document.getElementById("chatButton");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");


/* Buka / tutup chat */

if (chatButton && chatPanel) {
    chatButton.addEventListener("click", () => chatPanel.classList.toggle("hidden"));
}

if (closeChat) {
    closeChat.addEventListener("click", () => chatPanel.classList.add("hidden"));
}


/* =========================================================
   SEND CHAT
   ========================================================= */

function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }


    /* Pesan user */

    const userMessage = document.createElement("div");
    userMessage.className = "mt-3 ml-8 p-3 rounded-2xl bg-sky-400 text-white text-sm";
    userMessage.textContent = message;

    chatMessages.appendChild(userMessage);
    chatInput.value = "";


    /* Dummy response */

    setTimeout(() => {

        const response = document.createElement("div");
        response.className = "mt-3 mr-8 p-3 rounded-2xl bg-white border border-sky-100 text-slate-600 text-sm";
        response.textContent = "Terima kasih! Pesan Anda diterima. Admin Dr. Meow akan membantu Anda. 🐱";

        chatMessages.appendChild(response);

    }, 700);

}


if (sendChat) {
    sendChat.addEventListener("click", sendMessage);
}

if (chatInput) {

    chatInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }

    });

}


/* =========================================================
   SET MINIMUM BOOKING DATE
   ========================================================= */

const bookingDate = document.getElementById("bookingDate");

if (bookingDate) {

    const today = new Date().toISOString().split("T")[0];

    bookingDate.setAttribute("min", today);

}


/* =========================================================
   NAVBAR SHADOW WHEN SCROLLING
   ========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    navbar.classList.toggle("shadow-sm", window.scrollY > 20);

});


/* =========================================================
   LOAD PRICES FROM API

   GET /api/services → mengisi harga pada kartu layanan
   dan tabel harga. State: loading → sukses / error.
   ========================================================= */

const priceElements = document.querySelectorAll("[data-service]");

async function loadPrices() {

    priceElements.forEach((el) => {

        el.textContent = "Memuat…";
        el.classList.add("animate-pulse");

    });

    try {

        const res = await fetch("/api/services");

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        const body = await res.json();

        if (!body.success) {
            throw new Error(body.error || "Respons tidak valid");
        }

        const priceById = {};

        body.data.forEach((service) => {
            priceById[service.id] = service.price;
        });


        priceElements.forEach((el) => {

            const price = priceById[el.dataset.service];

            el.classList.remove("animate-pulse");

            el.textContent = (el.dataset.prefix || "") +
                (price == null ? "—" : "Rp" + price.toLocaleString("id-ID"));

        });

    } catch (err) {

        console.error("Gagal memuat harga:", err);

        priceElements.forEach((el) => {

            el.classList.remove("animate-pulse");
            el.textContent = "Harga tidak tersedia";

        });

    }

}

loadPrices();
