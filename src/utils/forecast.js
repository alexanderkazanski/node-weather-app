const request = require("request");
const settings = require("../settings.js");

const forecast = (
  longitude,
  latitude,
  location,
  callback,
  accessKey = settings.accessKey
) => {
  const uri = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=f`;
  callback(error, "Unable to connect to location services!");
  request(
    { uri, method: "GET", json: true },
    (error, { body: { error: bodyError } }, body) => {
      if (error) {
        callback(error, "Unable to connect to location services!");
      } else if (bodyError) {
        callback(bodyError, "Unable to find coordinates.");
      } else {
        const {
          current: {
            temperature,
            feelslike,
            wind_speed,
            wind_degree,
            wind_dir,
          },
        } = body;
        callback(
          undefined,
          `It is ${temperature}° in ${location}, but it feels like ${feelslike}° the wind is moving at ${wind_speed} MPH in direction ${wind_dir} with a temprature of ${wind_degree}°.`
        );
      }
    }
  );
};

module.exports = forecast;
