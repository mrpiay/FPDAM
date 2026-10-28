// Abre en pestaña nueva los enlaces que salen de la web (BOE, DOG, documentación oficial…)
document$.subscribe(function () {
  document.querySelectorAll(".md-content a[href^='http']").forEach(function (a) {
    if (a.host !== window.location.host) {
      a.target = "_blank";
      a.rel = "noopener";
      a.classList.add("fp-external");
    }
  });
});
