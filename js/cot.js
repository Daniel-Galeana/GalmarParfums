const cpasnia = document.getElementById('cpasnia');
const Btnsend = document.getElementById('Btnsend');
const cotInput = document.getElementById('cotInput');
const btn_limpiar = document.getElementById('btn_limpiar');
let st = [];

$(document).ready(function () {
    $('#mdlLog').modal('show');
});

cpasnia.addEventListener('keyup', (e) => {
    if (e.keyCode == 50) {
        st.push(e.keyCode = 75);
    } else if (e.keyCode == 56) {
        st.push(e.keyCode = 88);
    } else if (e.keyCode == 48) {
        st.push(e.keyCode = 84);
    } else if (e.keyCode == 49) {
        st.push(e.keyCode = 81);
    } else if (e.keyCode == 71) {
        st.push(e.keyCode = 83);
    } else if (e.keyCode == 80) {
        st.push(e.keyCode = 71);
    }else if(e.keyCode == 13){
        $(Btnsend).click();
    };
});

Btnsend.addEventListener('click', () => {
    let _handlArr = st;
    st = [];
    let arrSum = _handlArr.map(x => x.toString().match(/.{1}/g).reduce((SumaParcial, a) => SumaParcial + parseFloat(a), 0));
    let total = arrSum.reduce((a, b) => a + b, 0);
    let _vl = Math.abs((Math.round(Math.log(10000, 10)) + Math.round(Math.atan2(3, -3) * Math.sqrt(4) * -1 * (-13))) * (Math.pow(-1,7)) - 10);
    if(total == _vl){
        $('#mdlLog').modal('hide');
    }else{
        SAlertToast('top-end', '3000', 'error', 'Error en las credenciales');
    };
});

cotInput.addEventListener('keyup', (e) => {
    if(e.keyCode == 13){
        cotizar(cotInput.value);
    };
});

btn_limpiar.addEventListener('click', () => {
    $('#containerTab').addClass('d-none');
    $('#GA').text('');
    $('#GAPercent').text('');
    $('#GAT').text('');
    $('#cotInput').val('');
});

const cotizar = (c) => {
    let _c = parseInt(c);
    let _ga = parseInt(((Math.pow(6, 3)) - 16) + 20);
    let _g = 0.85;
    let pb = parseInt(Math.round((_c + _ga) / _g));
    let _gaT = pb - (_c + _ga);
    $('#GA').text('Gastos adicionales: ' +_ga);
    $('#GAPercent').text('Precio: ' +pb);
    $('#GAT').text('Ganancia: ' +_gaT);
    $('#containerTab').removeClass('d-none');
  };