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
}

function cancelarRegistro(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
    document.getElementById("newActivityDate").value = "";
    document.getElementById("newRecordHour").value = "";
    document.getElementById("newRecordAula").value = "";
    document.getElementById("newRecordMatter").value = "";
}
