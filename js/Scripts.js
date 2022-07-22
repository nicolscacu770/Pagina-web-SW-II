//variables locales

var overlayRegistro = document.getElementById("overlayRegistro")
var popupRegistro = document.getElementById("popupRegistro");

var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");

const btnCerrarPopupRecord = document.getElementById("btn-cerrar-popupRecord");
btnCerrarPopupRecord.addEventListener('click', function (){
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

function agregarRegistro(){
    overlay.classList.add('active');
    popup.classList.add('active');
    overlayRegistro.classList.remove('active');
    popupRegistro.classList.remove('active');
}

function cancelarRegistro(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
    overlayRegistro.classList.add('active');
    popupRegistro.classList.add('active');
    document.getElementById("newActivityDate").value = "";
    document.getElementById("newRecordHour").value = "";
    document.getElementById("newRecordAula").value = "";
    document.getElementById("newRecordMatter").value = "";
}
