//variables locales

var overlayRegistro = document.getElementById("overlayRegistro")
var popupRegistro = document.getElementById("popupRegistro");

var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");

const btnCerrarPopupActividad = document.getElementById("btn-cerrar-popupActivity");
btnCerrarPopupActividad.addEventListener('click', function (){
    overlayActividad.classList.remove('active');
    popupActividad.classList.remove('active');
    document.getElementById("noteActivity").disabled=true;
    document.getElementById("btn-agregar-calificacion").disabled=true;
});
