document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-recomendados");
  if (!lista) return;

  fetch("/Blog/data/home.json")
    .then(res => res.json())
    .then(data => {
      const articulos = (data.articulos || []).filter(a => a.visible);

      const actualArchivo = window.location.pathname.split("/").pop();

      const filtrados = articulos.filter(a => !a.ruta.endsWith(actualArchivo));

      const recomendados = filtrados.sort(() => 0.5 - Math.random()).slice(0, 4);

      recomendados.forEach(art => {
        const img = art.imagen || "/Blog/images/icon.png"; // Imagen por defecto
        const item = document.createElement("article");
        item.innerHTML = `
          <a href="${art.ruta}">
            <img src="${img}" alt="${art.titulo}">
            <h3>${art.titulo}</h3>
            <p>${art.resumen}</p>
          </a>
        `;
        lista.appendChild(item);
      });
    })
    .catch(err => console.error("Error cargando recomendados:", err));
});
