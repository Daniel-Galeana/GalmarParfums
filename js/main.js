const perfumesContainer = document.getElementById('perfumes-container');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalImageQuotation = document.getElementById('modal-imageQuotation');
const TituloPerfume = document.getElementById('TituloPerfume');
const TituloPerfumeQuotation = document.getElementById('TituloPerfumeQuotation');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');
const cotizar = document.getElementById('btnCotizar');


// Función para mostrar el modal con el perfume seleccionado
function mostrarModal(src, descripcion, nombre, p) {
  TituloPerfume.innerHTML = nombre
  TituloPerfumeQuotation.innerHTML = nombre
  modalImage.src = src;
  modalImageQuotation.src = src;
  modalDescription.innerHTML = descripcion;
  $(cotizar).data('pdp', p);
  $('#mdlParfumDetail').modal('show')
}

// Event listeners
perfumesContainer.addEventListener('click', e => {
  const perfume = e.target.closest('.perfume');
  if (perfume) {
    const nombre = perfume.querySelector('.perfume-name').innerHTML;
    const image = perfume.querySelector('.perfume-image');
    const p = perfume.querySelector('.perfume-p').attributes['ptv'].value
    const description = perfume.querySelector('.perfume-description').innerHTML;
    mostrarModal(image.src, description, nombre, p);
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

cotizar.addEventListener('click', () => {
  let pArr = $(cotizar).data('pdp').split('|');
  let _p = parseInt(pArr[0]);
  let _ml = parseInt(pArr[1])
  let _ga = parseInt((Math.pow(6,3)) - 16);
  let _g = 0.85;
  let pb = parseInt(Math.round((_p + _ga)/_g))
  let p = Math.round(pb/_ml)
  $('#modal-pQuotation').text('Costo por mililitro: $' + p)
  $('#mdlParfumQuotation').modal('show')
  setTimeout(() => {
    $('#mdlParfumDetail').modal('hide')
  }, 300);
})