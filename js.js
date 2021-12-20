"use strict";

let Search = class {
  constructor(city, appID) {
    this.city = city;
    this.appID = appID;
  }
  async requestForInfo() {
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.appID}&units=metric`;

    const res1 = await fetch(url1);
    const data1 = await res1.json();
    this.useOfInfo(data1);
    const url2 = await data1.weather[0].icon;
    const res2 = await fetch(
      `https://openweathermap.org/img/wn/${url2}@2x.png`
    );
    this.useOfUrl(res2.url);

    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.appID}&units=metric
    //   `
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.useOfInfo(data);
    //     return data;
    //   })
    //   .then((data) => {
    //     let iconID = data.weather[0].icon;
    //     fetch(`https://openweathermap.org/img/wn/${iconID}@2x.png`).then(
    //       (response) => {
    //         this.useOfUrl(response.url);
    //       }
    //     );
    //   });
  }
  useOfInfo({ name, sys: { country }, main: { temp } }) {
    let temperature = document.getElementById("temperature_numeral");
    temperature.textContent = temp;

    let unit = document.getElementById("temperature_type");
    unit.textContent = "°C";

    let name_country = document.getElementById("country_text");
    name_country.textContent = `${country}, ${name}`;

    let childsForm = document.querySelector(".radioBox").childNodes;
    childsForm[1].querySelector("input").checked = true;
  }

  useOfUrl(url) {
    let img_weather = document.querySelector(".weather");
    img_weather.style.background = `url(${url}) no-repeat`;
  }
};

let onSearch = () => {
  let city = document.getElementById("searchInput").value;
  let appID = "415f7ba50ddcc84f895305deba04c80c";
  let cl = new Search(city, appID);
  cl.requestForInfo();
};

setInterval(() => {
  let date = new Date();
  let timeLabel = document.getElementById("settings_time");
  timeLabel.textContent = `${date.getHours()}:${date.getMinutes()}`;
}, 100);

let TypeOfUnit = class {
  constructor(type, temperature) {
    this.type = type;
    this.temperature = Number(temperature);
  }
  changeUnit() {
    let typeLabel = document.getElementById("temperature_type");
    typeLabel.textContent = this.type;
  }
  calcTemperature() {
    let typePast = document.getElementById("temperature_type").textContent;
    let temperatureLabel = document.getElementById("temperature_numeral");
    if (typePast == this.type) {
      return null;
    } else {
      if (this.type == "°C") {
        if (typePast == "K") {
          temperatureLabel.textContent = `${Number(
            (this.temperature - 273.15).toFixed(2)
          ).toString()}`;
        } else {
          temperatureLabel.textContent = `${Number(
            (((this.temperature - 32) * 5) / 9).toFixed(2)
          ).toString()}`;
        }
      } else if (this.type == "K") {
        if (typePast == "°C") {
          temperatureLabel.textContent = `${Number(
            (this.temperature + 273.15).toFixed(2)
          ).toString()}`;
        } else {
          temperatureLabel.textContent = `${Number(
            (((this.temperature + 459.67) * 5) / 9).toFixed(2)
          ).toString()}`;
        }
      } else if (this.type == "°F") {
        if (typePast == "K") {
          temperatureLabel.textContent = `${Number(
            ((this.temperature * 9) / 5 - 459.67).toFixed(2)
          ).toString()}`;
        } else {
          temperatureLabel.textContent = `${Number(
            ((this.temperature * 9) / 5 + 32).toFixed(2)
          ).toString()}`;
        }
      }
    }
  }
};
let unit = (value) => {
  let temperature = document.getElementById("temperature_numeral").textContent;
  let cl = new TypeOfUnit(value, temperature);
  cl.calcTemperature();
  cl.changeUnit();
};
