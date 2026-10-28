// Segunda barra con los módulos del curso abierto y menú lateral limitado al módulo activo.
(function () {
  var MODULOS = {
    "1DAM": [
      { ruta: "1DAM/0483-sistemas-informaticos/", nombre: "MP0483 · Sistemas informáticos" },
      { ruta: "1DAM/0485-programacion/", nombre: "MP0485 · Programación" }
    ],
    "2DAM": [
      { ruta: "2DAM/0488-desarrollo-de-interfaces/", nombre: "MP0488 · Desarrollo de interfaces" },
      { ruta: "2DAM/0489-programacion-multimedia-y-dispositivos-moviles/", nombre: "MP0489 · Programación multimedia y dispositivos móviles" }
    ]
  };

  function raizDelSitio() {
    var logo = document.querySelector(".md-header__button.md-logo");
    return new URL(logo ? logo.getAttribute("href") : "./", window.location.href);
  }

  function pintarSubbarra() {
    var vieja = document.querySelector(".fp-subtabs");
    if (vieja) vieja.remove();
    var raiz = raizDelSitio();
    var ruta = window.location.pathname;
    var curso = ruta.indexOf("/1DAM/") !== -1 ? "1DAM" : ruta.indexOf("/2DAM/") !== -1 ? "2DAM" : null;
    document.body.classList.toggle("fp-con-subbarra", !!curso);
    if (!curso) return;

    var barra = document.createElement("nav");
    barra.className = "fp-subtabs";
    barra.setAttribute("aria-label", "Módulos del curso");
    var lista = document.createElement("ul");
    lista.className = "fp-subtabs__list md-grid";
    MODULOS[curso].forEach(function (m) {
      var url = new URL(m.ruta, raiz);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = url.href;
      a.textContent = m.nombre;
      if (ruta.indexOf(url.pathname) === 0) a.className = "fp-subtabs__activo";
      li.appendChild(a);
      lista.appendChild(li);
    });
    barra.appendChild(lista);
    var header = document.querySelector(".md-header");
    if (header) header.appendChild(barra);
  }

  function limitarMenuAlModulo() {
    // Solo en las pestañas de curso: en el menú lateral, oculta el módulo que no está abierto
    var ruta = window.location.pathname;
    if (ruta.indexOf("/1DAM/") === -1 && ruta.indexOf("/2DAM/") === -1) return;
    var secciones = document.querySelectorAll(
      ".md-nav--primary > .md-nav__list > .md-nav__item--active > nav > .md-nav__list > .md-nav__item"
    );
    if (secciones.length < 2) return;
    var hayActivo = Array.prototype.some.call(secciones, function (s) {
      return s.classList.contains("md-nav__item--active");
    });
    if (!hayActivo) return;
    secciones.forEach(function (s) {
      if (!s.classList.contains("md-nav__item--nested")) return; // solo módulos, nunca páginas sueltas
      s.style.display = s.classList.contains("md-nav__item--active") ? "" : "none";
    });
  }

  function indicePlegable() {
    // En escritorio el tema muestra siempre abierto el índice de la página activa; al hacer clic en su flecha se pliega o despliega
    var enlace = document.querySelector(".md-nav--primary .md-nav__item--active > a.md-nav__link--active");
    if (!enlace || !enlace.parentElement.querySelector(":scope > nav.md-nav--secondary")) return;
    var item = enlace.parentElement;
    item.classList.add("fp-indice");
    enlace.setAttribute("aria-expanded", "true");
    if (!enlace.querySelector(".md-nav__icon")) {
      var icono = document.createElement("span");
      icono.className = "md-nav__icon md-icon";
      enlace.appendChild(icono);
    }
    enlace.addEventListener("click", function (e) {
      if (!window.matchMedia("(min-width: 76.25em)").matches) return;
      // Solo la flecha pliega; el nombre sigue funcionando como enlace a la página
      if (!e.target.closest(".md-nav__icon")) return;
      e.preventDefault();
      var plegado = item.classList.toggle("fp-indice-plegado");
      enlace.setAttribute("aria-expanded", plegado ? "false" : "true");
    });
  }

  document$.subscribe(function () {
    pintarSubbarra();
    limitarMenuAlModulo();
    indicePlegable();
  });
})();
