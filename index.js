// Initializing all elements constants
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Adding event listener to the form
form.addEventListener("submit", search);

// Default Location
let target = "delhi";

// function to fetch data from Weather API
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=7237172563bb4d3b80e135553230205&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    // Destructuring of data
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    // Callng update DOM function
    updateDom(temp_c, name, localtime, icon, text);

  } catch (error) {
    alert("Location Not Found!");
  }
};

// function to update Dom
function updateDom(temperature, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  /* 0 represents Sunday 6 represents Saturday
       Weeks are from 0 to 6 range */
  const exactDay = getDayFullName(new Date(exactDate).getDay());

  temperatureField.innerText = temperature;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} -  ${exactDay}  ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);


// function to search the location
function search(e) {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
};


// function to get the name of day
function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thrusday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturday";
  
      default:
        return "Dont't Know";
    }
  }
  
