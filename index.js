// require("dotenv").config();

// alternativ:
// import dotenv from 'dotenv';
// dotenv.config();

(function () {
  function Todo() {
    const buttonAdd = document.querySelector(".input-button");
    const list = document.getElementById("added-list");
    const favoritesList = document.getElementById("fav_albums");

    // Navbar behavior:

    let prevScrollPos = window.scrollY;
    const navbar = document.getElementById("navigation");

    window.onscroll = function () {
      let currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        //  If scrolling up, show navbar:
        navbar.style.top = "0";
      } else {
        // If scrolling down, hide navbar:
        navbar.style.top = "-100px"; // Navbar height - adjustable
      }

      prevScrollPos = currentScrollPos;
    };

    // Showing navbar when hovered over with mouse:
    navbar.addEventListener("mouseenter", () => {
      navbar.style.top = "0";
    });

    // Hiding navbar when mouse leaves navbar area and user scrolls down:
    navbar.addEventListener("mouseleave", () => {
      let currentScrollPos = window.scrollY;
      if (prevScrollPos < currentScrollPos) {
        navbar.style.top = "-100px";
      }
    });

    // const themeColorSelect = document.getElementById("theme_color");
    // themeColorSelect.addEventListener("change", changeTheme);

//////////////////////////////////////////////////////////////////////////////

const themes = [
  "theme0",
  "theme1",
  "theme2",
  "theme3",
  "theme4",
  "theme5",
  "theme6",
  "theme7",
  "theme8",
  "theme9",
  "theme10",
  "theme11",
  "theme12",
  "theme13",
  "theme14",
  "theme15",

]; 



// Funkcija za promjenu teme
function changeTheme(themeName) {
  const body = document.body;

  // Ukloni sve postojeće teme
  themes.forEach((theme) => {
    body.classList.remove(theme);
    document.querySelectorAll(".nav-button, .favorite-button, #theme_color, option").forEach((button) => {
      button.classList.remove(theme);
    });
    document.querySelectorAll(".remove-button").forEach((button) => {
      button.classList.remove(theme);
    });
    document.querySelectorAll(".form-theme").forEach((form) => {
      form.classList.remove(theme);
    });
    document.querySelectorAll(".title-theme").forEach((title) => {
      title.classList.remove(theme);
    });
    document.querySelectorAll(".input-color").forEach((input) => {
      input.classList.remove(theme);
    });
    document.querySelectorAll(".header-style").forEach((input) => {
      input.classList.remove(theme);
    });
    document.querySelectorAll(".thin").forEach((text) => {
      text.classList.remove(theme);
    });
  });

  // Dodaj novu temu
  body.classList.add(themeName);
  document.querySelectorAll(".nav-button, .favorite-button, #theme_color, option").forEach((button) => {
    button.classList.add(themeName);
  });
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.classList.add(themeName);
  });
  document.querySelectorAll(".form-theme").forEach((form) => {
    form.classList.add(themeName);
  });
  document.querySelectorAll(".title-theme").forEach((title) => {
    title.classList.add(themeName);
  });
  document.querySelectorAll(".input-color").forEach((input) => {
    input.classList.add(themeName);
  });
  document.querySelectorAll(".header-style").forEach((input) => {
    input.classList.add(themeName);
  });
  document.querySelectorAll(".thin").forEach((text) => {
    text.classList.add(themeName);
  });

  console.log("Selected theme:", themeName);
  console.log("Body classes:", body.classList);
}



// Dropdown (instead of select-element):
document.querySelector('.dropdown-toggle').addEventListener('click', function() {
  const menu = document.querySelector('.dropdown-menu');
  menu.classList.toggle('show');
});

// Hide dropdown on click outside of it:
document.addEventListener('click', function(event) {
  if (!document.querySelector('.dropdown-toggle').contains(event.target) && !document.querySelector('.dropdown-menu').contains(event.target)) {
    document.querySelector('.dropdown-menu').classList.remove('show');
  }
});

// Add functionality to choose options:
document.querySelectorAll('.dropdown-menu li').forEach(function(option) {
  option.addEventListener('click', function() {
    const themeName = option.getAttribute('data-value');
    document.querySelector('.dropdown-toggle').textContent = option.textContent;
    document.querySelector('.dropdown-menu').classList.remove('show');
    changeTheme(themeName);
  });
});

////////////////////////////////////////////////////////////////////////////////

  // const themeColorSelect = document.querySelectorAll('.dropdown-menu li');
    // themeColorSelect.addEventListener("change", changeTheme);

    // themeColorSelect.forEach(function(option) {
  // option.addEventListener('click', function() {
    // Fetch value from data-value atribute:
    // let selectedTheme = option.getAttribute('data-value');
    
    // Put chosen option-text as the dropdown current name (current theme name):
    // document.querySelector('.dropdown-toggle').textContent = option.textContent;
  // });
// });


////////////////////////////////////////////////////////////////////////////////////

    const form = document.getElementById("form");
    const button = document.querySelectorAll("button");

    // const option = document.querySelectorAll("option");
    // console.log(option);

    // const themes = [
    //   "theme0",
    //   "theme1",
    //   "theme2",
    //   "theme3",
    //   "theme4",
    //   "theme5",
    //   "theme6",
    //   "theme7",
    //   "theme8",
    //   "theme9",
    //   "theme10",
    //   "theme11",
    //   "theme12",
    //   "theme13",
    //   "theme14",
    //   "theme15",
    //   "theme16",
    //   "theme17",
    // ]; 

    // Theme changing:

    // function changeTheme() {
    //   // get value of the selected theme

    //   const selectedTheme = themeColorSelect.data-value;

    //   // get main elements which should be stylized
    //   // (add buttons, body, navbar, inputs, form, text-blocks, add- and remove-buttons):

    //   const body = document.body;

    //   // all these classes have to have scss-code for switching between different themes ( @each $theme...):
    //   const buttonTh1 = document.querySelectorAll(
    //     ".nav-button, .favorite-button, #theme_color, option"
    //   );
    //   const buttonTh2 = document.querySelectorAll(".remove-button");

    //   const formTheme = document.querySelectorAll(".form-theme");
    //   const titleTheme = document.querySelectorAll(".title-theme");

    //   const inputColor = document.querySelectorAll(".input-color");

    //   const headerStyle = document.querySelectorAll(".header-style");


    //   // Results are nodelists of several elements, so we will use forEach-function to target each button:
    //   // 1. Remove all existing themes from this element:
    //   themes.forEach((theme) => {
    //     body.classList.remove(theme);

    //     buttonTh1.forEach((button) => {
    //       button.classList.remove(theme);
    //     });

    //     buttonTh2.forEach((button) => {
    //       button.classList.remove(theme);
    //     });

    //     formTheme.forEach((form) => {
    //       form.classList.remove(theme);
    //     });

    //     titleTheme.forEach((title) => {
    //       title.classList.remove(theme);
    //     });

    //     inputColor.forEach((input) => {
    //       input.classList.remove(theme);
    //     });

    //     headerStyle.forEach((input) => {
    //       input.classList.remove(theme);
    //     });
    //   });

    //   // 2. Add new theme to this element:
    //   body.classList.add(selectedTheme);

    //   buttonTh1.forEach((button) => {
    //     button.classList.add(selectedTheme);
    //   });

    //   buttonTh2.forEach((button) => {
    //     button.classList.add(selectedTheme);
    //   });

    //   formTheme.forEach((form) => {
    //     form.classList.add(selectedTheme);
    //   });

    //   titleTheme.forEach((title) => {
    //     title.classList.add(selectedTheme);
    //   });

    //   inputColor.forEach((input) => {
    //     input.classList.add(selectedTheme);
    //   });
       
    //   headerStyle.forEach((input) => {
    //     input.classList.add(selectedTheme);
    //   });



    //   console.log("Selected theme:", selectedTheme);
    //   console.log("Body classes:", body.classList);
    // }


    let entry, rating, artist, time, item;

    // Load lists from localStorage on init:
    function loadLists() {
      const savedList = localStorage.getItem("addedList");
      const savedFavorites = localStorage.getItem("favoritesList");

      if (savedList) {
        const items = JSON.parse(savedList);
        items.forEach((item) =>
          list.appendChild(
            createTask(item.entry, item.artist, item.rating, item.time)
          )
        );
      }

      if (savedFavorites) {
        const items = JSON.parse(savedFavorites);
        items.forEach((item) =>
          favoritesList.appendChild(
            createFavorite(item.entry, item.artist, item.rating, item.time)
          )
        );
      }
    }

    // Save lists to localStorage:
    function saveLists() {
      const addedItems = [];
      list.querySelectorAll("li").forEach((item) => {
        addedItems.push({
          entry: item.querySelector(".entry").textContent,
          artist: item.querySelector(".artist").textContent,
          rating: item.querySelector(".rating").textContent,
          time: item.querySelector(".time").textContent,
        });
      });
      localStorage.setItem("addedList", JSON.stringify(addedItems));

      const favoriteItems = [];
      favoritesList.querySelectorAll("li").forEach((item) => {
        favoriteItems.push({
          entry: item.querySelector(".entry").textContent,
          artist: item.querySelector(".artist").textContent,
          rating: item.querySelector(".rating").textContent,
          time: item.querySelector(".time").textContent,
        });
      });
      localStorage.setItem("favoritesList", JSON.stringify(favoriteItems));
    }

    // creating new task:
    function createTask(entry, artist, rating, time) {
      const item = document.createElement("li");

      // const div = document.createElement("div");
      // div.classList.add("form-theme", "item-card");

      item.innerHTML = `<div class="form-theme item-card" > 
      <p class="item-fill flex-item">  
      <span class="thin"> Artist:  </span> <span  class="artist">${artist}</span> <br> 
      <span class="thin"> Song: </span> <span class="song"> placeholder </span> <br> 
      <span class="thin"> Album:  </span> <span class="entry">${entry}</span> <br> 
      <span class="thin"> Rate:  </span>   <span  class="rating">${rating}</span> <br> 
      <span class="thin"> Rated on:  </span>   <span class="time">${time}</span>
      </p>  </div>`;

      const itemCardDiv = item.querySelector(".item-card");

      addFavoriteButton(itemCardDiv);
      addRemoveButton(itemCardDiv);

      return item;
    }

    // console.log(paragraph);

    // adding new task on the list:
    function addTask(event) {
      event.preventDefault();
      const entry = document.getElementById("album").value.trim();
      const artist = document.getElementById("artist").value.trim();
      const rating = document.getElementById("review").value;
      const time = new Date().toLocaleDateString();

      // test:
      //const time = new Date(2023, 11, 17).toLocaleDateString();
      const item = createTask(entry, artist, rating, time);
      list.appendChild(item);
      document.getElementById("album").value = "";
      document.getElementById("artist").value = "";
      document.getElementById("review").value = "";
      saveLists();
    }

    this.init = function () {
      // body initially has a default theme:
      document.body.classList.add("theme0");
      // new task (item) added on the add-button click:
      buttonAdd.addEventListener("click", addTask);
      loadLists();
    };

    // add button FavoriteButton:
    function addFavoriteButton(itemCardDiv) {
      const favoriteButton = document.createElement("button");
      favoriteButton.setAttribute("type", "button");
      favoriteButton.classList.add("favorite-button", "button", "flex-item");
      // favoriteButton.classList.add("buttonTh1");
      // favoriteButton.classList.add("button");
      // favoriteButton.classList.add("flex-item");
      favoriteButton.addEventListener("click", setFavorite);
      favoriteButton.innerHTML = "Add to favorites";

      // div.insertBefore(favoriteButton, div.firstChild);

      // itemCardDiv.appendChild(favoriteButton);

      itemCardDiv.insertBefore(favoriteButton, itemCardDiv.firstChild);

      const listTitle = document.getElementById("new-title");
      listTitle.style.display = "block";
    }

    // function that applies theme to all newly created fav-buttons:
    // function setThemeToFavButton(theme, selectedTheme) {
    //   const button = document.querySelectorAll(".favorite-button");

    //   button.forEach((button) => {
    //     button.classList.remove(theme);
    //   });
    //   button.forEach((button) => {
    //     button.classList.add(selectedTheme);
    //   });
    // }
    // setThemeToFavButton();

    // Function setFavorite:
    function setFavorite(event) {
      const item = event.target.parentNode;
      const entry = item.querySelector(".entry").textContent;
      const artist = item.querySelector(".artist").textContent;
      const rating = item.querySelector(".rating").textContent;
      const time = item.querySelector(".time").textContent;

      console.log("Extracted values:", { entry, artist, rating, time }); // Debugging

      if (!entry || !artist || !rating || !time) {
        console.error("Some elements are missing in the item:", {
          entry,
          artist,
          rating,
          time,
        });
        return;
      }

      // Create favorite item:
      const favoriteItem = createFavorite(entry, artist, rating, time);

      // if (!entryElement || !artistElement || !ratingElement || !timeElement) {
      //   console.error("Cannot find necessary elements in the item.");
      //   return;
      // }

      // Function to check if the item already exists in favorites, and if not, adds it to Favorites list:

      function addIf(favoriteItem) {
        let found = false;
        favoritesList.querySelectorAll("li").forEach((element) => {
          if (element.innerHTML === favoriteItem.innerHTML) {
            found = true;
          }
        });
        if (!found) {
          favoritesList.appendChild(favoriteItem);
          console.log(`Added '${entry}' on the favorites list.`);
        } else {
          console.log(`'${entry}' is already on the list.`);
        }
      }

      addIf(favoriteItem);
      saveLists();
    }

    // Function createFavorite:
    function createFavorite(entry, artist, rating, time) {
      const item = document.createElement("li");
      item.innerHTML = `<div class="form-theme item-card item-card2"> <p class="item-fill2 flex-item">
      <span class="thin2">Artist: </span><span class="artist2" id="white" >${artist}</span><br>
      <span class="thin2">Song: </span><span class="song2" id="white" > placeholder </span><br>
      <span class="thin2">Album: </span><span class="album2" id="white" >${entry}</span><br>
      <span class="thin2">Rate: </span><span class="rating2" id="white" >${rating}</span><br>
      <span class="thin2">Rated on: </span><span class="time2" id="white" >${time}</span></p>  </div>`;

      console.log("Created item HTML:", item.innerHTML); // Debugging

      const itemCardDiv = item.querySelector(".item-card");

      addRemoveButton(itemCardDiv);

      return item;
    }

    // Debugging to ensure favoritesList is found
    console.log("favoritesList:", favoritesList);

    // add button RemoveButton:
    function addRemoveButton(item) {
      const removeButton = document.createElement("button");

      const divElement = document.querySelectorAll(".item-card");
      // const hr = document.createElement("hr");

      removeButton.classList.add("remove-button");
      removeButton.classList.add("flex-item");
      removeButton.addEventListener("click", removeTask);
      item.appendChild(removeButton);
      // item.appendChild(hr);

      divElement.innerHTML += removeButton.outerHTML;

      removeButton.innerHTML = "Remove from list";
    }


    // function removeTask:
    function removeTask(event) {
      const removeButton = event.target;
      removeButton.parentNode.remove();
      // removes the whole parent-task (in which the removeButton was embedded as a child)
      saveLists();
    }
  }
  // here ends Todo function.

  const todo = new Todo();

  window.addEventListener("load", todo.init);
})();

// API KEY:

// const apikey = process.env.API_KEY;
//

// Error kod dodavanja novih itema na favorite listu:
// index.js:338 Uncaught TypeError: Cannot read properties of null (reading 'textContent')
//     at HTMLButtonElement.setFavorite (index.js:338:49)

// index.js:287 Uncaught TypeError: Cannot read properties of null (reading 'textContent')
//     at HTMLButtonElement.setFavorite (index.js:287:49)

// također se ne može ni removati iteme s 1. liste:
// index.js:124 Uncaught TypeError: Cannot read properties of null (reading 'textContent')
//     at index.js:124:46
//     at NodeList.forEach (<anonymous>)
//     at saveLists (index.js:122:35)
//     at HTMLButtonElement.removeTask (index.js:370:7)
// Kasnije je removanje s osnovne liste ipak proradilo.

// I removanje itema s favorite liste radi normalno, ali dodavanje s osnovne liste ne radi.

// Give your stylesheet link an id..

// <link rel=stylesheet href=mycss.css id=shtylesheet>
// Then you can change it with javascript

// function changeStylesheet(newstylesheet){
//     document.getElementById('shtylesheet').setAttribute('href', newstylesheet);
// }
// Then if you wanna do buttons or something

// <button onclick="changeStylesheet('light.css')">Lights on</button>
// <button onclick="changeStylesheet('dark.css')">Lights off</button>
