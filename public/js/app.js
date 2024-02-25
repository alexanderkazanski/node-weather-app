console.log("Client side javascript file is loaded!");

const hangman = () =>
  fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
      console.log(data);
    });
  });

const forecast = (location) =>
  fetch(`/weather?address=${location}`).then(
    (response) => {
      const data = response.json().then((data) => {
        if (data.error) return data; // seperated for error control flow
        return data;
      });
      return data;
    }
  );

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "";
  messageTwo.textContent = "Loading...";
  forecast(search.value).then((data) => {
    if (data.error) return messageTwo.textContent = data.error;
    const { location, forecast } = data;
    messageOne.textContent = location;
    messageTwo.textContent = forecast;
  });
});
