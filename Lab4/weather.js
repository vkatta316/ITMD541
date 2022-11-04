window.addEventListener('DOMContentLoaded', function(){

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
        let cityName = response.region;
        let epochDate = response.currentConditions.dayhour;
        console.log(response);
        document.getElementById("orange-text").textContent=epochDate;
        document.getElementById("cityName").innerHTML = cityName;
      
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


navigator.geolocation.getCurrentPosition(success, error, options);

}); //end DOMContentLoaded