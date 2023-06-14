const perfumesContainer = document.getElementById('perfumes-container');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const TituloPerfume = document.getElementById('TituloPerfume');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

// Función para mostrar el modal con el perfume seleccionado
function mostrarModal(src, descripcion, nombre) {
  TituloPerfume.innerHTML = nombre
  modalImage.src = src;
  modalDescription.innerHTML = descripcion;
  $('#mdlParfumDetail').modal('show')
}

// Event listeners
perfumesContainer.addEventListener('click', e => {
  const perfume = e.target.closest('.perfume');
  if (perfume) {
    const nombre = perfume.querySelector('.perfume-name').innerHTML;
    const image = perfume.querySelector('.perfume-image');
    const description = perfume.querySelector('.perfume-description').innerHTML;
    mostrarModal(image.src, description, nombre);
  }
});

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function() {
  const searchQuery = searchInput.value.toLowerCase();

  for (let i = 0; i < perfumesContainer.children.length; i++) {
    const perfume = perfumesContainer.children[i];
    const perfumeName = perfume.querySelector('.perfume-name').textContent.toLowerCase();

    if (perfumeName.includes(searchQuery)) {
      perfume.style.display = 'block';
    } else {
      perfume.style.display = 'none';
    } 
  }
});