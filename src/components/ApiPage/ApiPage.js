const APIKEY = "82f2229c255b1505c496b13203e48e52";
const BASE = "https://api.openweathermap.org/data/2.5/forecast";
const CITYID = "?id=2964574";
const UNITS = "&units=metric";
const URL = `${BASE}${CITYID}${UNITS}&APPID=${APIKEY}`;
import "./style.scss";

let ApiPage = {
  getData() {
    fetch(URL).then(response => {
      response.json().then(res => {
        console.log("res", res);
      });
    });
  }
};

export { ApiPage };
