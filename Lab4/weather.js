window.addEventListener('DOMContentLoaded', function(){

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/;
    
    let cityName = document.getElementById('searchCity');
    const locationSearch = document.getElementById('locationSearch');
    const searchBtn = document.getElementById('searchSubmit');
    const loader =this.document.querySelector('#loading');
    
    function success(pos){
        displayLoading();
        let crd = pos.coords;
        
        let latitude = `${crd.latitude}`;
        let longitude= `${crd.longitude}`;
    
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    
        let apiId = 'aadf2d7aebc25288bf65c6a1edf67b13';
        
        let apiURL= 'https://weatherdbi.herokuapp.com/data/weather/'+ latitude +','+ longitude +'';
        console.log(apiURL);
        weatherAPI(apiURL); 
    }
    
    function weatherAPI(apiURL){
       // document.getElementById('cityNotFound').classList.remove('notFoundOpen');
        fetch(apiURL)
        .then(function(res){
            console.log(res.json)
            return res.json();
        })
        .then(function(response){
            if(response.status === 'fail'){ 
                hideLoading();       
                document.getElementById('cityNotFound').classList.add('notFoundOpen');
                let err = document.getElementById('cityNotFound');
                err.innerText = 'Please refresh the window. API is down';
            }
            else{
                hideLoading();
                renderWeatherReport(response);
            }
        })
        .catch(error => console.log(error))
    }
    

    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    
        document.getElementById('cityNotFound').classList.add('notFoundOpen');
        let wrapper =  document.getElementById('cityNotFound');
        let text = `Error(${err.code}): ${err.message}`;
        wrapper.textContent = text;

        //document.getElementsByTagName('body')[0].appendChild(wrapper);
    }
    
    function getWeekDays() {
        let myDate = new Date();
        var month = myDate.getMonth();
            
        weekDays.forEach((item, index) => {
        let currentDate = (weekDays[myDate.getDay()+ index])+" , "+(monthNames[myDate.getMonth()]) + " " + myDate.getDate()+index;
        //console.log(currentDate);
        })
    }
    
    cityName.addEventListener("keyup", function(event){
        document.getElementById('cityNotFound').classList.remove('notFoundOpen');

        if(event.key === 'Enter'){
            let location = cityName.value;
            console.log(location);
            let errorMsg =  validateInputs(location);
    
            if(errorMsg.length == 0){
                weatherAPIAction(location);
            }
            else{
                document.getElementById('cityNotFound').classList.add('notFoundOpen');
                let err = document.getElementById('cityNotFound');
                err.textContent= "Not found. Put the correct city's name.";
            }
        }
    });

    locationSearch.addEventListener("click", function() {
        document.getElementById('cityNotFound').classList.remove('notFoundOpen');
        navigator.geolocation.getCurrentPosition(success, error, options);
    
    });
    
    searchBtn.addEventListener("click", function() {
        document.getElementById('cityNotFound').classList.remove('notFoundOpen');

        let location = cityName.value;
        console.log(location);
        let errorMsg =  validateInputs(location);
    
        if(errorMsg.length == 0){
            weatherAPIAction(location);
        }
        else{
            document.getElementById('cityNotFound').classList.add('notFoundOpen');
            let err = document.getElementById('cityNotFound');
            err.textContent= "Not found. Put the correct city's name.";
        }
    
    });

    function weatherAPIAction(location){
        displayLoading();
        
        fetch(`https://weatherdbi.herokuapp.com/data/weather/${location}`)
        .then(function(res){
            return res.json();
        })
        .then(function(jsonData){
        console.log(jsonData);
        if(jsonData.status === 'fail'){ 
            hideLoading();       
            document.getElementById('cityNotFound').classList.add('notFoundOpen');
            let err = document.getElementById('cityNotFound');
            err.textContent= "Not found. Put the correct city's name.";
        }
        else{
            hideLoading();
            renderWeatherReport(jsonData)
        }
      })
      .catch();
    }
    
    function renderWeatherReport(response){
        let cityName = response.region;

        let currentdate = new Date(); 

        console.log(monthNames[currentdate.getMonth()]);

        let currentDay = response.currentConditions.dayhour;
    
        let currentTemperature = response.currentConditions.temp.f;
        let typeOfClimate = response.currentConditions.comment;
        let currentWeatherIcon = response.currentConditions.iconURL;
    
        let humidity = response.currentConditions.humidity;
        let wind = response.currentConditions.wind.km;
        let precipitation = response.currentConditions.precip;
    
        console.log(response);
        document.getElementById("dateStamp").textContent=  monthNames[currentdate.getMonth()] +' '+ currentdate.getDate() +', '+ currentDay;
        document.getElementById("cityName").innerHTML = cityName;
        document.getElementById("currentTemp").textContent = currentTemperature+' °F'+'';
        document.getElementById("typeOfClimate").innerHTML = typeOfClimate;
    
        document.getElementById("wind").innerHTML = ' Wind: '+  wind+' km'+'';
        document.getElementById("humidity").innerHTML = ' Humidity: '+ humidity;
        document.getElementById("precip").innerHTML = ' Precipitation: '+ precipitation;
    
        const img = document.getElementById("currentWeatherImage");
        img.src = currentWeatherIcon;
    
        document.getElementById('8DayForecast').innerHTML='8-Day Forecast';
      
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
                    let maxTemp = eightDayForeCast[count].max_temp.f;
                    let minTemp = eightDayForeCast[count].min_temp.f;      
                    temperatureInCelcius[i].innerHTML = maxTemp +' / '+ minTemp +' °F'+'';
                    count++;
                }
            }
       })
       getWeekDays();
    }
    
    
    function validateInputs(location){
        let msg = '';
        if(location.length == 0){
            msg = 'Invalid Entry, Please enter a city name to get the information';
        }
        else if(regex.test(location)){
            msg = 'Invalid Entry, Please enter a correct city name';
        }

        return msg;
    }

    function displayLoading(){
        loader.classList.add("display");

        setTimeout(() => {
            loader.classList.remove("display");
        }, 5000);
    }

    function hideLoading(){
        document.getElementById("loading").style.display = "none";

    }
    

    navigator.geolocation.getCurrentPosition(success, error, options);
    }); //end DOMContentLoaded