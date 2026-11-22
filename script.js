// 1. Thème clair / sombre (mémorisé dans le navigateur)
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) {
  root.dataset.theme = saved;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.dataset.theme = "dark";
}
document.getElementById("themeBtn").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
});

// 2. Onglets des projets
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", selected);
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
    });
  });
});

// 3. Filtre OK / KO du plan de tests
const chips = document.querySelectorAll(".chip");
const rows = document.querySelectorAll("#planTable tbody tr");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.toggle("active", c === chip));
    const filter = chip.dataset.filter;
    rows.forEach((row) => {
      row.hidden = filter !== "all" && row.dataset.status !== filter;
    });
  });
});

// 4. Année du pied de page
document.getElementById("year").textContent = new Date().getFullYear();
