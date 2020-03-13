//https://api.weatherbit.io/v2.0/current?city=lagos, ng&key=8b832a95613a4ffa9fc7d9dce08d5593
//http://newsapi.org/v2/top-headlines?country=NG&category=health&apiKey=7ab076ac5ea840c88bed067ebc648c30



const weatherApp = ()=> {

    const cityForm = () => {
        const mainForm = document.querySelector("#search_item");
        

        mainForm.addEventListener("submit", (event) =>{
            event.preventDefault();
            const formValue = document.querySelector("#search_value").value;
            mainForm.reset();

            getSearch(formValue);
        })
    }

    const getSearch = (city) =>{
        const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=8b832a95613a4ffa9fc7d9dce08d5593`;

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then( (city) =>{
            let reports = city.data;
            let parent = document.querySelector("#report_container");
            let template = '';
            return reports.map( (report) =>{
                template += `
                <div class="text-center mt-5 animated bounceInDown">
                    <h2>${report.city_name} <span class="badge badge-warning">${report.country_code}</span></h2>
                    <h1>${Math.round(report.temp)}<sup>o</sup> C</h1>
                
                <div style="font-size: 60px;">
                    <img class="cloud" class="cloud"src=" https://www.weatherbit.io/static/img/icons/${report.weather.icon}.png">
                </div>
                <h4>${report.weather.description}</h4> 
                </div>
                `
                parent.innerHTML = '';
                parent.insertAdjacentHTML("afterbegin", template);

                anime({
                targets: '.cloud', 
                translateX: [-50, 50],
                direction: 'alternate',
                duration: 3000,
                loop: true,
                easing: 'linear'
                });

                })
            })
            .catch((error) => {
                console.error('Error:', error);
                document.querySelector("#error").insertAdjacentHTML("afterbegin", `<h3 class="emoji">😕</h3>
                    <h4 >SORRY CITY NOT FOUND</h4>`)
                anime({
                targets: '.emoji', 
                translateX: [-50, 50],
                direction: 'alternate',
                duration: 3000,
                loop: true,
                easing: 'linear'
                });
            })
    }

   cityForm();
}
weatherApp();

    
