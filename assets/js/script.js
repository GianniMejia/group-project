var recipe = function (ingredients) {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=7c877acbab834731a9c166e03e4e3bc3`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            // displayRepos(response, user);
        }
        )
        .catch(err => console.error(err));
};

recipe();

var getUserReposOLD = function (user) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'pizza-and-desserts.p.rapidapi.com',
            'X-RapidAPI-Key': 'b29978175cmsh7acead99898141dp1966d1jsn9658d91e4b1d'
        }
    };
    fetch('https://pizza-and-desserts.p.rapidapi.com/pizzas', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            displayRepos(response, user);
        }
        )
        .catch(err => console.error(err));
};

// Get the modal
var modal = document.getElementById("pizzaModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function displayRepos(data, user) {
    //grab the ul element from index.html
    var ulElement = document.getElementsByClassName('pizza-results');
    console.log(ulElement);
    //loop through all the api results
    for (var i = 0; i < data.length; i++) {
        console.log(i);
        var pizzaDiv = document.createElement("div");
        pizzaDiv.setAttribute('class', 'pizza-card');
        

        //create a li tag element
        var liTag = document.createElement("li");
        liTag.setAttribute('class', 'pizza-name');
        liTag.textContent = data[i].name;
        var liTag2 = document.createElement("li");
        // took out "'Description:' +" from liTag2.textContent
        liTag2.textContent =   data[i].description;
        //Tie description to spoonacular api to spit recipe
        // make pizzaDiv clickable via .onClick (I think)
        pizzaDiv.onclick = function() {
            modal.style.display = "block";
            //making modals spit recipe (check console through inspect to see array); PROBLEM: they're all spitting the same 10 arrays...
            recipe(liTag2.textContent);
        }

        var imgTag = document.createElement("img");
        imgTag.setAttribute('class', 'pizza-img');
        imgTag.setAttribute('src', data[i].img);
        var isVeg = data[i].veg;
        console.log(isVeg);
        var pizzaBox = document.createElement("div");
        if (isVeg) {
            pizzaBox.setAttribute('class', 'pizza-box green');
        } else {
            pizzaBox.setAttribute('class', 'pizza-box red');
        }
        //append the li tag to html page
        pizzaDiv.appendChild(liTag);
        pizzaDiv.appendChild(pizzaBox);
        pizzaDiv.appendChild(liTag2);
        pizzaDiv.appendChild(imgTag);
        ulElement[0].appendChild(pizzaDiv);
    }
}
// getUserRepos();
getUserReposOLD();