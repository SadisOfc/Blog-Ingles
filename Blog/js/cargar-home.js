document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".articulos");

  fetch("/Blog/data/home.json")
    .then(res => res.json())
    .then(data => {
      const articulos = data.articulos || [];
      const visibles = articulos.filter(a => a.visible !== false);

      // Ordenar por fecha descendente
      const ordenados = visibles.reverse();

      ordenados.forEach(art => {
        const article = document.createElement("article");
        article.innerHTML = `
          <a href="${art.ruta}">
            <h2>${art.titulo}</h2>
            <p>${art.resumen}</p>
            <span class="fecha">${art.fecha}</span>
          </a>
        `;
        contenedor.appendChild(article);
      });
    })
    .catch(err => console.error("Error al cargar artículos del home:", err));
});
