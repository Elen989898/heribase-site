(function () {
  const toc = document.querySelector(".legal-toc");
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const entries = links
    .map((link) => {
      const id = link.getAttribute("href").slice(1);
      return { id, link, section: document.getElementById(id) };
    })
    .filter((entry) => entry.section);

  if (!entries.length) return;

  let frame = 0;
  let activeId = "";

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;

    entries.forEach(({ id: entryId, link }) => {
      const isActive = entryId === id;
      link.classList.toggle("legal-toc__link--active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveLink() {
    frame = 0;

    const anchorLine = window.innerHeight * 0.28;
    let current = entries[0];

    entries.forEach((entry) => {
      const top = entry.section.getBoundingClientRect().top;
      if (top <= anchorLine) {
        current = entry;
      }
    });

    const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    setActive(pageBottom ? entries[entries.length - 1].id : current.id);
  }

  function requestUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateActiveLink);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updateActiveLink();
})();
