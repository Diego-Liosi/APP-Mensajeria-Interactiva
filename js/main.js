let channelarray = [{ channel: '#general', textchat: '' }]; //Creacion del array de canales con su valor por default
let idcounter = 0;
let activechannel = 0;                                      //Variable numerica que define el canal que esta activo, la posicion dentro del channelarray

//USER NAME
//Definicion del User Name
var username = prompt('Ingresar Nombre de Usuario');
let usertag = document.getElementById("user-name");
let userelement = document.createElement("p");
userelement.innerHTML = username;
usertag.appendChild(userelement);

//AGRAGAR NUEVOS CANALES.
//Function para desplegar el input de nuevo canal.
function newchannel() {
    document.getElementById('divaddchannel').style = 'display:block';                 //Desplegar el input
    document.getElementById('inputchannel').style = 'color:black; font-style:normal'; //Establecer parametros de estilo
    document.getElementById('inputchannel').focus();                                  //Ubicar el cursor sobre el input
}

//Creacion de nuevo canal en el channelarray y porterior adicion al listado de canales en HTML.
function addchannel() {
    idcounter = ++idcounter;                                            //incremental contador de id
    let channelname = document.getElementById("inputchannel");          //levantar el nombre del canal
    let object = { channel: '#' + channelname.value, textchat: '' };    //declarar objeto para el nuevo canal con channel y textchat
    channelarray[idcounter] = object;                                   //sumar en la ultima posicion del array de canales el objeto

    let channellist = document.getElementById("channel-list");          //traer el div con el listado de canales
    let channeldiv = document.createElement("div");                     //crear elemento div

    channeldiv.innerHTML = '#' + channelname.value;                     //cargar el valor de channelname al channeldiv en HTML
    channeldiv.id = '#' + channelname.value;                            //asignar id al canal

    channellist.appendChild(channeldiv);                                //sumar el nuevo div de canal al div del html

    channelname.value = "";                                             //limpiar el channel name

    document.getElementById('divaddchannel').style = 'display:none';    //Ocultar el input de canales

    document.getElementById('input-message').focus();                                  //Ubicar el cursor sobre el input de mensajes
};

//Llamar a la funcion addchannel() pulsando la tecla enter.
document.getElementById("inputchannel").addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        addchannel();
    } else { }
});

//ACTIVACION/CAMBIO DE CANAL
//Funcion para cambiar canal
function changechannel(activechannel) {
    let chatobject = document.getElementById("chat-board");                 //vincular con el cuerpo de la conversacion
    while (chatobject.firstChild) {                                         //limpiar el chat
        chatobject.removeChild(chatobject.firstChild)
    };
    let messagebody = document.createElement("div");
    messagebody.innerHTML = (channelarray[activechannel].textchat);
    chatobject.appendChild(messagebody);

    document.getElementById("input-message").focus();                       //Ubicar el cursor sobre el input

    let changetitle = document.getElementById("title");
    while (changetitle.firstChild) {                                        //vaciar el Nodo Div para el titulo del header
        changetitle.removeChild(changetitle.firstChild);
    };
    let title = document.createElement("h2");
    title.className = 'header1';                                            //asignar caracteristicas para consevar el style
    title.innerHTML = (channelarray[activechannel].channel);
    changetitle.appendChild(title);
}

//Cambiar de canal con un click
document.getElementById('channel-list').addEventListener("click", function () {    //llama a la funcion changechannel que cambia de canal
    let aaaa = document.getElementById(document.getSelection().focusNode.data);    //getSelection devuelve un objeto del elemento seleccionado, luego se busca dentro de ese objeto el texto contenido en el div;

    for (var i = 0; i < channelarray.length; ++i) {                                                //Bucle: iterar en todos los canales del array
        if (aaaa.id === channelarray[i].channel) {                                                 
            activechannel = i;                                                                                     //asignar el valor al canal activo
            document.getElementById(channelarray[i].channel).style = 'background-color: #6786a3; color: #113555;'; //Establecer parametros de estilo
            changechannel(activechannel);                                                                          //llamar a funcion de cambio de canal
        } else {
            document.getElementById(channelarray[i].channel).style = 'background-color: #113555;'; //Reestablecer formato de estilo para aquellos canales que no fueron seleccionados
        }

    }
});

//ESCRIBIR MENSAJES EN EL CHAT-BOARD. 
//Function para adicionar texto al array.
function addmessage() {
    let message = document.getElementById("input-message");                                                            //levantar el mensaje
    var date = new Date();                                                                                             //Obtener fecha y hora
    dateformated = date.toLocaleString();                                                                              //Dar formato de fecha y hora
    let formatedmessage = '[' + dateformated + '] - ' + username + ' dice:' + '<br>' + message.value + '<br>' + '<br>' //dar formato el mensaje

    channelarray[activechannel].textchat = channelarray[activechannel].textchat.concat(formatedmessage);    //sumar string con el nuevo mensaje, en la cola de mensajes del canal

    let messagebody = document.createElement("div");

    messagebody.innerHTML = (channelarray[activechannel].textchat);

    let chatobject = document.getElementById("chat-board");        //vincular con el cuerpo de la conversacion
    while (chatobject.firstChild) {                                //limpiar el chat
        chatobject.removeChild(chatobject.firstChild);
    };

    chatobject.appendChild(messagebody);

    message.value = "";                                            //limpiar input de mensajes
};

//Llamar a la funcion addmessage() pulsando la tecla enter.
document.getElementById("input-message").addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        addmessage();
    } else { }
});

//SEARCH
//Function search que permite buscar dentro del channelarray el string requerido en el input, y devueve la posicion dentro del array, asi se peude saber cual es el canal que hay que activar. 
function search() {
    for (var i = 0; i < channelarray.length; ++i) {
        let stringsearched = document.getElementById("search")
        let bodychat = channelarray[i].textchat
        if (bodychat.includes(stringsearched.value)) {
            activechannel = i;
            return changechannel(activechannel);
        }
        else { }
    }
}

//Llamar a la funcion search() pulsando la tecla enter.
document.getElementById("search").addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        search();
    } else { }
});
