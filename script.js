/* Sprint 02 - Pertemuan 3 Web Programming
   PurrfectGroom: JavaScript + DOM + Event
   Task 01: Select & Change
   Task 02: Handle User Event
   Task 03: Build One Complete Interaction
*/

document.addEventListener("DOMContentLoaded", function () {
    initTask01();
    initTask02();
    initTask03();
});

/* =========================================================
   TASK 01 - SELECT & CHANGE
   Mengambil elemen dengan selector, lalu mengubah isinya.
   ========================================================= */

function initTask01() {
    // Selector ID
    var judul = document.querySelector("#judul");

    // Selector Class
    var tombolReservasi = document.querySelector(".btn-pink");

    // Selector Tag
    var semuaFooter = document.querySelectorAll("footer p");

    if (judul) {
        judul.textContent = "Waktunya Manjakan Kucing Kesayangan Anda Sekarang!";
    }

    if (tombolReservasi) {
        // Mengubah atribut
        tombolReservasi.setAttribute("data-dari-js", "true");
        // Menambah class
        tombolReservasi.classList.add("js-active");
    }

    // Mengubah isi HTML pada elemen
    var ringkasan = document.querySelector("#ringkasan-reservasi");
    if (ringkasan) {
        ringkasan.innerHTML =
            "Kilmau diaktifkan JavaScript. Pilih tanggal dan tipe perawatan, lalu tekan tombol reservasi.";
    }

    // Mengubah gaya langsung
    var lencana = document.querySelector(".hero-tag");
    if (lencana) {
        lencana.style.color = "#9d174d";
        lencana.style.backgroundColor = "#fdf2f8";
        lencana.style.border = "1px solid #fbcfe8";
        lencana.style.borderRadius = "8px";
        lencana.style.padding = "4px 10px";
    }

    // Loop pada banyak elemen
    semuaFooter.forEach(function (paragraf) {
        paragraf.style.color = "#64748b";
    });
}

/* =========================================================
   TASK 02 - HANDLE USER EVENT
   Menangkap aksi pengguna: click, input, submit.
   ========================================================= */

// Toast sederhana untuk memberitahu aksi berhasil
var toastContainer = null;

function buatToastContainer() {
    if (toastContainer) {
        return toastContainer;
    }
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-stack";
    document.body.appendChild(toastContainer);
    return toastContainer;
}

function tampilkanToast(pesan, tipe) {
    var container = buatToastContainer();
    var toast = document.createElement("div");
    toast.className = tipe === "error" ? "toast error" : "toast";
    toast.textContent = pesan;
    container.appendChild(toast);

    window.setTimeout(function () {
        toast.remove();
    }, 3200);
}

function initTask02() {
    /* --- EVENT: input (pencarian paket) --- */
    var cariPaket = document.querySelector("#cari-paket");
    var kartuPaket = document.querySelectorAll("#daftar-paket .service-card");
    var hasilCari = document.querySelector("#hasil-cari");

    if (cariPaket && kartuPaket.length > 0) {
        cariPaket.addEventListener("input", function () {
            var kataKunci = cariPaket.value.trim().toLowerCase();
            var jumlahKetemu = 0;

            kartuPaket.forEach(function (kartu) {
                var isiKartu = kartu.textContent.toLowerCase();
                var cocok = isiKartu.indexOf(kataKunci) !== -1;

                kartu.style.display = cocok ? "" : "none";
                if (cocok) {
                    jumlahKetemu += 1;
                }
            });

            if (hasilCari) {
                if (kataKunci !== "" && jumlahKetemu === 0) {
                    hasilCari.textContent =
                        'Paket "' + cariPaket.value.trim() + '" tidak ditemukan.';
                    hasilCari.hidden = false;
                } else {
                    hasilCari.hidden = true;
                }
            }

            if (kataKunci !== "") {
                tampilkanToast(
                    jumlahKetemu + " paket ditemukan untuk \"" + cariPaket.value.trim() + '".'
                );
            }
        });
    }

    /* --- EVENT: input + change (ringkasan reservasi) --- */
    var inputTanggal = document.querySelector('input[type="date"]');
    var inputTipe = document.querySelector("select.input-field");
    var ringkasanReservasi = document.querySelector("#ringkasan-reservasi");
    var tombolReservasi = document.querySelector("#btn-reservasi");

    function perbaruiRingkasan() {
        if (!ringkasanReservasi) {
            return;
        }

        var tanggal = inputTanggal ? inputTanggal.value : "";
        var tipe = inputTipe ? inputTipe.value : "";

        if (!tanggal && !tipe) {
            ringkasanReservasi.textContent =
                "Pilih tanggal dan tipe perawatan untuk melihat ringkasan.";
            return;
        }

        var tanggalFormat = tanggal
            ? new Date(tanggal + "T00:00:00").toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
              })
            : "belum dipilih";

        ringkasanReservasi.textContent =
            "Ringkasan: " + tanggalFormat + " • " + (tipe || "tipe belum dipilih") + ".";
    }

    if (inputTanggal) {
        inputTanggal.addEventListener("input", perbaruiRingkasan);
    }
    if (inputTipe) {
        inputTipe.addEventListener("change", perbaruiRingkasan);
    }

    /* --- EVENT: click (tombol reservasi) --- */
    if (tombolReservasi) {
        tombolReservasi.addEventListener("click", function () {
            if (!inputTanggal || !inputTanggal.value) {
                tampilkanToast("Pilih tanggal grooming terlebih dahulu.", "error");
                if (inputTanggal) {
                    inputTanggal.focus();
                }
                return;
            }
            if (!inputTipe || !inputTipe.value) {
                tampilkanToast("Pilih tipe perawatan terlebih dahulu.", "error");
                if (inputTipe) {
                    inputTipe.focus();
                }
                return;
            }
            tampilkanToast(
                "Reservasi untuk " +
                    inputTanggal.value +
                    " (" +
                    inputTipe.options[inputTipe.selectedIndex].text +
                    ") tersimpan."
            );
        });
    }

    /* --- EVENT: click (rating bintang) --- */
    var ratingPicker = document.querySelector("#rating-picker");
    var ratingLabel = document.querySelector("#rating-label");

    if (ratingPicker) {
        var bintang = ratingPicker.querySelectorAll(".star");
        bintang.forEach(function (bintangItem, indeks) {
            bintangItem.addEventListener("click", function () {
                bintang.forEach(function (item, posisi) {
                    if (posisi <= indeks) {
                        item.classList.add("active");
                    } else {
                        item.classList.remove("active");
                    }
                });

                if (ratingLabel) {
                    ratingLabel.textContent = "Rating: " + (indeks + 1) + " dari 5 bintang";
                    ratingLabel.hidden = false;
                }
            });
        });
    }

    /* --- EVENT: submit (form ulasan) --- */
    var formUlasan = document.querySelector("#form-ulasan");

    if (formUlasan) {
        formUlasan.addEventListener("submit", function (event) {
            event.preventDefault();

            var nama = formUlasan.querySelector('input[placeholder*="Sarah"]');
            var ulasan = formUlasan.querySelector("textarea");
            var nilaiNama = nama ? nama.value.trim() : "";
            var nilaiUlasan = ulasan ? ulasan.value.trim() : "";

            if (nilaiNama === "" || nilaiUlasan === "") {
                tampilkanToast("Nama dan ulasan tidak boleh kosong.", "error");
                return;
            }

            tampilkanToast("Terima kasih, " + nilaiNama + "! Ulasan Anda tersimpan.");
            formUlasan.reset();
            if (ratingLabel) {
                ratingLabel.hidden = true;
            }
            bintang.forEach(function (item) {
                item.classList.remove("active");
            });
        });
    }

    /* --- EVENT: click (navigasi aktif) --- */
    var navLink = document.querySelectorAll(".nav-link");

    navLink.forEach(function (link) {
        link.addEventListener("click", function () {
            navLink.forEach(function (item) {
                item.classList.remove("active");
            });
            link.classList.add("active");
        });
    });
}

/* =========================================================
   TASK 03 - BUILD ONE COMPLETE INTERACTION
   Satu alur penuh: pilih paket -> panel detail -> isi form
   booking -> pesan sukses. Alur lain di halaman tetap normal.
   ========================================================= */

function initTask03() {
    var tombolPilih = document.querySelectorAll(".btn-pilih-paket");

    if (tombolPilih.length === 0) {
        return;
    }

    var overlay = document.createElement("div");
    overlay.className = "package-overlay";
    overlay.hidden = true;
    overlay.innerHTML = [
        '<div class="package-panel" role="dialog" aria-modal="true" aria-labelledby="judul-paket">',
        '  <div class="package-header">',
        '    <div>',
        '      <div class="package-eyebrow">Detail Paket</div>',
        '      <h3 class="package-title" id="judul-paket"></h3>',
        '    </div>',
        '    <button type="button" class="package-close" aria-label="Tutup detail paket">&times;</button>',
        "  </div>",
        '  <div class="package-body">',
        '    <div class="package-meta">',
        '      <span class="package-time"></span>',
        '      <span class="package-price"></span>',
        "    </div>",
        '    <ul class="package-features"></ul>',
        '    <div class="package-success" hidden></div>',
        '    <h4 class="package-form-title">Form Booking</h4>',
        '    <form class="package-form">',
        '      <div class="form-group">',
        '        <label class="form-label" for="booking-nama">Nama Lengkap</label>',
        '        <input type="text" class="form-control" id="booking-nama" placeholder="Contoh: Sarah Amanda" />',
        "      </div>",
        '      <div class="form-group">',
        '        <label class="form-label" for="booking-kucing">Nama Kucing</label>',
        '        <input type="text" class="form-control" id="booking-kucing" placeholder="Contoh: Milo" />',
        "      </div>",
        '      <div class="form-group">',
        '        <label class="form-label" for="booking-tanggal">Tanggal Grooming</label>',
        '        <input type="date" class="form-control" id="booking-tanggal" />',
        "      </div>",
        '      <button type="submit" class="btn btn-pink" style="width: 100%">Konfirmasi Booking</button>',
        "    </form>",
        "  </div>",
        "</div>",
    ].join("\n");
    document.body.appendChild(overlay);

    var panel = overlay.querySelector(".package-panel");
    var judulPaket = overlay.querySelector("#judul-paket");
    var waktuPaket = overlay.querySelector(".package-time");
    var hargaPaket = overlay.querySelector(".package-price");
    var daftarFitur = overlay.querySelector(".package-features");
    var pesanSukses = overlay.querySelector(".package-success");
    var tombolTutup = overlay.querySelector(".package-close");
    var formBooking = overlay.querySelector(".package-form");
    var inputBookingNama = overlay.querySelector("#booking-nama");
    var inputBookingKucing = overlay.querySelector("#booking-kucing");
    var inputBookingTanggal = overlay.querySelector("#booking-tanggal");

    var namaPaketTerpilih = "";

    function tutupPanel() {
        overlay.hidden = true;
        pesanSukses.hidden = true;
        pesanSukses.textContent = "";
        formBooking.reset();
    }

    /* EVENT: click tombol "Pilih Paket" -> DOM berubah */
    tombolPilih.forEach(function (tombol) {
        tombol.addEventListener("click", function () {
            var kartu = tombol.closest(".service-card");

            namaPaketTerpilih = "";
            if (kartu) {
                var elemenNama = kartu.querySelector(".service-name");
                var elemenWaktu = kartu.querySelector(".service-time");
                var elemenHarga = kartu.querySelector(".service-price");

                if (elemenNama) {
                    namaPaketTerpilih = elemenNama.textContent.trim();
                }

                judulPaket.textContent = namaPaketTerpilih;
                waktuPaket.textContent = elemenWaktu ? elemenWaktu.textContent.trim() : "";
                hargaPaket.textContent = elemenHarga ? elemenHarga.textContent.trim() : "";

                daftarFitur.innerHTML = "";
                var fitur = kartu.querySelectorAll(".feature-item");
                fitur.forEach(function (item) {
                    var li = document.createElement("li");
                    li.textContent = item.textContent.trim();
                    daftarFitur.appendChild(li);
                });

                // Menandai paket yang dipilih
                document.querySelectorAll(".service-card.is-dipilih").forEach(function (item) {
                    item.classList.remove("is-dipilih");
                });
                kartu.classList.add("is-dipilih");
            }

            pesanSukses.hidden = true;
            pesanSukses.textContent = "";
            overlay.hidden = false;
            inputBookingNama.focus();
        });
    });

    /* EVENT: click tombol tutup */
    tombolTutup.addEventListener("click", tutupPanel);

    /* EVENT: click area gelap di luar panel */
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            tutupPanel();
        }
    });

    /* EVENT: keydown (tutup dengan tombol Escape) */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !overlay.hidden) {
            tutupPanel();
        }
    });

    /* EVENT: submit form booking -> pesan sukses */
    formBooking.addEventListener("submit", function (event) {
        event.preventDefault();

        var nama = inputBookingNama.value.trim();
        var kucing = inputBookingKucing.value.trim();
        var tanggal = inputBookingTanggal.value;

        if (nama === "" || kucing === "" || tanggal === "") {
            pesanSukses.hidden = false;
            pesanSukses.style.backgroundColor = "#fdf2f8";
            pesanSukses.style.borderColor = "#f43f8e";
            pesanSukses.style.color = "#9d174d";
            pesanSukses.textContent = "Lengkapi nama, nama kucing, dan tanggal terlebih dahulu.";
            return;
        }

        pesanSukses.style.backgroundColor = "#ecfdf5";
        pesanSukses.style.borderColor = "#10b981";
        pesanSukses.style.color = "#065f46";
        pesanSukses.textContent =
            "Booking " +
            namaPaketTerpilih +
            " untuk " +
            kucing +
            " pada " +
            tanggal +
            " berhasil dikonfirmasi.";
        pesanSukses.hidden = false;

        tampilkanToast("Booking " + namaPaketTerpilih + " terkonfirmasi.");
        formBooking.reset();
    });
}
