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
        await KazakhstanCities();
    });
    document.getElementById("mycity").addEventListener("click", async function () {
        await MyCity();
    });

    document.getElementById("world").addEventListener("click", async function () {
        await WorldCities();
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

async function KazakhstanCities() {
    let kazakhstanCities = ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe"];
    await Weathers(kazakhstanCities, "kazaks");
}

async function MyCity() {
    let myCities = ["Almaty"];
    await Weathers(myCities, "mycity");
}

async function WorldCities() {
    let worldCities = ["New York", "London", "Tokyo", "Paris", "Berlin"];
    await Weathers(worldCities, "world");
}



async function Weathers(cities, containerId) {
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

// async function fetchData(city) {
//     try {
//         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3ad77404dc88bee59f4a50942c3dbc6&units=metric`);
//         if (!response.ok) {
//             throw new Error('Жүктеу қателігі!');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Қате:', error);
//         document.getElementById('cont').innerHTML = '<p>Деректерді жүктеу кезінде қате кетті!</p>';
//     }
// }

// async function getData(city = 'Almaty') {
//     let data = await fetchData(city);
//     if (!data) return;

//     console.log(data);
    
//     const resultCont = document.getElementById('mycity');
//     resultCont.innerHTML = '';

//     let div = document.createElement('div');
//     div.innerHTML = `
//        <h3>${data.name}, ${data.sys.country}</h3>
//             <p>Температура: ${data.main.temp}°C</p>
//             <p>Ауа райы: ${data.weather[0].description}</p>
//     `;

//     resultCont.appendChild(div);
    
// }

//     window.onload = function (){
//         getData('Almaty')
//     }