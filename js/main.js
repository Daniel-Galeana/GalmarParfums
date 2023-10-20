const perfumesContainer = document.getElementById('perfumes-container');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalImageQuotation = document.getElementById('modal-imageQuotation');
const TituloPerfume = document.getElementById('TituloPerfume');
const TituloPerfumeQuotation = document.getElementById('TituloPerfumeQuotation');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

$("#demo02").animatedModal({
  animatedIn: 'zoomIn',
  animatedOut: 'bounceOut',
  color: '#fff',
  // Callbacks
  beforeOpen: function () {
    setTimeout(() => {
      $('#modal-02').scrollTop(0);
    }, 100);
  },
  afterOpen: function () {
    localStorage.setItem('mdlIsopen', 1)
  },
  beforeClose: function () {
    $('#BodyG').removeAttr('style')
    //console.log("The animation was called");
  },
  afterClose: function () {
    localStorage.setItem('mdlIsopen', 0)
  }
});

$(document).ready(async function () {
  closeNavOnWhellMobile()
  window.addEventListener('resize', resizing);
  $(window).on('popstate', function () {
    if (localStorage['mdlIsopen'] == 1) {
      $('.closebt').click();
      setTimeout(() => {
        window.scroll('', localStorage['yAxisLocation']);
      }, 100);
    } else {
      $(window).scrollTop(0);
    }
  });
  //Lectura del json
  let JsonToPaint = await LeerJson('assets/Json/Parfums.json')
  PintarMenuParfums(JsonToPaint);
  let elementsArray = document.querySelectorAll(".divFade");
  window.addEventListener('scroll', fadeIn);
  function fadeIn() {
    for (var i = 0; i < elementsArray.length; i++) {
      var elem = elementsArray[i]
      var distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
      if (distInView < 0) {
        elem.classList.add("inView");
      } else {
        elem.classList.remove("inView");
      }
    }
  }
  fadeIn();

  //$(".loader-wrapper").fadeOut(CompletedX());
  $(".loader-wrapper").addClass('hide');
  const content = document.querySelector('.content');
  setTimeout(function () {
    $(".loader-wrapper").remove();
    content.style.display = 'block';
  }, 2500);
  calcularHeaderDimentionsInitial()
})

$('#btnCotizarWA').on('click', () => {
  var url = 'https://api.whatsapp.com/send?phone=5554374622&text=Que tal, me gustaría cotizar un perfume'
  window.open(url);
})

// Función para mostrar el modal con el perfume seleccionado
function mostrarModal(src, descripcion, nombre, p, seasson) {
  let htmlElement = '<canvas id="grafica" width="300" height="400"></canvas>';
  $('#grafica').remove();
  $('#canvasContainer').append(htmlElement);
  let jsonSeassons = parseJSON(seasson);
  let c = cotizar(p);
  $('#modal-pQuotation').text('$  ' + c);
  TituloPerfume.innerHTML = nombre;
  modalImage.src = src;
  modalDescription.innerHTML = descripcion;
  $('#demo02').click();
  window.history.pushState('forward', null, '/');
  setTimeout(() => {
    PintarGrafica(jsonSeassons);
  }, 200);
};

// Event listeners
perfumesContainer.addEventListener('click', e => {
  localStorage.setItem('yAxisLocation', window.scrollY);
  const perfume = e.target.closest('.perfume');
  if (perfume) {
    const nombre = perfume.querySelector('.perfume-name').innerHTML;
    const image = perfume.querySelector('.perfume-image');
    const p = perfume.querySelector('.perfume-p').attributes['ptv'].value;
    const seasson = perfume.querySelector('.perfume-p').attributes['seassons'].value;
    const description = perfume.querySelector('.perfume-description').innerHTML;
    mostrarModal(image.src, description, nombre, p, seasson);
  };
});

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function () {
  const searchQuery = searchInput.value.toLowerCase();
  for (let i = 0; i < perfumesContainer.children.length; i++) {
    const perfume = perfumesContainer.children[i];
    const perfumeName = perfume.querySelector('.perfume-name').textContent.toLowerCase();

    if (perfumeName.includes(searchQuery)) {
      perfume.style.display = 'block';
    } else {
      perfume.style.display = 'none';
    };
  };
});

const cotizar = (c) => {
  let pArr = c.split('|');
  let _p = parseInt(pArr[0]);
  let _ml = parseInt(pArr[1]);
  let _ga = parseInt(((Math.pow(6, 3)) - 16));
  let _g = 0.75;
  let pb = parseInt(Math.round((_p + _ga) / _g));
  let p = Math.round(pb / _ml) + 10;
  return p;
};

const parseJSON = (json) => {
  let JSONformatter = json.replaceAll("'", '"');
  return JSONformatter;
};

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
          onClick: function () { }, // Evitar acción al hacer clic en la leyenda
          onHover: function () { } // Evitar cambio de cursor al pasar sobre la leyenda
        },
        tooltip: {
          filter: function () { // Evitar mostrar tooltips al pasar sobre los elementos de la gráfica
            return true;
          }
        }
      }
    }
  });
};

$("#BtnNosotros").click(function () {
  let ToScroll;
  if ($('#navbarNavDropdown').prop('class') == 'navbar-collapse collapse show') {
    ToScroll = $("#quienesSomosSection").offset().top - 160
  } else {
    ToScroll = $("#quienesSomosSection").offset().top
  }
  $('html, body').animate({
    scrollTop: ToScroll
  }, 100);
  closingNavOnMobile()
});

$("#BtnDecants").click(function () {
  let ToScroll;
  if ($('#navbarNavDropdown').prop('class') == 'navbar-collapse collapse show') {
    ToScroll = $("#decantsSection").offset().top - 160
  } else {
    ToScroll = $("#decantsSection").offset().top
  }
  $('html, body').animate({
    scrollTop: ToScroll
  }, 100);
  closingNavOnMobile()
});

$("#BtnContacto").click(function () {
  $('html, body').animate({
    scrollTop: $("#Footer").offset().top
  }, 100);
  closingNavOnMobile()
});

$("#BtnInicio").click(function () {
  $(window).scrollTop(0);
  closingNavOnMobile()
});

$("#LogoInicio").click(function () {
  $(window).scrollTop(0);
  closingNavOnMobile()
});

$("#LogoInicioResponsive").click(function () {
  $(window).scrollTop(0);
  closingNavOnMobile()
});

const InputSearchHover = () => {
  if ($("#search-input").hasClass('active')) {
    if ($("#search-input").val().length <= 0) {
      $("#search-input").blur();
    }
  }
}

const elContainerParfums = document.getElementById('perfumes-container')
elContainerParfums.onwheel = InputSearchHover;
elContainerParfums.addEventListener('touchmove', function (event) {
  //Comprobamos si hay varios eventos del mismo tipo
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // con esto solo se procesa UN evento touch
    if ($("#search-input").hasClass('active')) {
      if ($("#search-input").val().length <= 0) {
        $("#search-input").blur();
      }
    }
  }
})

$('#search-input').on('focus blur', (e) => {
  let id = e.target.id
  if (e.type == 'focus') {
    if ($('#' + id).hasClass('inActive')) {
      $('#' + id).removeClass('inActive')
    }
    $('#' + id).addClass('active')
  } else if (e.type == 'blur') {
    if ($('#' + id).hasClass('active')) {
      $('#' + id).removeClass('active')
    }
    $('#' + id).addClass('inActive')
  }
})

$('#btnSendFooter').on('click', () => {
  if ($('#floatingTextarea').val().length > 0) {
    let Msg = $('#floatingTextarea').val()
    let url = 'https://api.whatsapp.com/send?phone=5554374622&text=' + Msg + ''
    window.open(url);
    $('#floatingTextarea').val('')
  }
})

$('#BtnIWantWA').on('click', () => {
  if ($('#SelectValuePresentation').val() == 'M') {
    let Msg = 'Hola, me gustaria adquirir mililitros del perfume *' + $('#TituloPerfume').text() + '*'
    let url = 'https://api.whatsapp.com/send?phone=5554374622&text=' + Msg + ''
    window.open(url);
  } else if ($('#SelectValuePresentation').val() == 'B') {
    let Msg = 'Hola, me gustaria adquirir la botella de *' + $('#TituloPerfume').text() + '*'
    let url = 'https://api.whatsapp.com/send?phone=5554374622&text=' + Msg + ''
    window.open(url);
  }
})

$('.dropdown').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
  $(this).parents('.dropdown').find('span').text($(this).text());
  $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});

const LeerJson = async (JsonUrl) => {
  let result = {};
  await fetch(JsonUrl)
    .then(res => res.json())
    .catch(error => {
      console.log('File not found')
    })
    .then(response => {
      result = response;
    });
  return result;
}

const PintarMenuParfums = (menu) => {
  let ElToAppend = ''
  let TextToAppend = ''
  for (let p in menu.menuParfums) {
    TextToAppend = ''
    TextToAppend += '<div class="perfume divFade">'
    TextToAppend += '<img class="perfume-image" src="' + menu.menuParfums[p].url + '">'
    TextToAppend += '<div class="perfume-name">' + menu.menuParfums[p].name + '</div>'
    TextToAppend += '<div class="perfume-p" ptv="' + menu.menuParfums[p].pam + '" seassons="' + menu.menuParfums[p].seassons + '"></div>'
    TextToAppend += '<div class="perfume-description" style="display: none;">' + menu.menuParfums[p].notes + '</div>'
    TextToAppend += '</div>'
    ElToAppend += TextToAppend
  }
  $('#perfumes-container').append(ElToAppend)
}

const resizing = () => {
  recalcularHeaderDimentions()
}

const recalcularHeaderDimentions = () => {
  let height = window.innerHeight;
  let heightAbsolute = window.innerHeight * .40;

  if (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //Es movil y no se redimenciona
  } else {
    $('.Hheader').css('height', height)
    $('.contenidoP').css('height', height)
    $('.absolute').css('height', heightAbsolute)
  }
}

const calcularHeaderDimentionsInitial = () => {
  let height = window.innerHeight;
  let heightAbsolute = window.innerHeight * .40;
  $('.Hheader').css('height', height)
  $('.contenidoP').css('height', height)
  $('.absolute').css('height', heightAbsolute)
}

const closeNavOnWhellMobile = () => {
  window.onwheel = closingNavOnMobile;
}

const closingNavOnMobile = () => {
  if ($('#navbarNavDropdown').prop('class') == 'navbar-collapse collapse show') {
    $("[data-bs-target='#navbarNavDropdown']").click()
  }
}