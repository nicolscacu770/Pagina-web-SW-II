//variables locales

var overlayRegistro = document.getElementById("overlayRegistro")
var popupRegistro = document.getElementById("popupRegistro");

var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");

var overlayAsignar = document.getElementById("overlayAsignar")
var popupAsignar = document.getElementById("popupAsignar");

var overlayAsignacion = document.getElementById("overlayAsignacion")
var popupAsignacion = document.getElementById("popupAsignacion");

const btnCerrarPopupRecord = document.getElementById("btn-cerrar-popupRecord");
btnCerrarPopupRecord.addEventListener('click', function (){
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

const btnCerrarPopupAssign = document.getElementById("btn-cerrar-popupAssign");
btnCerrarPopupAssign.addEventListener('click', function (){
    overlayAsignacion.classList.remove('active');
    popupAsignacion.classList.remove('active');
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

function agregarAsignacion(){
    overlayAsignacion.classList.add('active');
    popupAsignacion.classList.add('active');
}

function cancelarAsignacion(){
    overlayAsignacion.classList.remove('active');
    popupAsignacion.classList.remove('active');
    document.getElementById("newActivityDate").value = "";
    document.getElementById("newRecordHour").value = "";
    document.getElementById("newRecordAula").value = "";
    document.getElementById("newRecordMatter").value = "";
}
