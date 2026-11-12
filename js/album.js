const grid = document.querySelector("#album-grid");
const status = document.querySelector("#album-status");
const count = document.querySelector("#album-count");
const albumMain = document.querySelector(".album-main");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxIndex = lightbox.querySelector(".lightbox-index");
const albumTitle = albumMain.dataset.title || "Фотоальбом";
const albumPlace = albumMain.dataset.place || "";
const photosUrl = albumMain.dataset.photos;
const photos = [];
let activeIndex = 0;
let previousFocus = null;
let touchStartX = 0;

function largeImageUrl(url) {
  return url.replace(/([?&]cs=)\d+x\d*/, (_match, prefix) => `${prefix}1280x0`);
}

function renderAlbum(entries) {
  const validPhotos = entries.filter((photo) => photo && photo.url);
  photos.push(...validPhotos);
  count.textContent = `${photos.length} фотографий`;
  status.hidden = true;

  photos.forEach((photo, index) => {
    const card = document.createElement("button");
    const image = document.createElement("img");
    card.className = "album-photo reveal";
    card.type = "button";
    card.setAttribute("aria-label", `Открыть фотографию ${index + 1} из ${photos.length}`);
    image.src = photo.url;
    image.alt = photo.alt || `${albumTitle} — кадр ${index + 1}`;
    image.loading = "lazy";
    image.decoding = "async";
    card.append(image);
    card.addEventListener("click", () => openPhoto(index));
    grid.append(card);
    observer.observe(card);
  });
}

function showPhoto(index) {
  activeIndex = (index + photos.length) % photos.length;
  const photo = photos[activeIndex];
  lightboxImage.src = largeImageUrl(photo.url);
  lightboxImage.alt = photo.alt || `${albumTitle} — кадр ${activeIndex + 1}`;
  lightbox.querySelector(".lightbox-caption").textContent = [albumTitle, albumPlace].filter(Boolean).join(" · ");
  lightboxIndex.textContent = `${activeIndex + 1} из ${photos.length}`;
}

function openPhoto(index) {
  previousFocus = document.activeElement;
  showPhoto(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lightbox-close").focus();
}

function closePhoto() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  previousFocus?.focus();
}

function movePhoto(direction) {
  if (photos.length > 1) showPhoto(activeIndex + direction);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08 });

lightbox.querySelector(".lightbox-close").addEventListener("click", closePhoto);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => movePhoto(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => movePhoto(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closePhoto();
  if (event.key === "ArrowLeft") movePhoto(-1);
  if (event.key === "ArrowRight") movePhoto(1);
});
lightbox.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
lightbox.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 55) movePhoto(delta < 0 ? 1 : -1);
}, { passive: true });

fetch(photosUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(renderAlbum)
  .catch((error) => {
    console.error(`Не удалось загрузить фотоальбом «${albumTitle}»:`, error);
    count.textContent = "";
    status.hidden = false;
    status.textContent = "Не получилось загрузить фотографии. Откройте страницу через GitHub Pages или Live Server.";
    status.classList.add("album-error");
  });
