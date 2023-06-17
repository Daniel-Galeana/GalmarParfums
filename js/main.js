const perfumesContainer = document.getElementById('perfumes-container');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalImageQuotation = document.getElementById('modal-imageQuotation');
const TituloPerfume = document.getElementById('TituloPerfume');
const TituloPerfumeQuotation = document.getElementById('TituloPerfumeQuotation');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

$("#demo02").animatedModal({
  animatedIn:'lightSpeedIn',
  animatedOut:'bounceOutDown',
  color:'#fff',
  // Callbacks
  beforeOpen: function() {
      console.log("The animation was called");
  },           
  afterOpen: function() {
      console.log("The animation is completed");
  }, 
  beforeClose: function() {
      console.log("The animation was called");
  }, 
  afterClose: function() {
      console.log("The animation is completed");
  }
});

// Función para mostrar el modal con el perfume seleccionado
function mostrarModal(src, descripcion, nombre, p, seasson) {
  let htmlElement = '<canvas id="grafica" width="300" height="400"></canvas>'
  $('#grafica').remove()
  $('#canvasContainer').append(htmlElement)
  let jsonSeassons = parseJSON(seasson)
  let c = cotizar(p);
  $('#modal-pQuotation').text('$  ' + c)
  TituloPerfume.innerHTML = nombre
  modalImage.src = src;
  modalDescription.innerHTML = descripcion;
  $('#demo02').click()
  setTimeout(() => {
    PintarGrafica(jsonSeassons)
  }, 200);
}

// Event listeners
perfumesContainer.addEventListener('click', e => {
  const perfume = e.target.closest('.perfume');
  if (perfume) {
    const nombre = perfume.querySelector('.perfume-name').innerHTML;
    const image = perfume.querySelector('.perfume-image');
    const p = perfume.querySelector('.perfume-p').attributes['ptv'].value
    const seasson = perfume.querySelector('.perfume-p').attributes['seassons'].value
    const description = perfume.querySelector('.perfume-description').innerHTML;
    mostrarModal(image.src, description, nombre, p, seasson);
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

const cotizar = (c) => {
  let pArr = c.split('|');
  let _p = parseInt(pArr[0]);
  let _ml = parseInt(pArr[1])
  let _ga = parseInt((Math.pow(6,3)) - 16);
  let _g = 0.75;
  let pb = parseInt(Math.round((_p + _ga)/_g))
  let p = Math.round(pb/_ml)
  return p
}

const parseJSON = (json) => {
  let JSONformatter = json.replaceAll("'", '"');
  return JSONformatter
}

const PintarGrafica = (json) => {
  let perfume = JSON.parse(json);

  // Obtener las temporadas y los porcentajes
var temporadas = Object.keys(perfume);
var porcentajes = Object.values(perfume);

// Definir colores para cada temporada
var colores = ['#00DFA2', '#DB005B', '#F79327', '#00C4FF'];

// Crear la gráfica de pastel
var ctx = document.getElementById('grafica').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: temporadas,
    datasets: [{
      label: 'Porcentaje de usabilidad ',
      data: porcentajes,
      backgroundColor: colores
    }]
  },
  options: {
    responsive: false, // Deshabilitar la respuesta automática al tamaño de la pantalla
        maintainAspectRatio: false, // No mantener la relación de aspecto
    plugins: {
      legend: {
        display: false, // Ocultar las leyendas
        onClick: function() {}, // Evitar acción al hacer clic en la leyenda
        onHover: function() {} // Evitar cambio de cursor al pasar sobre la leyenda
      },
      tooltip: {
        filter: function() { // Evitar mostrar tooltips al pasar sobre los elementos de la gráfica
          return true;
        }
      }
    }
  }
});
}