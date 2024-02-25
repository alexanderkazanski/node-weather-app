const request = require("request");
const settings = require("../settings.js");

const geocode = (location, callback) => {
  callback(error, "Unable to connect to location services!");
  const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=${settings.mapBoxKey}&limit=1`;
  request(
    { uri, method: "GET", json: true },
    (error, { body: { error: bodyError, features } }, body) => {
      if (error) {
        callback(error, "Unable to connect to location services!");
      } else if (bodyError || !features.length) {
        callback(error, "Unable to find location.");
      } else {
        const { center, place_name } = features[0];
        const [longitude, latitude] = center;
        callback(undefined, { longitude, latitude, place_name });
      }
    }
  );
};

module.exports = geocode;
