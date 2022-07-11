var estudiante = [];
var users=[];

//============recibir Json, método elaborado===========================================
var archivoUsuarios = new XMLHttpRequest(); //objeto que obtiene info de una URL acepta cualquier tipo de dato
const fileRuta = './js/usuarios.json';
archivoUsuarios.open("GET",fileRuta);
archivoUsuarios.responseType = 'json';//indica el tipo de archivo que va a recibir

archivoUsuarios.onload = function(){
    if(archivoUsuarios.status  == 200){ //el archivo ya se cargó
        users = archivoUsuarios.response; //EL ARCHIVO LLEGÁ COMO UN JSON
        asignar();
    }
    
}

function asignar(){
    for (let i = 0; i < users['usuarios'].length; i++) {
        estudiante.push(users['usuarios'][i]);
    } 
}

archivoUsuarios.send();//realiza peticion http al servidor
//=====================================================================================


  
/*
var txt = archivoUsuarios.responseText;//muestra todos los datos en pantalla, lo recibe como un String

console.log(txt.length);
for (let i = 0; i < txt.length; i++) {
    console.log(txt[i]);
    estudiante.push(txt[i]);
}
*/

//estudiante.forEach(function(data){
//    console.log(data);
//});


(function(){
    $(document).ready(function(){
        $('.alt-form').click(function(){
            $('.form-content').animate({
                height: "toggle",
                opacity: 'toggle'
            }, 600);
        });

        let formRegistro = document.getElementsByName('form-input');
        for (let i = 0; i < formRegistro.length; i++) {
            formRegistro[i].addEventListener('blur', function(){
                if (this.value.length >= 1) {
                    this.nextElementSibling.classList.add('active');
                    this.nextElementSibling.classList.remove('error');
                } else if (this.value.length = " ") {
                    this.nextElementSibling.classList.add('error');
                    this.nextElementSibling.classList.remove('active');
                } else {
                    this.nextElementSibling.classList.remove('active');
                }
            })

            formRegistro[i].addEventListener('click',  function(){
                    this.nextElementSibling.classList.add('active');
                    this.nextElementSibling.classList.remove('error');
            })
        }

    })
}())

class Estudiante{
    constructor(correo, pass) {
        this.correo = correo;
        this.pass = pass;
    }

}

estudiante.push( new Estudiante("jairo@gmail.com", 12345));
estudiante.push( new Estudiante("nora@gmail.com", 12345));

function Validar() {
    var correo=document.getElementById("correo");
    var pass=document.getElementById('pass');
    if(correo.value=="") {
        alert("El campo correo esta vacio");
        correo.focus();
        return false;
    }
        if(pass.value=="") {
            alert("El campo contraseña esta vacio");
            pass.focus();
            return false;
        }
        else {
            //alert(`${correo.value} = ${pass.value}`);
            //alert(`${estudiante[0].correo} = ${estudiante[0].pass }`);

            for (let i = 0; i < estudiante.length; i++) {
                if (correo.value == estudiante[i].correo && pass.value == estudiante[i].pass){
                    redirec();
                    setTimeout ("redirec()", 100); //tiempo expresado en milisegundos
                    alert("correcto")
                }
            }
           


        }
}
function redirec(){window.location.href="docentes_estudiantes.html";}

function registrarse(){

    var regcorreo = document.getElementById("reg-correo");
    var regpass=document.getElementById("reg-pass");
    var regreppass=document.getElementById("reg-rep-pass");

    if (regcorreo.value !="" && regpass.value !="" && regreppass.value !=""){
        if(regpass.value == regreppass.value){
            var student = new Estudiante(regcorreo.value, regpass.value);
            estudiante.push(student);
            console.log(estudiante);
        }else{
            alert("Las contraseñas no coinciden");
        }
    }
    else{
        alert("Campos vacios");
    }
}


