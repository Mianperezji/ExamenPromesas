//SELECT con los usuarios
let usuariosSel;
//JSON con todos los usuarios
let usuarios;

//Div donde cargaremos los datos del usuario seleccionado
let datosUsuarios;

//Div donde tenemos los botones. Permanecerá oculto mientras no haya seleccionado un usuario
let botonera;

//Div donde mostraremos los posts
let zonaPosts;

//Div donde mostraremos las fotos;
let zonaAlbums;

//Div donde mostraremos las fotos;
let zonaFotos;

//Boton Posts
let mostrarPosts;

//Boton Fotos
let mostrarFotos;

let idUser = 0;

var parametros = {tipo:"", clase:"", id:"", texto:"", src:"", href:"", value:""};


window.onload = async function() {
    //Seleccionamos el SELECT
    usuariosSel = document.querySelector("#usuarios");
    //Añadimos change al SELECT
    usuariosSel.addEventListener("change", mostrarDatosUsuario);
    //Seleccionamos el div donde cargaremos los datos de los usuarios.
    datosUsuarios = document.querySelector("#info");

    zonaPosts = document.getElementById("posts");
    zonaFotos = document.getElementById("fotos");
    zonaAlbums = document.getElementById("albums");

    mostrarPosts = document.getElementById("mostrarPosts");
    mostrarFotos = document.getElementById("mostrarFotos");

    mostrarPosts.addEventListener("click", showPosts);
    mostrarFotos.addEventListener("click", showAlbums);

    botonera = document.querySelector("#botonera");

    usuarios = await cargarUsuarios();


    cargarSelectUsuarios();
}

//Obtenemos el JSON de la dirección indicada
async function cargarUsuarios() {
    let url = "https://jsonplaceholder.typicode.com/users";
    //A COMPLETAR

    
}


//Cargamos el JSON de usuarios en el select
//<option value=[id del usuario]>[nombre del usuario]</option>
function cargarSelectUsuarios() {
    let url = "https://jsonplaceholder.typicode.com/users";

    fetch(url)
  .then(response => response.json())
  .then(function(data){
      let iteraciones = Object.keys(data).length;
    for (let i = 0; i< iteraciones; i++){
        let option = document.createElement("option");
        usuariosSel.appendChild(option);
        option.value = data[i].id;
        option.innerText= data[i].name
        
        
        
      }
      reiniciarParametros();
    })
    
    //A COMPLETAR
}

//Función genérica para la creación de elementos
function crearElemento(atributos) {
    //A COMPLETAR SI SE QUIERE
}

//Buscamos la ciudad sugerida.
async function getCity(lat, lng) {
    let url = `https://geocode.xyz/${lat},${lng}?json=1`;
    //A COMPLETAR

    return await fetch(url)
    .then(response => response.json())
    .then(data => data.city);


}
//Filtrado de info utilizando array.filter u otro sistema
async function mostrarDatosUsuario() {
    //Borro los hijos para que no se apinyen los divs
    removeAllChildNodes(document.getElementById("info"));
    let url = "https://jsonplaceholder.typicode.com/users";
    const LATITUD_LONDRES = 51.50853;
    const LONGITUD_LONDRES = -0.12574;
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    zonaFotos.innerHTML = "";
    //A COMPLETAR
    botonera.classList.remove("oculto");


    //Elementos html que construire
    //padre de todo
    let div = document.createElement("div");
    //foto
    let cajafoto = document.createElement("div");
    let foto = document.createElement("img");
    //nombre
    let tituloNombre = document.createElement("div");
    let nombre = document.createElement("div");
    //edad
    let tituloedad = document.createElement("div");
    let edad = document.createElement("div");
    //email
    let email = document.createElement("div");
    let descripcionEmail = document.createElement("div");
    let enlaceEmail = document.createElement("a");
    //ciudad
    let ciudad = document.createElement("div");
    let descripcionCiudad = document.createElement("div");
    //WEB
    let web = document.createElement("div");
    let descripcionWeb = document.createElement("div");
    let enlaceWeb = document.createElement("a");
    //creo el div donde ira toda la informacion
    datosUsuarios.appendChild(div);
    //creo la foto donde indicara el genero
    foto.src = "img/"+await getGender(usuariosSel.options[usuariosSel.selectedIndex].text)+".png";
    div.appendChild(cajafoto)
    cajafoto.appendChild(foto);
    cajafoto.id = "foto";
    //Creo el p del nombre;
    nombre.innerText=usuariosSel.options[usuariosSel.selectedIndex].text;
    nombre.className="descripcion";
    tituloNombre.innerText="Nombre";
    tituloNombre.className="titulo";
    div.appendChild(tituloNombre);
    div.appendChild(nombre);
    // Creo el div de la edad
    tituloedad.innerText="Edad";
    tituloedad.className="titulo";
    edad.innerText=await getAge(usuariosSel.options[usuariosSel.selectedIndex].text)+" años";
    edad.className="descripcion";
    div.appendChild(tituloedad);
    div.appendChild(edad);
    //creo los divs del email
    div.appendChild(email);
    email.className="titulo";
    email.innerText="email"
    div.appendChild(descripcionEmail);
    descripcionEmail.className="descripcion";
    descripcionEmail.appendChild(enlaceEmail);
    //divs ciudad
    div.appendChild(ciudad);
    ciudad.className="titulo";
    ciudad.innerText="Ciudad";
    descripcionCiudad.innerText = await  getCity(LATITUD_LONDRES,LONGITUD_LONDRES);


    div.appendChild(descripcionCiudad);
    descripcionCiudad.className="descripcion";

    //divs web
    div.appendChild(web);
    web.className="titulo";
    web.innerText="Web";
    div.appendChild(descripcionWeb);
    descripcionWeb.className="descripcion";
    descripcionWeb.appendChild(enlaceWeb);

    //Recorro el json para poner los datos en el div
    await fetch(url)
  .then(response => response.json())
  .then(function(data){
    let iteraciones = Object.keys(data).length;
    let indiceObjeto =0;

    for  (let i = 0; i < iteraciones; i++){
        if (data[i].name==nombre.innerText){
            enlaceEmail.href=data[i].email;
            enlaceEmail.innerText = data[i].email;
            enlaceWeb.href=data[i].website;
            enlaceWeb.innerText=data[i].website;   
        }
    }

  })
  //Problemas de la api, deja hacer muy pocas consultas gratis
  if (descripcionCiudad.innerText=="undefined"){
      descripcionCiudad.innerText ="London";
  }
   
}

//Reiniciamos los parámetros para crear elementos.
function reiniciarParametros() {
    parametros = {tipo:"", clase:"", id:"", texto:"", src:"", href:"", value:""};
}

//Mostramos los posts en el div con id="posts"
async function showPosts() {
    zonaPosts.innerHTML = "";
    //Borro los albums si los hubiese
    removeAllChildNodes(zonaAlbums);
    removeAllChildNodes(zonaFotos);
    let postObject = await getPosts(await getIdUser());

    let iteraciones = Object.keys(postObject).length;
    
    //Creo los posts
    for (let i = 0; i < iteraciones; i++){
        //divs
        let post = document.createElement("div");
        let titular = document.createElement("div");
        let cuerpo = document.createElement("div");
        //clases    
        post.className="post";
        titular.className="titular";
        cuerpo.className="cuerpo";
        //creacion
        document.getElementById("posts").appendChild(post);
        post.appendChild(titular);
        post.appendChild(cuerpo);
        titular.innerText=postObject[i].title;
        cuerpo.innerText=postObject[i].body;
    }
     
    
}

//Obtenemos los posts del servidor
async function getPosts(idUser) {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
    //A COMPLETAR
    return fetch(url)
  .then(response => response.json())
  .then(data => data)
}

//Mostramos los albumes en el div con id="albumes"
async function showAlbums() {
    removeAllChildNodes(zonaPosts);
    let iteraciones;

    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    //A COMPLETAR

    albums = await getAlbums(await getIdUser());
    iteraciones = Object.keys(albums).length;

    for (let i = 0; i< iteraciones; i++){
        let a = document.createElement("a");
        zonaAlbums.appendChild(a);
        a.innerText= albums[i].title;
        a.id = albums[i].id;
        a.className="album";
        a.href="#";
        a.addEventListener("click", showFotos);
    }

    



}

//Obtenemos los albumes del servidor
async function getAlbums(idUser) {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/albums`;
    //A COMPLETAR

    return fetch(url)
  .then(response => response.json())
  .then(data => data)
}

//Mostramos las fotos en el div id="fotos"
async function showFotos() {
    let iteraciones;
    zonaFotos.innerHTML = "";
    removeAllChildNodes(zonaFotos);

    fotos = await getFotos(this.id);
    iteraciones = Object.keys(albums).length;

    for (let i = 0; i< iteraciones; i++){
        let img = document.createElement("img");
        zonaFotos.appendChild(img);
        img.src = fotos[i].thumbnailUrl;
        img.className="foto";
    }


    //A COMPLETAR
}

//Obtenemos las fotos del servidor
async function getFotos(idAlbum) {
    url = `https://jsonplaceholder.typicode.com/albums/${idAlbum}/photos`;
    //A COMPLETAR

    return fetch(url)
  .then(response => response.json())
  .then(data => data)
}

async function getGender(name){
    let url;
    //Como el nombre de usuario solo importa el primero, separo el segundo nombre
    let nameusuario = name.split(" ");
    //Al hacer split puede darse el caso de que el nombre sea Mrs, de esta forma lo solventamos
    if (nameusuario[0]=="Mrs."||nameusuario[0]=="Mr."){
        url = `https://api.genderize.io?name=${nameusuario[1]}`
    }else{
        url = `https://api.genderize.io?name=${nameusuario[0]}`

    }
   return await fetch(url)
  .then(response => response.json())
  .then(genero => genero.gender

  )
}

async function getAge(name){
    let nameusuario = name.split(" ");
    let url;

    //Lo mismo que el anterior
    if (nameusuario[0]=="Mrs."||nameusuario[0]=="Mr."){
         url = `https://api.agify.io/?name=${nameusuario[1]}`
    }else{
         url = `https://api.agify.io/?name=${nameusuario[0]}`

    }

    return await fetch(url)
  .then(response => response.json())
  .then(edad => edad.age

  )

}

//Funcion para eliminar todos los hijos de un elemento
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Funcion que devuelve el id del usuario cargado
async function getIdUser (){

    let url = "https://jsonplaceholder.typicode.com/users";
    let nombre = document.getElementsByClassName("descripcion");
    return fetch(url)
  .then(response => response.json())
  .then(function(data){
    let iteraciones = Object.keys(data).length;

    for (let i = 0; i < iteraciones; i++){
        if (data[i].name==nombre[0].innerText){
            return data[i].id;            
        }
    }

  })

}
