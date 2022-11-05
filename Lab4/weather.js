window.addEventListener('DOMContentLoaded', function(){

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let cityName = document.getElementById('searchCity');
const searchBtn = document.getElementById('searchSubmit');

function success(pos){

    let crd = pos.coords;
    
    let latitude = `${crd.latitude}`;
    let longitude= `${crd.longitude}`;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    let apiId = 'aadf2d7aebc25288bf65c6a1edf67b13';
    
    let apiURL= 'https://weatherdbi.herokuapp.com/data/weather/'+ latitude +','+ longitude +'';
    weatherAPI(apiURL); 
}

function weatherAPI(apiURL){
    fetch(apiURL)
    .then(function(res){
        console.log(res.json)
        return res.json();
    })
    .then(function(response){
        renderWeatherReport(response);
    })
    .catch(error => console.log(error))
}


function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);

    let wrapper = document.createElement('div');
    let text = `Error(${err.code}): ${err.message}`;
    wrapper.innerHTML = text;
    document.getElementsByTagName('body')[0].appendChild(wrapper);
}

function getWeekDays() {
    let myDate = new Date();
    var month = myDate.getMonth();
        
    weekDays.forEach((item, index) => {
    let currentDate = (weekDays[myDate.getDay()+ index])+" , "+(monthNames[myDate.getMonth()]) + " " + myDate.getDate()+index;
    //console.log(currentDate);
    })
}


searchBtn.addEventListener("click", function() {
    let location = cityName.value;
    console.log(location);
  
  fetch(`https://weatherdbi.herokuapp.com/data/weather/${location}`)
  .then(function(res){
    return res.json();
  })
  .then(function(jsonData){
    console.log(jsonData);
    if(jsonData.status === 'fail'){
        document.getElementById('cityNotFound').classList.add('notFoundOpen');

        console.log(jsonData.message);
    }
    else{
        renderWeatherReport(jsonData)
    }
  })
  .catch();
});

function renderCurrentWeatherConditions(){
    

}

function renderWeatherReport(response){
    let cityName = response.region;
    let epochDate = response.currentConditions.dayhour;

    let currentTemperature = response.currentConditions.temp.c;
    let typeOfClimate = response.currentConditions.comment;
    let currentWeatherIcon = response.currentConditions.iconURL;

    let humidity = response.currentConditions.humidity;
    let wind = response.currentConditions.wind.km;
    let precipitation = response.currentConditions.precip;

    console.log(response);
    document.getElementById("orange-text").textContent=epochDate;
    document.getElementById("cityName").innerHTML = cityName;
    document.getElementById("currentTemp").textContent = currentTemperature+' °C'+'';
    document.getElementById("typeOfClimate").innerHTML = typeOfClimate;

    document.getElementById("wind").innerHTML = ' Wind: '+  wind+' km'+'';
    document.getElementById("humidity").innerHTML = ' Humidity: '+ humidity;
    document.getElementById("precip").innerHTML = ' Precipitation: '+ precipitation;

    const img = document.getElementById("currentWeatherImage");
    img.src = currentWeatherIcon;
  
   let eightDayForeCast = response.next_days;
   eightDayForeCast.forEach((item, index) => {

       const weekDay = document.querySelectorAll("#weekday");
       const image = document.querySelectorAll("#weatherImage");
       let counter = 0;
       while(counter<8){
        for (var i = 0; i < weekDay.length; i++) {
            let icon = eightDayForeCast[counter].iconURL;
            let week = eightDayForeCast[counter].day;
            weekDay[i].innerHTML = week;
            image[i].src=icon;
            counter++;
            }
       }

       const climate = document.querySelectorAll("#climateType");
       const temperatureInCelcius = document.querySelectorAll("#temp");
       let count = 0;
        while(count<8){
            for (var i = 0; i < climate.length; i++) {
                climate[i].innerHTML = eightDayForeCast[count].comment;
                let maxTemp = eightDayForeCast[count].max_temp.c;
                let minTemp = eightDayForeCast[count].min_temp.c;      
                temperatureInCelcius[i].innerHTML = maxTemp +' / '+ minTemp +' °C'+'';
                count++;
            }
        }
   })
   getWeekDays();
}


function validateInputs(billAmount, tipPercent){
    let msg = '';
    if(isNaN(billAmount)){
        msg = 'Invalid Amount, please enter a valid number';
    }
    else if(isNaN(tipPercent)){
        msg = 'Invalid Tip Percentage, please select a valid input';
    }
    else if(billAmount < 0){
        msg = 'Bill Amount cannot be negative, please enter a valid value';
    }
    else if(!(tipPercent >= 0 && tipPercent <=100)){
        msg = 'Tip percentage should be between 0 and 100 inclusive, please select a valid range';
    }
    return msg;
}

navigator.geolocation.getCurrentPosition(success, error, options);
}); //end DOMContentLoaded