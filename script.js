const wrapper = document.querySelector(".wrapper"),
infoTxt = document.querySelector(".info-txt"),
ciudad = document.querySelector("input"),
ubicacion = document.querySelector("button"),
clima = wrapper.querySelector(".weather-part"),
wIcon = clima.querySelector("img"),
x = document.getElementById("contenedor");
x.style.display = "none";

let api;

ciudad.addEventListener("keyup", e =>{
    if(e.key == "Enter" && ciudad.value != ""){
        solicitudApi(ciudad.value);
    }
});

ubicacion.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(ubicacionValida, mensajeError);
    }else{
        alert("Tu navegador no permite detectar tu ubicacion");
    }
});

function solicitudApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=659448f530b1011e83f181f7e97df12e`;
    fetchDatos();
}

function ubicacionValida(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=659448f530b1011e83f181f7e97df12e`;
    fetchDatos();
}

function mensajeError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchDatos(){
    infoTxt.innerText = "Obteniendo informacion sobre el clima...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => datosClima(result)).catch(() =>{
        infoTxt.innerText = "Algo salio mal";
        infoTxt.classList.replace("Pendiente", "error");
    });
}

function datosClima(info){
        x.style.display = "block";

    if(info.cod == "404"){
        infoTxt.classList.replace("Pendiente", "error");
        infoTxt.innerText = `${inputField.value} no es una ciudad valida`;
    }else{
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

