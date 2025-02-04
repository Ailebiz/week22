async function fetchData() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Almaty&appid=e3ad77404dc88bee59f4a50942c3dbc6&units=metric`);
        if (!response.ok) {
            throw new Error('Жүктеу қателігі!');
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Қате:', error);
        document.getElementById('results').innerHTML = '<p>Деректерді жүктеу кезінде қате кетті!</p>';
    }
}

async function displayData() {
    let data = await fetchData()

    console.log(data);
    
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    let div = document.createElement('div')

    div.innerHTML=`
        <h3>${data.name}</h3>
        <p>${data.main.temp}C</p>
    `

    resultsContainer.appendChild(div)

}
//     // data.forEach((city) => {
//     //     const card = document.createElement('div');
//     //     card.className = 'card';
//     //     card.innerHTML = `
           
//     //         <h3>${city.name}</h3>
//     //         <p>${city.weather}</p>
//     //     `;
//     //     resultsContainer.appendChild(card);
//     // });
// }

// // async function searchData() {
// //     const searchInput = document.getElementById('searchInput').value.toLowerCase();
// //     const data = await fetchData();

// //     const filteredData = data.filter(city => city.name.toLowerCase().includes(searchInput));
// //     if (filteredData.length > 0) {
// //         displayData(filteredData);
// //     } else {
// //         document.getElementById('results').innerHTML = '<p>Ақпарат өкінішке орай табылмады!</p>';
// //     }
// // }

// displayData()

// let Btn = document.getElementById("kazaks")
// let kzqala = ["Taraz", "Astana", "Aqtau"]

// kzqala.forEach((city) => {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=Astana&appid=e3ad77404dc88bee59f4a50942c3dbc6&units=metric`);
       

        
    
// })

async function init() {
    document.getElementById("results").addEventListener("click", async function () {
        await searchData();
    });

    document.getElementById("kazaks").addEventListener("click", async function () {
        await searchKazakhstanCities();
    });

    document.getElementById("world").addEventListener("click", async function () {
        await searchWorldCities();
    });
}

async function searchData() {
    let cityName = document.getElementById("searchInput").value;
    if (cityName.trim() === "") {
        alert("Қаланы енгізіңіз!");
        return;
    }
    await fetchWeather(cityName, "results");
}

async function searchKazakhstanCities() {
    let kazakhstanCities = ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe"];
    await displayWeatherForCities(kazakhstanCities, "kazaks");
}

async function searchWorldCities() {
    let worldCities = ["New York", "London", "Tokyo", "Paris", "Berlin"];
    await displayWeatherForCities(worldCities, "world");
}

async function displayWeatherForCities(cities, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";

    for (const city of cities) {
        await fetchWeather(city, containerId);
    }
}

async function fetchWeather(city, containerId) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3ad77404dc88bee59f4a50942c3dbc6&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("Қала табылмады!");
            return;
        }

        let container = document.getElementById(containerId);
        let weatherInfo = document.createElement("div");
        weatherInfo.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Температура: ${data.main.temp}°C</p>
            <p>Ауа райы: ${data.weather[0].description}</p>
        `;
        container.appendChild(weatherInfo);
    } catch (error) {
        console.error("Қате:", error);
        alert("Қала табылмады!");
    }
}


init();




