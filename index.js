document.addEventListener('DOMContentLoaded', () => {
    const filmsBtn = document.getElementById('filmsBtn');
    const peopleBtn = document.getElementById('peopleBtn');
    const vehiclesBtn = document.getElementById('vehiclesBtn');
    const planetsBtn = document.getElementById('planetsBtn');
    const speciesBtn = document.getElementById('speciesBtn');
    const mainContent = document.getElementById('mainContent');

    function fetchData(value) {
        return fetch(`https://swapi.dev/api/${value}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load details');
                }
                return response.json();
            })
            .catch((error) => console.error("Error:", error));
    }

    const displayData = (value) => {
        let content = '';
        mainContent.innerHTML = ''; 
        fetchData(value)
            .then((data) => {
                if (Array.isArray(data.results)) {
                    data.results.forEach(item => {
                        switch (value) {
                            case 'films':
                                content += `
                                    <div class="card">
                                        <h4>${item.title}</h4>
                                        <div class="card-content">  
                                            <span class="producer">Producer</span>: ${item.producer}<br>
                                            <span class="director">Director</span>: ${item.director}<br>
                                            <span class="release">Release date</span>: ${item.release_date}<br>
                                            <p class="opening">${item.opening_crawl}</p>
                                        </div>
                                    </div>`;
                                break;

                            case 'people':
                                content += `
                                    <div class="card">
                                        <h4>${item.name}</h4>
                                        <div class="card-content">  
                                            <span class="gender">Gender</span>: ${item.gender}<br>
                                            <span class="birthYear">Birth Year</span>: ${item.birth_year}<br>
                                            <span class="height">Height</span>: ${item.height}<br>
                                        </div>
                                    </div>`;
                                break;

                            default:
                                break;
                        }
                    });

                    mainContent.insertAdjacentHTML("afterbegin", content);
                }
            })
            .catch((error) => {
                console.error('Display data error:', error);
            });
    };

    filmsBtn.addEventListener('click', () => displayData('films'));
    peopleBtn.addEventListener('click', () => displayData('people'));
    vehiclesBtn.addEventListener('click', () => displayData('vehicles'));
    planetsBtn.addEventListener('click', () => displayData('planets'));
    speciesBtn.addEventListener('click', () => displayData('species'));
});
