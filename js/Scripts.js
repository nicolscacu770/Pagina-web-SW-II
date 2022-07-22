//variables locales
var indexActivity;

var overlayPerfil = document.getElementById("overlayPerfil");
var popupPerfil = document.getElementById("popupPerfil");

var overlayMisMaterias = document.getElementById("overlayMisMaterias")
var popupMisActividades = document.getElementById("popupMisActividades");

var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");

var overlayActividad = document.getElementById("overlayActividad");
var popupActividad = document.getElementById("popupActividad");

const btnCerrarPopupActividad = document.getElementById("btn-cerrar-popupActivity");
btnCerrarPopupActividad.addEventListener('click', function (){
    overlayActividad.classList.remove('active');
    popupActividad.classList.remove('active');
    document.getElementById("noteActivity").disabled=true;
    document.getElementById("btn-agregar-calificacion").disabled=true;
});

class Activity{
    note;
    state;
    ponderate;
    constructor(name, type, dueDate){
        this.name = name;
        this.type = type;
        this.dueDate = dueDate;
        this.note = "";
        this.state = "sin entregar";
        this.ponderate = "no aplica";
    }
}

class Matter{
    activities = [];
    notaFinal;
    constructor(name, teacher, numCredits){
        this.name = name;
        this.teacher = teacher;
        this.numCredits = numCredits;
    }

    promedio(){
        if(this.activities.length > 0){
            var sum=0;
            if(this.activities[0].ponderate > 0){
                for (var i=0; i<this.activities.length; i++){
                    if(this.activities[i].note != ""){
                        let operation = parseFloat(this.activities[i].note) * parseInt(this.activities[i].ponderate);
                        sum += (operation/100);
                    }
                }
                return sum;
            }else{
                var calificadas=0;
                for (var k=0; k<this.activities.length; k++){
                    if(this.activities[k].note != ""){
                        sum+= parseFloat(this.activities[k].note);
                        calificadas++;
                    }
                }
                sum = (sum/calificadas);
                return sum;
            }
        }else{
            return 0;
        }


    }
}

var matters = [];
matters.push( new Matter("Calculo III","Raul", 3));
matters.push( new Matter("Algoritmos","Carlos", 4));
matters.push( new Matter("Ingles","Sergio", 4));
matters.push( new Matter("Electronica","Arturo", 3));

matters[1].activities.push( new Activity("parcial Web", "parcial", "2021-05-02"));
matters[1].activities.push( new Activity("taller hilos", "Taller", "2021-05-20"));

matters[3].activities.push( new Activity("parcial 1er 50%", "parcial", "2021-05-30"));
matters[3].activities.push( new Activity("taller 1", "Taller", "2021-05-10"));
matters[3].activities.push( new Activity("taller 2", "taller", "2021-05-21"));
matters[3].activities.push( new Activity("taller 3", "Taller", "2021-05-10"));
loadMatters();

function loadMattersPerfil(){
    var bodyMattersPerfil = document.getElementById("bodyMattersPerfil");
    bodyMattersPerfil.innerHTML="";

    var promedioSem = 0;
    var totalCreditos = 0;

    for (var iterator=0 ; iterator<matters.length ; iterator++){
        const row = document.createElement('tr');

        const col1 = document.createElement('th');
        col1.append( matters[iterator].name );
        row.append(col1);

        const col2 = document.createElement('th');
        col2.append( matters[iterator].numCredits );
        row.append(col2);

        const col3 = document.createElement('th');
        var notaF=0;
        if(matters[iterator].promedio() == NaN){
            notaF = 0;
        }else if(matters[iterator].promedio() > 0){
            notaF = matters[iterator].promedio();
        }
        col3.append( notaF );
        row.append(col3);

        bodyMattersPerfil.append(row);

        totalCreditos += matters[iterator].numCredits;

        let notaMat = parseFloat(notaF);
        let creditsMat = parseFloat( matters[iterator].numCredits );
        promedioSem += (notaMat*creditsMat);
    }

    promedioSem = (promedioSem/totalCreditos);
    const prom = document.getElementById("average");
    prom.innerHTML = promedioSem;
}


function validarNumericosPonderate(event, entrada) {
    if(entrada.value.length<3){
        const code = Window.event ? event.switch : event.keyCode;
        const restante = (entrada.value*10)+parseInt(String.fromCharCode(code));

        if(restante <= entrada.max){
            return code >= 48 && code <= 57;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function loadMatters(){
    const listMatters = document.getElementById("listMatters");
    for (var i=0 ; i<matters.length ; i++){
        const op1 = document.createElement('option');
        op1.text = matters[i].name;
        listMatters.append(op1);
    }
}

function showMatter(){

    const matter = document.getElementById("listMatters").selectedIndex;
    const nameMatter = document.getElementById("nameMatter");
    nameMatter.innerHTML = `Materia: ${matters[matter-1].name}`;

    const promedio = matters[matter-1].promedio();
    const prom = document.getElementById("promedio");
    prom.innerHTML = `Promedio: ${promedio}`;

    mostrarActividades()
}

function agregarActividad(){
    const matter = document.getElementById("listMatters").selectedIndex-1;
    var ponder = document.getElementById("newActivityPonderate");
    var sum=0;
    for (var i=0 ; i < matters[matter].activities.length ; i++){
       if(matters[matter].activities[i].ponderate >= 0){
           sum += parseInt( matters[matter].activities[i].ponderate );
       }
    }
    ponder.max = (100-sum);
    if(matters[matter].activities.length > 0){
        if(matters[matter].activities[0].ponderate > 0){
            ponder.disabled = false;
        }else{
            ponder.disabled = true;
        }
    }else{
        ponder.disabled = false;
    }

    overlay.classList.add('active');
    popup.classList.add('active');
}

function cancelarActividad(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
    document.getElementById("newActivityName").value = "";
    document.getElementById("newActivityDate").value = "";
    document.getElementById("newActivityPonderate").value = "";
}

function agregarNuevaActividad(){
    const name = document.getElementById("newActivityName");
    const type = document.getElementById("newActivityType");
    const dueDate = document.getElementById("newActivityDate");
    const ponderate = document.getElementById("newActivityPonderate");

    if(name.value!="" && type.value!="" && dueDate.value!=""){
        const matter = document.getElementById("listMatters").selectedIndex-1;
        matters[matter].activities.push( new Activity(name.value, type.value, dueDate.value));

        if( ponderate.value!=""){
            matters[matter].activities[matters[matter].activities.length-1].ponderate = ponderate.value;
        }
        name.value="";
        dueDate.value="";
        ponderate.value="";

        overlay.classList.remove('active');
        popup.classList.remove('active');
        mostrarActividades();

        const promedio = matters[matter].promedio();
        document.getElementById("promedio").innerHTML = `Promedio: ${promedio}`;
    }else{
        alert('campos vacíos');
    }
}

function mostrarActividades(){
    var indexMatter = (document.getElementById("listMatters").selectedIndex - 1);
    var tbodyActivities = document.getElementById("bodyActivity");
    tbodyActivities.innerHTML="";

   for(var i=0; i<matters[indexMatter].activities.length; i++){
       const row = document.createElement('tr');

       const col1 = document.createElement('th');
       col1.append( i+1 );
       row.append(col1);

       const col2 = document.createElement('td');
       var btn = document.createElement('button');
       btn.innerHTML = (matters[indexMatter].activities[i].name);
       btn.id = i;
       btn.style.width = '100%';
       btn.style.height = '100%';
       btn.style.textAlign = 'left';
       btn.style.border = 'tomato';

       btn.onclick = function(){
           actividad(this.id);
           indexActivity = this.id;

       }
       col2.append( btn );
       row.append( col2 );

       const col3 = document.createElement('td');
       col3.append( matters[indexMatter].activities[i].type );
       row.append( col3 );

       const col4 = document.createElement('td');
       const dateEntrega = matters[indexMatter].activities[i].dueDate;
       col4.append( dateEntrega );
       row.append( col4 );

       const col5 = document.createElement('td');
       const text = document.createElement('label');

       const fechaAct = new Date();
       const fechaEntr = new Date(dateEntrega);

       let diasRestantes = (fechaEntr - fechaAct);
       diasRestantes = (diasRestantes/86400000);

       if(diasRestantes<= 4 && diasRestantes>=0){
           text.innerHTML = "próximo";
           text.style.color = "#dc3545";
       }else if(diasRestantes<= 0 && diasRestantes>=-1){
           text.innerHTML = "para hoy";
           text.style.color = "red";
       }else if(diasRestantes>4) {
           text.innerHTML = "";
       }else if(diasRestantes<-1){
           text.innerHTML = "vencido";
           text.style.color = "red";
       }

       col5.append( text );
       row.append( col5 );

       const col6 = document.createElement('td');
       col6.append( matters[indexMatter].activities[i].note );
       row.append( col6 );

        tbodyActivities.append(row);
   }
}

function actividad( index ){
    var indexMatter = (document.getElementById("listMatters").selectedIndex - 1);
    const nombre = document.getElementById("activityTittle");
    const tipo = document.getElementById("typeActivity");
    const fecha = document.getElementById("dateActivity");
    const estado = document.getElementById("stateActivity");
    const ponderate = document.getElementById("ponderateActivity");
    const nota = document.getElementById("noteActivity");

    nombre.innerHTML = matters[indexMatter].activities[index].name;
    tipo.value = matters[indexMatter].activities[index].type;
    fecha.value = matters[indexMatter].activities[index].dueDate;
    estado.value = matters[indexMatter].activities[index].state;
    if(matters[indexMatter].activities[index].ponderate >= 0 ){
        ponderate.value = matters[indexMatter].activities[index].ponderate + "%";
    }else{
        ponderate.value = matters[indexMatter].activities[index].ponderate;
    }
    nota.value = matters[indexMatter].activities[index].note;

    if(estado.value=="entregada a tiempo"){
        estado.style.backgroundColor = '#44A144';
    }else if(estado.value=="entregada con retraso"){
        estado.style.backgroundColor = '#F73131';
    }else {
        estado.style.backgroundColor = '#F66A35';
    }
    estado.style.color = '#FFFFFF';

    overlayActividad.classList.add('active');
    popupActividad.classList.add('active');

    const btnMarcarCompletada = document.getElementById("btn-marcar-completada");
    const btnCalificar = document.getElementById("calificarActivity");

    if ( matters[indexMatter].activities[index].state == "sin entregar"){
        btnMarcarCompletada.disabled = false;
        btnCalificar.disabled = true;
    }else if ( matters[indexMatter].activities[index].state == "entregada a tiempo" || matters[indexMatter].activities[index].state == "entregada con retraso" ){
        btnMarcarCompletada.disabled = true;
        btnCalificar.disabled = false;
    }
    btnMarcarCompletada.addEventListener('click', function (){
        if(index == indexActivity && indexMatter == document.getElementById("listMatters").selectedIndex - 1){
            const fechaActual = new Date();
            const fechaEntrega = new Date(matters[indexMatter].activities[index].dueDate);
            if( fechaEntrega > fechaActual){
                matters[indexMatter].activities[index].state = "entregada a tiempo";
            }else if(fechaEntrega <= fechaActual){
                matters[indexMatter].activities[index].state = "entregada con retraso";
            }
            estado.value = matters[indexMatter].activities[index].state;
            if(estado.value=="entregada a tiempo"){
                estado.style.backgroundColor = '#44A144';
            }else if(estado.value=="entregada con retraso"){
                estado.style.backgroundColor = '#F73131';
            }else{
                estado.style.backgroundColor = '#F66A35';
            }
            estado.style.color = '#FFFFFF';

            if ( matters[indexMatter].activities[index].state == "sin entregar"){
                btnMarcarCompletada.disabled = false;
                btnCalificar.disabled = true;
            }else if ( matters[indexMatter].activities[index].state == "entregada a tiempo" || matters[indexMatter].activities[index].state == "entregada con retraso" ) {
                btnMarcarCompletada.disabled = true;
                btnCalificar.disabled = false;
            }
        }


    });

    btnCalificar.addEventListener('click', function (){
        nota.disabled=false;
        const btnGuardarCalificacion = document.getElementById("btn-agregar-calificacion");
        btnGuardarCalificacion.disabled = false;

        btnGuardarCalificacion.addEventListener('click', function (){
            if(index == indexActivity && indexMatter == document.getElementById("listMatters").selectedIndex - 1){
                if (nota.value!=""){
                    matters[indexMatter].activities[index].note = nota.value;
                    nota.disabled = true;
                    btnGuardarCalificacion.disabled = true;
                    mostrarActividades();
                    const promedio = matters[indexMatter].promedio();
                    document.getElementById("promedio").innerHTML = `Promedio: ${promedio}`;
                } else{
                    alert('agregue la nota');
                }
            }

        });
    });
}

function mostrarPerfil(){
    loadMattersPerfil();
    overlayMisMaterias.classList.remove('active');
    popupPerfil.classList.add('active');
    overlayPerfil.classList.add('active');
}

function mostrarMisMaterias(){
    overlayPerfil.classList.remove('active');
    popupMisActividades.classList.add('active');
    overlayMisMaterias.classList.add('active');
}