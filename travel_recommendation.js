var travelData;

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log(data);
  })
  .catch(error => {
    console.log("error in fetching data", error);
  });


function  clear_button(){
    document.getElementById("searchInput").value = "";
}
function search() {

    var value = document.getElementById("searchInput").value;
    value = value.toLowerCase();

    if (value === "beach") {
        value = "beaches";
    }
    else if (value === "temple") {
        value = "temples";
    }
    else if (value === "country") {
        value = "countries";
    }

    var results = travelData[value];

    var recommendations = document.getElementById("recommendations");

    recommendations.innerHTML = "";

    if (!results) {
        recommendations.textContent = "No results found";
        return;
    }

    if (value === "beaches" || value === "temples") {

        results.forEach(function(place) {

            var card = document.createElement("div");

            var image = document.createElement("img");
            image.src = place.imageUrl;

            var name = document.createElement("h2");
            name.textContent = place.name;

            var description = document.createElement("p");
            description.textContent = place.description;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);

            recommendations.appendChild(card);
        });
    }

    // countries
    else if (value === "countries") {

        results.forEach(function(country) {

            country.cities.forEach(function(city) {

                var card = document.createElement("div");

                var image = document.createElement("img");
                image.src = city.imageUrl;

                var name = document.createElement("h2");
                name.textContent = city.name;

                var description = document.createElement("p");
                description.textContent = city.description;

                card.appendChild(image);
                card.appendChild(name);
                card.appendChild(description);

                recommendations.appendChild(card);
            });
        });
    }
}