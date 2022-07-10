var estudiante = [];

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

            if (correo.value == estudiante[0].correo && pass.value == estudiante[0].pass){
                redirec();
                setTimeout ("redirec()", 100); //tiempo expresado en milisegundos
                alert("correcto")
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
            alert("registro completo de: " + student.pass);

        }else{
            alert("Las contraseñas no coinciden");
        }

    }
    else{
        alert("Campos vacios");
    }
}


