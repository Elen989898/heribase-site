const testimonials = [
  {
    rating: "4.8",
    quote:
      "The scan result is fast, but the real win is that I can finally keep value history and collection notes in one place.",
    handle: "@jasoncoins",
    detail: "App Store review, Austin, TX",
    avatar: "public/avatars-real/men-32.jpg",
  },
  {
    rating: "4.9",
    quote:
      "It feels more serious than a hobby app. I use it to understand what I own before I decide what to hold or move.",
    handle: "@megancollects",
    detail: "Google Play review, Phoenix, AZ",
    avatar: "public/avatars-real/women-44.jpg",
  },
  {
    rating: "4.7",
    quote:
      "Identification is strong, and the portfolio view makes the whole collection feel organized instead of chaotic.",
    handle: "@robertset",
    detail: "App Store review, Newark, NJ",
    avatar: "public/avatars-real/men-75.jpg",
  },
  {
    rating: "4.8",
    quote:
      "I like that it does not push me into buying or selling. It gives me a clean record and a price range I can actually use.",
    handle: "@lindapennies",
    detail: "Collector review, Tampa, FL",
    avatar: "public/avatars-real/women-68.jpg",
  },
  {
    rating: "4.6",
    quote:
      "The collection view made it obvious which coins I had already logged and which ones still needed better photos.",
    handle: "@danielquarters",
    detail: "Google Play review, Denver, CO",
    avatar: "public/avatars-real/men-46.jpg",
  },
  {
    rating: "4.9",
    quote:
      "The valuation screen feels simple, but the condition context is what makes it useful for a real collection.",
    handle: "@gracenotes",
    detail: "App Store review, Seattle, WA",
    avatar: "public/avatars-real/women-65.jpg",
  },
  {
    rating: "4.7",
    quote:
      "I used to keep auction links, screenshots, and notes everywhere. Heribase gives me one place to check the story.",
    handle: "@patricksilver",
    detail: "Collector review, Philadelphia, PA",
    avatar: "public/avatars-real/men-22.jpg",
  },
  {
    rating: "4.8",
    quote:
      "It is quick enough for scanning, but polished enough that I trust it as a long-term collection base.",
    handle: "@emilytypeset",
    detail: "App Store review, Chicago, IL",
    avatar: "public/avatars-real/women-79.jpg",
  },
  {
    rating: "4.9",
    quote:
      "The photo workflow is smooth enough that I added a whole drawer of coins in one evening.",
    handle: "@marcusmint",
    detail: "Collector review, San Diego, CA",
    avatar: "public/avatars-real/men-85.jpg",
  },
  {
    rating: "4.7",
    quote:
      "I use the estimate as a starting point, then keep my notes and provenance in the same record.",
    handle: "@norasets",
    detail: "App Store review, Portland, OR",
    avatar: "public/avatars-real/women-12.jpg",
  },
  {
    rating: "4.8",
    quote: "The app makes my collection feel searchable. That alone saves me a lot of second guessing.",
    handle: "@benproof",
    detail: "Google Play review, Raleigh, NC",
    avatar: "public/avatars-real/men-64.jpg",
  },
  {
    rating: "4.9",
    quote: "It is the first coin app where valuation, photos, and collection tracking all feel connected.",
    handle: "@sofiacollects",
    detail: "Collector review, Miami, FL",
    avatar: "public/avatars-real/women-91.jpg",
  },
];

function reviewCard(testimonial) {
  return `
    <article class="review-card">
      <img src="${testimonial.avatar}" alt="" width="48" height="48" class="review-card__avatar" />
      <div class="review-card__body">
        <div class="review-card__meta">
          <span class="review-card__author">${testimonial.handle}</span>
          <span class="review-card__stars">${testimonial.rating}</span>
        </div>
        <p class="review-card__quote">"${testimonial.quote}"</p>
        <span class="review-card__source">${testimonial.detail}</span>
      </div>
    </article>
  `;
}

function renderReviews() {
  const track = document.getElementById("reviewsTrack");
  if (!track) return;

  const rows = [testimonials.slice(0, 6), testimonials.slice(6)];
  track.innerHTML = rows
    .map((row, index) => {
      const set = `<div class="reviews-row__set">${row.map(reviewCard).join("")}</div>`;
      return `<div class="reviews-row ${index === 1 ? "reviews-row--reverse" : ""}">${set}${set}</div>`;
    })
    .join("");
}

function bindActiveNav() {
  const root = document.querySelector(".page-shell");
  const links = Array.from(document.querySelectorAll(".site-nav__link"));
  const sections = ["product", "features", "reviews", "cta"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!root || sections.length === 0) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const viewportCenter = root.scrollTop + root.clientHeight * 0.42;
    const active = sections.reduce(
      (closest, section) => {
        const distance = Math.abs(section.offsetTop - viewportCenter);
        return distance < closest.distance ? { id: section.id, distance } : closest;
      },
      { id: sections[0].id, distance: Number.POSITIVE_INFINITY },
    );

    links.forEach((link) => {
      link.classList.toggle("site-nav__link--active", link.getAttribute("href") === `#${active.id}`);
    });
    document.querySelector(".site-download")?.classList.toggle("site-download--active", active.id === "cta");
  };

  root.addEventListener(
    "scroll",
    () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    },
    { passive: true },
  );

  update();
}

renderReviews();
bindActiveNav();
