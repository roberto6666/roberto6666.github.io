
/* CODICE PER CAMBIARE VIDEO NELLA HERO SECTION in base alla larghezza della viewport (desktop e mobile devices) */
function updateVideo() {
    let video = document.getElementById('hero-video');
    let videoSource = document.getElementById('video-source');
    let screenWidth = window.innerWidth;

	if (!!video) {
		if (screenWidth < 768) {
			videoSource.src = "Assets/images/Landing page/Video-mobile.mov"; // Video verticale
		} else {
			videoSource.src = "Assets/images/Landing page/Video-desktop.mov"; // Video orizzontale
		}

		video.load(); // Ricarica il nuovo video
	}
}

updateVideo();
window.addEventListener('resize', updateVideo);





/* PLUGIN SWIPER PROGETTI */
var swiper = new Swiper(".mySwiper", { /* creata un'istanza di Swiper collegata al div con classe "mySwiper" (contenitore del carosello) */
    spaceBetween: 25, /* per impostare lo spazio tra le copertine */ 
    pagination: {
      el: ".swiper-pagination", /* selettore dei pallini dello slider */ 
      clickable: true, /* aggiunta del parametro per poter cliccare i pallini dello slider */ 
    },

    /* Per definire il comportamento del carosello in base alla larghezza dello schermo */ 
    breakpoints: {
        0: { /* per schermi >=0px */ 
            slidesPerView: 1, /* visualizza 1 copertina */ 
        },
        768: { /* per schermi >=768px */ 
            slidesPerView: 3, /* visualizza 3 copertine in versione desktop */
        },
        1024: { /* per schermi >=1024px (desktop) */ 
            slidesPerView: 3, /* visualizza 3 copertine in versione desktop */
        }
    }
});






/* INIZIALIZZAZIONE DELLO AOS (Plugin che permette di gestire l'animation on scroll) */
AOS.init({
    // Impostazioni che possono essere sovrascritte a livello di singolo elemento tramite gli attributi ⁠ data-aos-* ⁠:
    offset: 120, // distanza (in px) dal punto di attivazione originale
    delay: 0, // valori da 0 a 3000, con incrementi di 50ms
    duration: 900, // valori da 0 a 3000, con incrementi di 50ms
    easing: 'ease', // effetto di transizione predefinito per le animazioni AOS
    once: false, // determina se l'animazione deve avvenire solo una volta mentre si scorre verso il basso
    mirror: false, // determina se gli elementi devono animarsi di nuovo quando vengono superati scorrendo all'indietro
    anchorPlacement: 'top-bottom', // definisce quale posizione dell'elemento rispetto alla finestra deve attivare l'animazione
});







/* CODICE CSS PER INGRANDIRE LE FOTO NELLA GALLERIA IMMAGINI (finestra modale) */
// Selezione di tutte le immagini
const images = document.querySelectorAll('.modal-img');

// Selezione della finestra modale e dei suoi elementi
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeButton = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0; // Indice dell'immagine attuale

// Funzione per aprire la modale con l'immagine selezionata
function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modal.classList.add('active');
    updateNavigation(); // Controlla visibilità delle frecce
}

// Evento di click su ogni immagine per aprire la modale
images.forEach((image, index) => {
    image.addEventListener('click', () => openModal(index));
});

// Funzione per chiudere la modale
function closeModal() {
    modal.classList.remove('active');
}

// FUNZIONE PER NAVIGARE TRA LE IMMAGINI CON LA MODALE APERTA MEDIANTE FRECCE
function changeImage(step) {
    currentIndex += step;

    // Se supera il numero di immagini, torna all'inizio o alla fine
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    modalImg.src = images[currentIndex].src;
    updateNavigation(); // Controlla visibilità delle frecce
}

// Funzione per aggiornare la visibilità delle frecce
function updateNavigation() {
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex === images.length - 1 ? 'none' : 'block';
}

// Eventi per chiudere la modale
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

// Eventi sulla tastiera (freccia sinistra/destra e ESC per chiudere)
document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// Eventi per cambiare immagine con i pulsanti
prevButton.addEventListener('click', () => changeImage(-1));
nextButton.addEventListener('click', () => changeImage(1));









/* CODICE PER SCORRERE TRA LE PAGINE DEI PROGETTI CON LE FRECCE */
// Array di URL dei progetti (cambia questi URL con i tuoi progetti)
const projectPages = [
    "progetto1.html",
    "progetto2.html",
    "progetto3.html",
    // Aggiungi tutti gli URL dei tuoi progetti qui
];

let currentProjectIndex = 0;  // Indice iniziale (pagina corrente)

// Funzione per navigare tra i progetti
function navigateProject(direction) {
    // Calcola il nuovo indice
    currentProjectIndex += direction;

    // Se arrivi alla fine o all'inizio, resetta l'indice
    if (currentProjectIndex < 0) {
        currentProjectIndex = projectPages.length - 1;
    } else if (currentProjectIndex >= projectPages.length) {
        currentProjectIndex = 0;
    }

    // Redirigi alla pagina successiva o precedente
    window.location.href = projectPages[currentProjectIndex];

    // Dopo il cambio di pagina, aggiorna la visibilità delle frecce
    updateArrowVisibility();
}

// Funzione per aggiornare la visibilità delle frecce
function updateArrowVisibility() {
    // Nasconde la freccia sinistra se siamo sul primo progetto
    const prevArrow = document.querySelector('.prev-project');
    const nextArrow = document.querySelector('.next-project');

    // Nasconde la freccia sinistra se siamo sul primo progetto
    if (currentProjectIndex === 0) {
        prevArrow.style.display = 'none';
    } else {
        prevArrow.style.display = 'block';
    }

    // Nasconde la freccia destra se siamo sull'ultimo progetto
    if (currentProjectIndex === projectPages.length - 1) {
        nextArrow.style.display = 'none';
    } else {
        nextArrow.style.display = 'block';
    }
}

// Esegui subito il controllo della visibilità delle frecce quando la pagina viene caricata
updateArrowVisibility();





/* CODICE PER Il reCAPTCHA per il form */
// Il token viene poi inserito nel campo nascosto 'recaptchaResponse' per essere inviato con il form.
// Attende che la pagina sia completamente caricata, poi esegue reCAPTCHA per ottenere un token di verifica.
// Il token viene poi inserito nel campo nascosto 'recaptchaResponse' per essere inviato con il form.
document.addEventListener("DOMContentLoaded", function () {
    grecaptcha.ready(function () {
        grecaptcha.execute("IL_TUO_SITE_KEY", { action: "submit" }).then(function (token) {
            let recaptchaField = document.getElementById("recaptchaResponse");
            if (recaptchaField) {
                recaptchaField.value = token;
            }
        });
    });
});
