document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("semanas");

  fetch("/Blog/data/articles.json")
    .then((res) => res.json())
    .then((data) => {
      // ✅ Reemplazar "Latest News" en navbar
      const links = document.querySelectorAll(".navbar-links a");
      links.forEach((a) => {
        if (a.textContent.trim() === "Latest News") {
          a.setAttribute("href", data.ultima.ruta);
        }
      });

      // ✅ Cargar artículos por semana con filtro visible
      Object.entries(data.semanas).forEach(([semana, articulos]) => {
        // Filtrar solo artículos visibles
        const visibles = articulos.filter(art => art.visible);

        if (visibles.length === 0) return; // No mostrar la semana si no tiene artículos visibles

        const seccion = document.createElement("section");
        seccion.className = "semana";

        const titulo = document.createElement("h2");
        titulo.textContent = semana.replace(/semana/i, "Week ");
        seccion.appendChild(titulo);

        const grupo = document.createElement("div");
        grupo.className = "grupo-articulos";

        visibles.forEach((art) => {
          const article = document.createElement("article");
          const enlace = document.createElement("a");
          enlace.href = art.ruta;

          const h3 = document.createElement("h3");
          h3.textContent = art.titulo;

          const p = document.createElement("p");
          p.textContent = art.resumen;

          const span = document.createElement("span");
          span.className = "fecha";
          span.textContent = art.fecha;

          enlace.appendChild(h3);
          enlace.appendChild(p);
          enlace.appendChild(span);
          article.appendChild(enlace);
          grupo.appendChild(article);
        });

        seccion.appendChild(grupo);
        contenedor.appendChild(seccion);
      });
    })
    .catch((err) => {
      console.error("Error cargando artículos:", err);
    });
});
