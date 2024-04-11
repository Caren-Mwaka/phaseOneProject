document.addEventListener("DOMContentLoaded", () => {
  const filmsBtn = document.getElementById("filmsBtn");
  const peopleBtn = document.getElementById("peopleBtn");
  const vehiclesBtn = document.getElementById("vehiclesBtn");
  const planetsBtn = document.getElementById("planetsBtn");
  const speciesBtn = document.getElementById("speciesBtn");
  const mainContent = document.getElementById("mainContent");

  function fetchData(category, searchQuery = "") {
    let swapiUrl = `https://swapi.dev/api/${category}/`;//This is the star wars base URL where the category, for example films, has been interpolated.


    if (searchQuery) {
      swapiUrl += `?search=${searchQuery}`;//if a there is a search query , (the base URL + the search query)URL will run
    }

    return fetch(swapiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load details");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  const displayData = (category, searchQuery = "") => {
    let content = "";
    mainContent.innerHTML = "";
    fetchData(category, searchQuery)
//The fetchData is called inside the displayData function to fetch the data and then display it based on the value.
//For example if the value === films , the data that will be displayed will be that of case 'films'.
//If a search query has been inputted it will look through that specific category for that particular item.
      .then((data) => {
        if (data && Array.isArray(data.results)) {
          // Check if data.results is defined
          data.results.forEach((item) => {
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
             
             

              default:
                break;
            }
          });

          mainContent.insertAdjacentHTML("afterbegin", content);
        } else {
          throw new Error(
            `Data structure is not as expected for category: ${category}, query: ${searchQuery}`
          );
        }
      })
      .catch((error) => {
        console.error("Display data error:", error.message);
      });
  };

  filmsBtn.addEventListener("click", (event) => {
    event.preventDefault();
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

})