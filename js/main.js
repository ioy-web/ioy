// Фотоистории Нади: ссылки и подписи добавляются в этот массив.
const photos = [
  {
    src: "https://sun9-7.vkuserphoto.ru/s/v1/ig2/-n4Wa9jV2ue9HYQJgcOfECSblHbh-k3UlrEkZKNKoNEMSEcV_heQQwDVEmj8miQ7mJH8VLFM7rAdWiNCQvYj4SeF.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,2560x1707&from=bu&u=oq0FJf1cBZrdeV7i5pbkRK4Kjn4WRSBl-0nu2Dx8_Es&cs=1280x0",
    event: "ЗАТОЧКА",
    place: "ТУЛА · 03/10/2026",
    kind: "концерт",
    position: "center 45%",
    album: "albums/zatochka.html",
  },
  {
    src: "https://sun9-71.vkuserphoto.ru/s/v1/ig2/Cgm1c8FIAxwntgbLiW1cKuE68nq8GLAptsG-HkJkRtSDjyM2fR-Z9h1L1YPoHaLErvUjrbv6j1S0oRl8GTE1vHfc.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&cs=1280x0",
    event: "Lida",
    place: "ТУЛА · 26/07/2026",
    kind: "концерт",
    position: "center 46%",
    album: "albums/lida.html",
  },
  {
    src: "https://sun9-38.vkuserphoto.ru/s/v1/ig2/zhH1wJ8vj1qwBPW5-np9MEVE6xFFcyLF-X0NsIzA0rB2zMgoh49vQ6y_m_PzExfq-P-nAuoeSANpvaiy8MS_-miJ.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x426,720x480,1080x720,1280x853,1440x960,2560x1706&from=bu&cs=1280x0",
    event: "фестиваль красок",
    place: "ТУЛА · 07/06/26",
    kind: "фестиваль красок",
    position: "center 50%",
    album: "albums/kraski.html",
  },
  {
    src: "https://sun9-54.vkuserphoto.ru/s/v1/ig2/3U1DbhMUsaFbdD_ukiTFSk-YSl6SfFqh6mXyi_Rn_eKjTw8TUPkUJ_9_o_mEPbLJxUYqu-6wnikFAJLty0vyDtL0.jpg?quality=95&as=32x20,48x30,72x45,108x68,160x100,240x150,360x225,480x301,540x338,640x401,720x451,1080x676,1280x801,1440x902,2560x1603&from=bu&u=CEmIaaHwLVmu2tg5RDPh88VxzzcczxrxdflLzVsdixw&cs=1280x0",
    event: "ssshhhiiittt!!!",
    place: "МОСКВА · 24/05/2026",
    kind: "концерт",
    position: "center 50%",
    album: "albums/ssshhhiiittt.html",
  },

  {
    src: "https://sun9-84.vkuserphoto.ru/s/v1/ig2/W5mzpbJ8EL2viX3_O6h34r-FUi5TuYZa9B0D9xxTKSerNytwQi_ic4CKQKC0C0veEvyazU6DBA5-cjC8J6gDb2MF.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&cs=1280x0",
    event: "ЗоХа",
    place: "МОСКВА · 23/01/2026",
    kind: "концерт",
    position: "center 50%",
    album: "albums/zoxa.html",
  },
  {
    src: "https://sun9-62.vkuserphoto.ru/s/v1/ig2/yhdViZN8wuhCRf8mMNSjYpRTohixXGcIqbBxBC4_BjKg3WxmMMR1I8NdM2rfGlm3Uk7hUbUczqngY4Nyhz-S2vGs.jpg?quality=95&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,1080x1621,1280x1921,1440x2161,1706x2560&from=bu&u=q-LNJmdvbBa7f_hLJK-EWVUW4DjO7zuIrmS2NPm6shU&cs=1280x0",
    event: "нежная любовь",
    place: "",
    kind: "история для двоих",
    position: "center 50%",
    album: "albums/love.html",
  },
];

const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const caption = lightbox.querySelector(".lightbox-caption");
const indexLabel = lightbox.querySelector(".lightbox-index");
let activeIndex = 0;
let previouslyFocused = null;

photos.forEach((photo, index) => {
  const card = document.createElement(photo.album ? "a" : "button");
  card.className = "gallery-item reveal";
  if (photo.album) {
    card.href = photo.album;
    card.setAttribute("aria-label", `Открыть фотоальбом: ${photo.event}`);
  } else {
    card.type = "button";
    card.setAttribute(
      "aria-label",
      `Открыть фотографию: ${photo.event}, ${photo.place}`,
    );
    card.addEventListener("click", () => openLightbox(index));
  }
  card.innerHTML = `<img src="${photo.src}" alt="${photo.alt || `Фотография: ${photo.event}${photo.place ? `, ${photo.place}` : ""}`}" loading="lazy" style="object-position:${photo.position || "center"}"><span class="item-kind">${photo.kind || "фотоистория"}</span><span class="item-label"><strong>${photo.event}</strong><small>${photo.place || ""}</small></span>`;
  gallery.append(card);
});
function showPhoto(index) {
  activeIndex = (index + photos.length) % photos.length;
  const photo = photos[activeIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt || `Фотография: ${photo.event}`;
  caption.textContent = [photo.event, photo.place].filter(Boolean).join(" · ");
  indexLabel.textContent = `${activeIndex + 1} из ${photos.length}`;
}
function openLightbox(index) {
  previouslyFocused = document.activeElement;
  showPhoto(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lightbox-close").focus();
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  previouslyFocused?.focus();
}
function nextPhoto(direction) {
  showPhoto(activeIndex + direction);
}
lightbox
  .querySelector(".lightbox-close")
  .addEventListener("click", closeLightbox);
lightbox
  .querySelector(".lightbox-prev")
  .addEventListener("click", () => nextPhoto(-1));
lightbox
  .querySelector(".lightbox-next")
  .addEventListener("click", () => nextPhoto(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") nextPhoto(1);
  if (event.key === "ArrowLeft") nextPhoto(-1);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

// Swipe navigation for touch screens.
let touchStartX = 0;
lightbox.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);
lightbox.addEventListener(
  "touchend",
  (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 55) nextPhoto(delta < 0 ? 1 : -1);
  },
  { passive: true },
);
