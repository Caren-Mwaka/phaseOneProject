// Initial Load
// ensures that my JavaScript runs after the HTML document has been completely loaded.
document.addEventListener("DOMContentLoaded", () => {
  
  // My DOM Elements - selecting various DOM elements using getElementById() method and storing them in variables.
  const filmsBtn = document.getElementById("filmsBtn");
  const peopleBtn = document.getElementById("peopleBtn");
  const vehiclesBtn = document.getElementById("vehiclesBtn");
  const planetsBtn = document.getElementById("planetsBtn");
  const speciesBtn = document.getElementById("speciesBtn");
  const mainContent = document.getElementById("mainContent");

// FETCHING THE DATA:
  function fetchData(category, searchQuery = "") {
    let swapiBaseUrl = `https://swapi.dev/api/${category}/`; //This is the star wars base URL where the category, for example films, has been interpolated.

    if (searchQuery) {
      swapiBaseUrl += `?search=${searchQuery}`; //if a there is a search query , (the base URL + the search query)URL will run.
      // The search will happen when the seaerch button is clicked.
    }

    return fetch(swapiBaseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load details");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

// DISPLAYING THE DATA
  const displayData = (category, searchQuery = "") => {
    let content = "";
    mainContent.innerHTML = "";
    fetchData(category, searchQuery)
      //The fetchData is called inside the displayData function to fetch the data and then display it based on the value.
      //For example if the value === films , the data that will be displayed will be that of case 'films'.
      //If a search query has been inputted it will look through that specific category for that particular item.
      .then((data) => {
        if (data && Array.isArray(data.results)) {
          // Check if data.results is defined, that is if checks if the data variable is truthy(!(null, undefined, 0, '' (empty string), NaN, and false)).
          // If data is truthy, it means that the fetchData function successfully fetched some data from the API.
          // Array.isArray() checks if data.results is an array.
          data.results.forEach((item) => {
            //forEach loop iterates over the data and generates the necessary HTML content for each item in the data.results array,
            //the data generated will then be inserted into the mainContent element to display the fetched data on the webpage.

            //displaying films data
            switch (category) {
              case "films":
                content += `
                    <div class="card">
                        <h4>${item.title}</h4>
                        <div class="card-content"> 
                        <span class="episodeId">Episode ID</span>: ${item.episode_id}<br>
                        <span class="producer">Producer</span>: ${item.producer}<br>
                        <span class="director">Director</span>: ${item.director}<br>
                        <span class="releaseDate">Release Date</span>: ${item.release_date}<br>
                        <br>
                        <span class="openingCrawl">Opening Crawl</span>: ${item.opening_crawl}<br>
                        </div>
                    </div>`;
                break;
              //displaying people data
              case "people":
                content += `
                    <div class="card">
                        <h4>${item.name}</h4>
                        <div class="card-content">  
                            <span class="height">Height</span>: ${item.height}<br>
                            <span class="mass">Mass</span>: ${item.mass}<br>
                            <span class="hairColor">Hair Color</span>: ${item.hair_color}<br>
                            <span class="skinColor">Skin Color</span>: ${item.skin_color}<br>
                            <span class="eyeColor">Eye Color</span>: ${item.eye_color}<br>
                            <span class="birthYear">Birth Year</span>: ${item.birth_year}<br>
                            <span class="gender">Gender</span>: ${item.gender}<br>
                        </div>
                    </div>`;
                break;
              //displaying vehicles data
              case "vehicles":
                content += `
                        <div class="card">
                            <h4>${item.name}</h4>
                            <div class="card-content">  
                            <span class="model">Model</span>: ${item.model}<br>
                            <span class="manufacturer">Manufacturer</span>: ${item.manufacturer}<br>
                            <span class="costInCredits">Cost in Credits</span>: ${item.cost_in_credits}<br>
                            <span class="length">Length</span>: ${item.length}<br>
                            <span class="maxAtmospheringSpeed">Max Atmosphering Speed</span>: ${item.max_atmosphering_speed}<br>
                            <span class="crew">Crew</span>: ${item.crew}<br>
                            <span class="passengers">Passengers</span>: ${item.passengers}<br>
                            <span class="cargoCapacity">Cargo Capacity</span>: ${item.cargo_capacity}<br>
                            <span class="consumables">Consumables</span>: ${item.consumables}<br>
                            <span class="vehicleClass">Vehicle Class</span>: ${item.vehicle_class}<br>
                            </div>
                        </div>`;
                break;
              //displaying planets data
              case "planets":
                content += `
                        <div class="card">
                            <h4>${item.name}</h4>
                            <div class="card-content">  
                            <span class="rotationPeriod">Rotation Period</span>: ${item.rotation_period}<br>
                            <span class="orbitalPeriod">Orbital Period</span>: ${item.orbital_period}<br>
                            <span class="diameter">Diameter</span>: ${item.diameter}<br>
                            <span class="climate">Climate</span>: ${item.climate}<br>
                            <span class="gravity">Gravity</span>: ${item.gravity}<br>
                            <span class="terrain">Terrain</span>: ${item.terrain}<br>
                            <span class="surfaceWater">Surface Water</span>: ${item.surface_water}<br>
                            <span class="population">Population</span>: ${item.population}<br>
                            </div>
                        </div>`;
                break;
              //displaying species data
              case "species":
                content += `
                        <div class="card">
                            <h4>${item.name}</h4>
                            <div class="card-content">  
                            <span class="classification">Classification</span>: ${item.classification}<br>
                            <span class="designation">Designation</span>: ${item.designation}<br>
                            <span class="averageHeight">Average Height</span>: ${item.average_height}<br>
                            <span class="skinColors">Skin Colors</span>: ${item.skin_colors}<br>
                            <span class="hairColors">Hair Colors</span>: ${item.hair_colors}<br>
                            <span class="eyeColors">Eye Colors</span>: ${item.eye_colors}<br>
                            <span class="averageLifespan">Average Lifespan</span>: ${item.average_lifespan}<br>
                            <span class="language">Language</span>: ${item.language}<br>
                            </div>
                        </div>`;
                break;
              default:
                break;
            }
          });

          mainContent.insertAdjacentHTML("afterbegin", content);
          // The insertAdjacentHTML() method inserts HTML code into a specified position.
          // afterbegin	positions the html content after the beginning of the element (first child).In this case though there is nothing within mainContent.
        } else {
          throw new Error(
            `Failed to fetch ${category} data or no results found for "${searchQuery}". Please try again.`
          );
        }
      })
      .catch((error) => {
        console.error("Display data error:", error.message);
      });
  };

  //adding event listeners to all the buttons, so that when the button is clicked data within a specific category is displayed.
  filmsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //prevents the default behavior of the button, which might be submitting a form (reloading the page).
    displayData("films");
  });

  peopleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayData("people");
  });

  vehiclesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayData("vehicles");
  });

  planetsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayData("planets");
  });

  speciesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayData("species");
  });

  //SEARCH FUNCTIONALTY:
  // Reference to the search input and the message element and card class
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card");
  const searchMessage = document.getElementById("searchMessage");

  // Adding an event listener for the focus event on the search input
  searchInput.addEventListener("focus", () => {

  // Displays the search message  
    searchMessage.style.display = "block"; 

  // Hides the search message after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      searchMessage.style.display = "none";
    }, 3000);
  });

 // Setting up an event listener for the search input. 
 // Whenever the user types something in the search bar (which triggers the "input" event), the code inside the curly braces ({}) gets executed.
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    //converts teh search input to lowercase for case-insensitive search, and removes any leading or trailing spaces (using .trim()).

    let hasResults = false;
    // Flag to track if any results are found. The value of the variable hasResults is false until it finds a result.

    cards.forEach((card) => {
      const cardTitle = card.querySelector("h4").textContent.toLowerCase();
    //looping through the card elements to find the element with the tag <h4> inside each card,
    //then gets its text content, and converts it to lowercase for case-insensitive matching.
      if (cardTitle.includes(query)) {
        card.style.display = "block";
        hasResults = true;
      } else {
        card.style.display = "none";
      }
      //After the loop finishes going through all cards, if hasResults is still false, it means no cards matched the search query and hence none will display.
      // if any cards match the search query they will be displayed.
    });
  });
  

  // Event listener for search button
  const search = document.getElementById("searchBtn");
  //fetching the button element with the ID "searchBtn" . This is the button that triggers the search.
  search.addEventListener("click", (event) => {
    event.preventDefault();
    const searchQuery = document.getElementById("searchInput").value;
    const activeButton = document.querySelector("nav button.active");
    //finds a button within the <nav> element that has the class "active". The active button is the currently selected category button.

    if (activeButton) {
      const selectedCategory = activeButton.id.replace("Btn", "");
      displayData(selectedCategory, searchQuery);
    }
    //calling the displayData function with both the category and the search query as arguments, allows for a more refined search based on these two arguments.
  });

  // Additional event listener for the search button that allows a user to press the enter key to trigger the search.
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      const searchQuery = searchInput.value;
      const activeButton = document.querySelector("nav button.active");

      if (activeButton) {
        const selectedCategory = activeButton.id.replace("Btn", "");
        displayData(selectedCategory, searchQuery);
      }
    }
  });

//CATEGORY NAVIGATION:
  // Event listener for category buttons
  const navigation = document.querySelectorAll("nav button");

  navigation.forEach((button) => {
    button.addEventListener("click", (event) => {

      event.preventDefault()
      // Removing active class from all buttons
      navigation.forEach((btn) => btn.classList.remove("active"));

      // Adding active class to the clicked button
      event.target.classList.add("active");

//updating the search input placeholder to match the category that is clicked
      switch (event.target.id.replace("Btn", "")) {
        case "films":
          searchInput.placeholder = "Search Films...";
          break;
        case "people":
          searchInput.placeholder = "Search People...";
          break;
        case "vehicles":
          searchInput.placeholder = "Search Vehicles...";
          break;
        case "planets":
          searchInput.placeholder = "Search Planets...";
          break;
        case "species":
          searchInput.placeholder = "Search Species...";
          break;
        default:
          searchInput.placeholder = "Search...";
          break;
      }
  // Displays data for the clicked category
  displayData(event.target.id.replace("Btn", ""));
});

//BACK BUTTON FUNCTIONALITY:
      const backButton = document.getElementById("backButton");

      backButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Navigate to the homepage
      });

    
  });
});
