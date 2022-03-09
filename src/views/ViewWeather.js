import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import {weatherOptions, weatherHumidityOptions, weatherWindOptions} from "components/Weather/Options.js"

function get_date_to_display(key)
{
  const date_to_display = new Date(key);
  let currentLocaleDate = date_to_display.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'});
  return currentLocaleDate
}

function ViewWeather() {
  const [days, setDays] = useState([]);
  const [all_data, setAllData] = useState([]);

      const slides = days.map((day, input) => {
    return (

      <Col key={8*input} md="12">
      <Card>
        <CardHeader>
          <CardTitle tag="h5">{day["day"]}</CardTitle>
        </CardHeader>
        <CardBody>


<Row key={8*input+1}>
<Col key={8*input+2} lg="4" md="12" sm="12">
  <Line key={8*input+5}
                  data={day["data"]}
                  options={weatherOptions}
                  width={400}
                  height={200}
                />
</Col>
<Col key={8*input+3} lg="4" md="6" sm="12">
  <Line key={8*input+4}
                  data={day["dataHumidity"]}
                  options={weatherHumidityOptions}
                  width={400}
                  height={200}
                />
</Col>
<Col key={8*input+5} lg="4" md="6" sm="12">
  <Line key={8*input+6}
      data={day["dataWind"]}
      options={weatherWindOptions}
      width={400}
      height={200}
    />
</Col>
</Row>


</CardBody>
        <CardFooter>
        <span>Source : <a target="top" href="https://www.infoclimat.fr/api-previsions-meteo.html?id=2988507&cntry=FR">infoclimat.fr</a></span>
        </CardFooter>     
      </Card>
    </Col>

    );
    })

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

        let evolutions = {}
        let alldata = []
        for (let key in result)
        {
          if (key === "request_state" && result[key] !== 200)
            break;
          if (!key.startsWith("2"))
            continue;
          
          // get the current date
          let current_date = key.split(" ")[0]

          // create a new entry if this date does not exist yet
          if (current_date in evolutions === false)
            evolutions[current_date] = {"labels": [], "temperatures":[], "rain": [], "humidity": [], "windspeed": [], "windgust": []}

          // store the label
          let label = key.split(" ")[1].slice(0,-3)
          evolutions[current_date]["labels"].push(label)

          const walking_data = result[key]

          // store the temperature
          evolutions[current_date]["temperatures"].push(walking_data["temperature"]["2m"] - 273.15)

          // store the rain
          evolutions[current_date]["rain"].push(walking_data["pluie"])

          // store the humidity
          evolutions[current_date]["humidity"].push(walking_data["humidite"]["2m"])

          // store wind info
          evolutions[current_date]["windspeed"].push(walking_data["vent_moyen"]["10m"])
          evolutions[current_date]["windgust"].push(walking_data["vent_rafales"]["10m"])

          let current_data = {}
          current_data["date"] = key.split(" ")[0]
          current_data["hour"] = key.split(" ")[1]
          let temperature = walking_data["temperature"]["2m"] - 273.15
          temperature = Math.round(temperature * 10) / 10
          current_data["temperature"] =  temperature
          current_data["rain"] = walking_data["pluie"]
          current_data["humidity"] = walking_data["humidite"]["2m"] // humidite relative
          current_data["icon"] = ""//value.ICON
          current_data["windspeed"] = walking_data["vent_moyen"]["10m"] // moyenne
          current_data["windgust"] = walking_data["vent_rafales"]["10m"] // rafale
          current_data["winddir"] = walking_data["vent_direction"]["10m"] // direction
          alldata.push(current_data)
        }
        setAllData(alldata)

        let days = []
        Object.keys(evolutions).map((key) => {
          let day = {"day": get_date_to_display(key),
          "data" : {
            labels: evolutions[key]["labels"],
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
                data: evolutions[key]["temperatures"],
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
                data: evolutions[key]["rain"],
                yAxisID: 'yRain',
              },
            ],
        },
        "dataHumidity" : {
          labels: evolutions[key]["labels"],
          datasets: [
            {
              label: "Humidité",
              type: "line",
              borderColor: "#3e8ad6",
              backgroundColor: "#3e8ad6",
              pointRadius: 2,
              pointHoverRadius: 10,
              borderWidth: 3,
              tension: 0.4,
              fill: false,
              data: evolutions[key]["humidity"],
              yAxisID: 'y',
            }
          ],
      },
        "dataWind" : {
          labels: evolutions[key]["labels"],
          datasets: [
            {
              label: "Vent moyen",
              type: "line",
              borderColor: "#15c257",
              backgroundColor: "#15c257",
              pointRadius: 2,
              pointHoverRadius: 10,
              borderWidth: 3,
              tension: 0.2,
              fill: false,
              data: evolutions[key]["windspeed"],
              yAxisID: 'ySpeed',
            },
            {
              label: "Rafales",
              type: "line",
              borderColor: "#fc1c03",
              backgroundColor: "#fc1c03",
              pointRadius: 2,
              pointHoverRadius: 10,
              borderWidth: 3,
              tension: 0.2,
              fill: false,
              data: evolutions[key]["windgust"],
              yAxisID: 'ySpeed',
            },
          ],
      }
    }
        days.push(day)})

          days.shift()
      setDays(days)
    })
    .catch( err => {
        console.log("!!! Error !!! : "+ err)
        //err.text().then( errorMessage => {
          //  console.log(errorMessage)
          //this.props.dispatch(displayTheError(errorMessage))
      });
  }, []);

  /*
  useEffect(() => {
    fetch(`https://www.prevision-meteo.ch/services/json/lat=44.840775685860585lng=-0.7761190254573928`)
    .then( response => {
        if (!response.ok) { throw response }
        return response.json()  //we only get here if there is no error
      })
    .then(result => {
        console.log(result)

        let alldata = []
        let labels = []
        let values = []
        new Set([result.fcst_day_0, result.fcst_day_1, result.fcst_day_2, result.fcst_day_3, result.fcst_day_4]).forEach(daily_data => {
            let current_date = daily_data.date
            for (const [key, value] of Object.entries(daily_data.hourly_data)) {
                //labels.push(new Date(current_date.split('.').reverse().join('/') + " " + key.replace("H", ":")))
                let label = ""
                if (key === "0H00")
                  label = current_date

                labels.push(label)
                values.push(value.TMP2m)
                let current_data = {}
                current_data["date"] = daily_data.date
                current_data["hour"] = key
                current_data["temperature"] = value.TMP2m
                current_data["humidity"] = value.RH2m // humidite relative
                current_data["icon"] = value.ICON
                current_data["windspeed"] = value.WNDSPD10m // moyenne
                current_data["windgust"] = value.WNDGUST10m // rafale
                current_data["winddir"] = value.WNDDIRCARD10 // direction
                alldata.push(current_data)
                //data.push([new Date(current_date.split('.').reverse().join('/') + " " + key.replace("H", ":")), value.TMP2m])
            }
        });

        let data = {labels: labels, datasets: [{
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: false,
          data: values
        }]}
        //console.log(data)
        setTemperaturesEvolution(data)
        console.log(alldata)
        setAllData(alldata)
    })
    .catch( err => {
        console.log(err)
        //err.text().then( errorMessage => {
          //  console.log(errorMessage)
          //this.props.dispatch(displayTheError(errorMessage))
      });
  }, []);
  */

  return (
    <>
      <div className="content">
      <Row>
{slides}
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Détails</CardTitle>
              </CardHeader>
              <CardBody>
                <Table striped bordered responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Date</th>
                      <th>Heure</th>
                      <th>Température</th>
                      <th>Pluie</th>
                      <th>Humidité</th>
                      <th>Vent</th>
                      <th>Rafale</th>
                      <th>Direction</th>
                    </tr>
                  </thead>
                  <tbody>

        {all_data && all_data.map(( current_data, index ) => {
          return (
            <tr key={index}>
              <td>{current_data["date"]}</td>
              <td>{current_data["hour"]}</td>
              <td>{current_data["temperature"]}</td>
              <td>{current_data["rain"]}</td>
              <td>{current_data["humidity"]}</td>
              <td>{current_data["windspeed"]}</td>
              <td>{current_data["windgust"]}</td>
              <td>{current_data["winddir"]}</td>
            </tr>
          );
        })}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              <span>Source : <a target="top" href="https://www.infoclimat.fr/api-previsions-meteo.html?id=2988507&cntry=FR">infoclimat.fr</a></span>
              </CardFooter>     
            </Card>
          </Col>
        </Row>        
      </div>
    </>
  );
}

export default ViewWeather;
