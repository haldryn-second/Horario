//Comprobación del tipo de navegador que se está usando

if (navigator.userAgent.indexOf("Chrome") > -1) {
    navegador = "Chr";
} else if (navigator.userAgent.indexOf("Safari") > -1) {
    navegador = "Saf";
} else if (navigator.userAgent.indexOf("Firefox") > -1) {
    navegador = "Moz";
}

//Creación del array multidimensional base, especificando horas y días como valores fijos

horario = new Array();
horas = new Array("");

function back(tipo) {
    document.getElementById("sema").style.display = "none";
    document.getElementById("hor").style.display = "none";
    document.getElementById("main").style.display = "none";
    if (tipo == "primera") {
        document.getElementById("sema").style.display = "inline-flex";
        document.getElementById("array_horas").innerHTML = "";
        horas = new Array("");

    }
    if (tipo == "segunda") {
        if (document.getElementById("tipo_semana").innerHTML == "comp") semana("completa");
        else semana("habil");
    }

}

function semana(tipo) {
    if (tipo == "completa") {
        for (i = 0; i < 100; i++) {
            if (i == 0) dias = new Array(new Array("Lunes"), new Array("Martes"), new Array("Miércoles"), new Array("Jueves"), new Array("Viernes"), new Array("Sábado"), new Array("Domingo"))
            else dias = new Array(new Array("", ""), new Array("", ""), new Array("", ""), new Array("", ""), new Array("", ""), new Array("", ""), new Array("", ""));
            document.getElementById("long_hor").innerHTML = 7;
            document.getElementById("tipo_semana").innerHTML = "comp";
            horario[i] = dias;
        }
    } else {
        for (i = 0; i < 100; i++) {
            if (i == 0) dias = new Array(new Array("Lunes"), new Array("Martes"), new Array("Miércoles"), new Array("Jueves"), new Array("Viernes"))
            else dias = new Array(new Array("", ""), new Array("", ""), new Array("", ""), new Array("", ""), new Array("", ""));
            document.getElementById("long_hor").innerHTML = 5;
            document.getElementById("tipo_semana").innerHTML = "hab";
            horario[i] = dias;
        }
    }
    document.getElementById("sema").style.display = "none";
    document.getElementById("hor").style.display = "inline";
}


function anyadir_hora() {
    hora_ini = document.getElementById("hor_ini").value;
    hora_fin = document.getElementById("hor_fin").value;
    hora = hora_ini + " - " + hora_fin;
    horas.push(hora);
    hora_texto = "";
    for (i = 1; i < horas.length; i++) {
        hora_texto = hora_texto + "<div class='hor'>" + horas[i] + "</div>";
    }
    document.getElementById("array_horas").innerHTML = hora_texto;
}

function elminar_hora() {
    if (horas.length > 1) {
        horas.pop();
    }
    hora_texto = "";
    for (i = 1; i < horas.length; i++) {
        hora_texto = hora_texto + "<div class='hor'>" + horas[i] + "</div>";
    }

    document.getElementById("array_horas").innerHTML = hora_texto;
}

function cargar_tabla() {
    if (horas.length > 1) {
        cargar_datos();
        document.getElementById("main").style.display = "inline";
        document.getElementById("hor").style.display = "none";
    } else { alert("Debe haber introducido por lo menos una hora") }
}

function dia(desc, fran, dia, col, coletra) {
    this.descripcion = desc;
    this.franja = fran;
    this.diasemana = dia;
    this.color = col;
    this.color_letra = coletra;
}

///////////////////////////////////////////////////////////////////INCORPORACIÓN DATOS
//Crea un objeto de tipo dia con sus variables y lo añade al array

function anyadir() {
    dia_nuevo = new dia(document.getElementById("text_sel").innerHTML,
        document.getElementById("hora_sel").innerHTML,
        document.getElementById("dia_sel").innerHTML,
        document.getElementById("col_sel").innerHTML,
        document.getElementById("col_let_sel").innerHTML);
    evento = new Array(dia_nuevo.descripcion, dia_nuevo.color, dia_nuevo.color_letra)
    horario[dia_nuevo.franja][dia_nuevo.diasemana] = evento;
    cargar_datos();
}

///////////////////////////////////////////////////////////////////ELIMINAR DATOS
//Elimina el segmento del array que es indicado por los
//campos del_hora_sel y del_dia_sel

function eliminar() {
    var del_hora = document.getElementById("del_hora_sel").innerHTML;
    var del_dia = document.getElementById("del_dia_sel").innerHTML;
    evento = new Array("", "")
    horario[del_hora][del_dia] = evento;
    cargar_datos();
}

///////////////////////////////////////////////////////////////////CARGAR DATOS
//Comprueba que el sistema tiene ciertos requisitos y si los
//tiene ejecuta la tabla basada en el array multidimenional

function cargar_datos() {
    if (screen.width < 300) { alert("La aplicación requiere de un monitor superior a 600px de ancho para poder ejecutarse" + "\n" + "Su resolución actual es de " + screen.width + "px de ancho"); } else if ((navegador != "Chr") && (navegador != "Moz") && (navegador != "Saf")) { alert("La aplicación no es compatible con su navegador" + "\n" + "Navegadores soportados: Google Chrome, Mozilla Firefox y Safari"); } else {
        res = "<table>";
        for (i = 0; i < horas.length; i++) {
            if (i == 0) res = res + "<tr><td style='background:black;'></td>";
            else res = res + "<td><b>" + horas[i] + "</b></td>";
            for (j = 0; j < horario[i].length; j++) {
                if (i == 0) res = res + "<td style='background-color:white;'><b>" + horario[i][j][0] + "</b></td>";
                else res = res + "<td style='background-color:" + horario[i][j][1] + ";color:" + horario[i][j][2] + "'>" + horario[i][j][0] + "</td>";
            }
            res = res + "</tr>";
        }
        res = res + "</table>";
        document.getElementById("calendar").innerHTML = res;
    }
}

///////////////////////////////////////////////////////////////////CREACION DE EVENTOS
//Abre una nueva ventana con un formulario que crea las variables
//que serán enviadas automáticamente a la función anyadir()

function agregar_dato() {
    var ventana_agregar = window.open('', '', 'resizable=0,width=350,height=470');
    ventana_agregar.document.write("<head>");
    ventana_agregar.document.write("<title>Añadir Evento</title>");
    ventana_agregar.document.write("<link rel='stylesheet' href='css/Horario.css'>");
    ventana_agregar.document.write("</head>");
    ventana_agregar.document.write("<body>");


    ventana_agregar.document.write("<select class='select-box' id='dia_select'>");
    ventana_agregar.document.write("<option disabled selected>Selecciona un día</option>");
    for (i = 0; i < horario[i].length; i++) {
        ventana_agregar.document.write("<option value='" + i + "' >" + horario[0][i] + "</option>");
    }
    ventana_agregar.document.write("</select><br>");

    ventana_agregar.document.write("<select class='select-box' id='hora_select'>");
    ventana_agregar.document.write("<option disabled selected>Selecciona una franja horaria</option>");
    for (i = 1; i < horas.length; i++) {
        ventana_agregar.document.write("<option value='" + i + "' >" + horas[i] + "</option>");
    }
    ventana_agregar.document.write("</select><br><br>");

    ventana_agregar.document.write("<label>color de fondo:</label>");
    ventana_agregar.document.write("<input type='color' id='color' class='select-box' value='#ffffff'><br><br>");

    ventana_agregar.document.write("<label>color de letra:</label><br>");
    ventana_agregar.document.write("<input type='color' id='color-let' class='select-box' value='#000000'><br><br>");

    ventana_agregar.document.write("<label>añade el texto:</label><br>");
    ventana_agregar.document.write("<textarea id='texto' class='textarea-text'></textarea><br><br>");

    ventana_agregar.document.write("<input type='button' value='Añadir Evento' onclick=\"opener.document.getElementById('hora_sel').innerHTML=document.getElementById('hora_select').value ; opener.document.getElementById('dia_sel').innerHTML=document.getElementById('dia_select').value ; opener.document.getElementById('text_sel').innerHTML=document.getElementById('texto').value; opener.document.getElementById('col_sel').innerHTML=document.getElementById('color').value; opener.document.getElementById('col_let_sel').innerHTML=document.getElementById('color-let').value; opener.anyadir(); document.getElementById('texto').value=''\" />");
    ventana_agregar.document.write("</body>");
}

///////////////////////////////////////////////////////////////////ELIMINACIÓN DE EVENTOS
//Abre una nueva ventana con un formulario que crea las variables
//que serán enviadas automáticamente a la función eliminar()

function eliminar_dato() {
    var ventana_eliminar = window.open('', '', 'width=350,height=200');

    ventana_eliminar.document.write("<head>");
    ventana_eliminar.document.write("<title>Eliminar Evento</title>");
    ventana_eliminar.document.write("<link rel='stylesheet' href='css/Horario.css'>");
    ventana_eliminar.document.write("</head>");
    ventana_eliminar.document.write("<body>");

    ventana_eliminar.document.write("<select class='select-box' id='dia_select'>");
    ventana_eliminar.document.write("<option disabled selected>Selecciona un día</option>");
    for (i = 0; i < horario[i].length; i++) {
        ventana_eliminar.document.write("<option value='" + i + "' >" + horario[0][i] + "</option>");
    }
    ventana_eliminar.document.write("</select><br>");

    ventana_eliminar.document.write("<select class='select-box' id='hora_select'>");
    ventana_eliminar.document.write("<option disabled selected>Selecciona una franja horaria</option>");
    for (i = 1; i < horas.length; i++) {
        ventana_eliminar.document.write("<option value='" + i + "' >" + horas[i] + "</option>");
    }
    ventana_eliminar.document.write("</select><br><br>");

    ventana_eliminar.document.write("<input type='button' value='Eliminar Evento' onclick=\"opener.document.getElementById('del_hora_sel').innerHTML=document.getElementById('hora_select').value ; opener.document.getElementById('del_dia_sel').innerHTML=document.getElementById('dia_select').value ; opener.eliminar();\" />");
    ventana_eliminar.document.write("</body>");
}
