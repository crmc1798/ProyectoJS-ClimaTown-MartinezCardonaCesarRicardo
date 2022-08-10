//se declaran las constantes para desplegar y obtener informacion del DOM
const wrapper = document.querySelector(".wrapper"),
infoTxt = document.querySelector(".info-txt"),
ciudad = document.querySelector("input"),
ubicacion = document.querySelector("button"),
clima = wrapper.querySelector(".weather-part"),
wIcon = clima.querySelector("img"),
x = document.getElementById("contenedor");
x.style.display = "none";

//variable para asignar la clave de la api
let api;

//al precionar la tecla enter depsues de escribir la ciduad se obtiene la informacion escrita para procesarla y hacer una solicitud a la api
ciudad.addEventListener("keyup", e =>{
    //en caso de no escribir nada no se continua
    if(e.key == "Enter" && ciudad.value != ""){
        //funcion para hacer la solucitud a la api
        solicitudApi(ciudad.value);
    }
});

//este evento se asign a al boton para continuar con la solicitud de la ubicacion proporcionada por el navegador en forma de coordenadas
ubicacion.addEventListener("click", () =>{
    //en caso de obtener las coordenadas se encian a la funcion ubicacion valida que igual hace una solicitud a la api pero con las coordenadas, en caso de que no muestra una alerta
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(ubicacionValida, mensajeError);
    }else{
        Swal.fire({
            title: 'Tu navegador no permite detectar tu ubicacion',
            text: SON.stringify(error),
            icon: 'error',
            confirmButtonText: 'Continuar'
        });
    }
});

//funcion para realizar una solicitud a la api con la ciudad como variable, despues de esta esta la clave proporcionada por la api, ya que se obtienen se llama a la funcion fetchdatos
function solicitudApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=659448f530b1011e83f181f7e97df12e`;
    fetchDatos();
}

//esta funcion hace lo mismoq ue la anterior solo que con las coordenadas en vez de la ciudad
function ubicacionValida(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=659448f530b1011e83f181f7e97df12e`;
    fetchDatos();
}

//mensaje de error en el DOM
function mensajeError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

//en esta funcion hacemos un fetch de los datos y los mandamos a la funcion datos clima
function fetchDatos(){
    infoTxt.innerText = "Obteniendo informacion sobre el clima...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => datosClima(result)).catch(() =>{
        infoTxt.innerText = "Algo salio mal";
        infoTxt.classList.replace("Pendiente", "error");
    });
}


//esta fucnion se encarga de desplegar en el DOM los datos obtenidos por la api, primero se despliega la zona que estaba oculta, despues segun el la variable id, seleccionamos una imagen que es correspondiente
//a una descripccion general del clima, estas imagenes fueron obtenidas de la funete mostrada mas adelante
function datosClima(info){
        x.style.display = "block";

    if(info.cod == "404"){
        infoTxt.classList.replace("Pendiente", "error");
        infoTxt.innerText = `${inputField.value} no es una ciudad valida`;
    }else{
        //se seleccionan los datos que nos inmportan del json en forma de objetos y arrays
        console.log(info);
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        //imagenes usadas del sitio https://icons8.com/icon/set/weather/officel
        if(id == 800){
            wIcon.src = "https://img.icons8.com/officel/80/000000/sun.png";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "https://img.icons8.com/officel/80/000000/storm.png";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "https://img.icons8.com/officel/80/000000/snow.png";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "https://img.icons8.com/officel/80/000000/fog-day.png";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "https://img.icons8.com/officel/80/000000/partly-cloudy-day.png";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "https://img.icons8.com/officel/80/000000/rain.png";
        }
        
        clima.querySelector(".temp .numb").innerText = Math.floor(temp);
        clima.querySelector(".desc").innerText = description;//no supe como traducir la descripccion que manda la api de ingles
        clima.querySelector(".lugar span").innerText = `${city}, ${country}`;
        clima.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        clima.querySelector(".hum .hum-2").innerText = `${humidity}%`;
        infoTxt.classList.remove("Pendiente", "error");
        infoTxt.innerText = "";
        ciudad.value = "";
        wrapper.classList.add("active");
    }
}

