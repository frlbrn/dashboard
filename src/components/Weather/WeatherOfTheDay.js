import React, {useState, useEffect} from 'react'
import { Line } from "react-chartjs-2";
import {weatherOptions} from "components/Weather/Options.js"

const WeatherOfTheDay = props => {
    const [evolutions, setEvolutions] = useState({});
     
    useEffect(() => {
        //
        // source : https://www.infoclimat.fr/api-previsions-meteo.html?id=2988507&cntry=FR
        //
        const proxy = ""//"https://cors-anywhere.herokuapp.com/"
        const url = "https://www.infoclimat.fr/public-api/gfs/json?_ll=44.84049,-0.77563&_auth=BR8FEgF%2FUXNTfgE2VSMCK1gwV2INewIlUy9QMwhtAn9WPQRlBmZQNlM9WicCLQM1BSgObQA7BzcCaQZ%2BCXsFZAVvBWkBalE2UzwBZFV6AilYdlc2DS0CJVM5UDUIewJgVjIEZQZ7UDNTP1omAjsDNgUpDnEAPgc5AmUGZQltBWIFbgVgAWdRNFMjAXxVYwI0WGtXZQ1nAmtTYlBjCDYCYVZmBGUGMFA2UyJaOQI7AzAFNQ5tADkHPAJmBn4JewUfBRUFfAEiUXFTaQElVXgCY1g1V2M%3D&_c=64cc221ef16e8953e20e21e14c238206"
        fetch(proxy+url)
        .then( response => {
            if (!response.ok) { throw response }
            return response.json()  //we only get here if there is no error
          })
        .then(result => {

            let currentDate = new Date()
            let date = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            if (month < 10)
                month = '0'+month
            if (date < 10)
                date = '0'+date
            let year = currentDate.getFullYear();
            currentDate = year+"-"+month+"-"+date

            let labels = []
            let evol_temperatures = []
            let evol_rain = []
            for (let key in result)
            {
              if (key === "request_state" && result[key] !== 200)
                break;
              if (!key.startsWith("2"))
                continue;
              
              let label = ""
              if (key.split(" ")[0] !== currentDate)
                continue;
              label = key.split(" ")[1]
              labels.push(label)
    
              const walking_data = result[key]
              evol_temperatures.push(walking_data["temperature"]["2m"] - 273.15)
              evol_rain.push(walking_data["pluie"])
            }
    
            setEvolutions({
            data: {
                labels: labels,
                datasets: [
                  {
                    label: "Températures",
                    type: "line",
                    borderColor: "#6bd098",
                    backgroundColor: "#6bd098",
                    pointRadius: 2,
                    pointHoverRadius: 10,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: false,
                    data: evol_temperatures,
                    yAxisID: 'yTemp',
                  },
                  {
                    label: "Précipitations",
                    type: "bar",
                    borderColor: "#3e8ad6",
                    backgroundColor: "#3e8ad6",
                    pointRadius: 2,
                    pointHoverRadius: 10,
                    borderWidth: 3,
                    tension: 0,
                    fill: false,
                    data: evol_rain,
                    yAxisID: 'yRain',
                  },
                ],
            },
          })
        })
        .catch( err => {
            console.log("!!! Error !!! : "+ err)
            //err.text().then( errorMessage => {
              //  console.log(errorMessage)
              //this.props.dispatch(displayTheError(errorMessage))
          });
    }, []);
    
    return (
    <>
        <Line
            data={evolutions.data}
            options={weatherOptions}
            width={400}
            height={200}
        />
    </>
    );
}

export default WeatherOfTheDay
