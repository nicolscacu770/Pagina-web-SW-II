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
        }

    })
}())

class Estudiante{
    constructor(correo, pass) {
        this.correo = correo;
        this.pass = pass;
    }
}

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

            if (correo.value == "nicolas.cacua@uptc.edu.co" && pass.value == "12345"){
                redirec();
                setTimeout ("redirec()", 100); //tiempo expresado en milisegundos
            }


        }
}
function redirec(){window.location.href="index-1.html";}

function registrarse(){

    var regcorreo = document.getElementById("reg-correo");
    var regpass=document.getElementById("reg-pass");
    var regreppass=document.getElementById("reg-rep-pass");


    if (regcorreo.value !="" && regpass.value !="" && regreppass.value !=""){
        if(regpass.value == regreppass.value){
            estudiante.push (new Estudiante(regcorreo.value, regpass.value));
            alert("registro completo");
        }else{
            alert("Las contraseñas no coinciden");
        }

    }
    else{
        alert("Campos vacios");
    }
}


