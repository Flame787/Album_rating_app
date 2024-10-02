(function () {
  function Todo() {
    const buttonPlay = document.querySelector(".play-button");
    const submitToListButton = document.querySelector(".add-button");
    const list = document.getElementById("added-list"); // first list (ul) that gets tasks appended
    const favoritesList = document.getElementById("fav_albums"); // second list (ul) with favorite songs
    const searchInput = document.getElementById("search-all-input");
    const searchButton = document.getElementById("submit-button");
    // const searchForm = document.getElementById("search-form");

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

    ///////////////////////////////////   Themes   ///////////////////////////////////////////

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

    // Function for changing a theme:
    function changeTheme(themeName) {
      const body = document.body;

      // Remove existing (previous) themes:
      themes.forEach((theme) => {
        body.classList.remove(theme);
        document
          .querySelectorAll(
            ".nav-button, .favorite-button, #theme_color, option"
          )
          .forEach((button) => {
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

      // Add newly selected theme style:
      body.classList.add(themeName);
      document
        .querySelectorAll(".nav-button, .favorite-button, #theme_color, option")
        .forEach((button) => {
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

    // Dropdown for theme-picking (instead of select-element):
    document
      .querySelector(".dropdown-toggle")
      .addEventListener("click", function () {
        const menu = document.querySelector(".dropdown-menu");
        menu.classList.toggle("show");
      });

    // Hide dropdown on click outside of it:
    document.addEventListener("click", function (event) {
      if (
        !document.querySelector(".dropdown-toggle").contains(event.target) &&
        !document.querySelector(".dropdown-menu").contains(event.target)
      ) {
        document.querySelector(".dropdown-menu").classList.remove("show");
      }
    });

    // Add functionality to choose options:
    document.querySelectorAll(".dropdown-menu li").forEach(function (option) {
      option.addEventListener("click", function () {
        const themeName = option.getAttribute("data-value");
        document.querySelector(".dropdown-toggle").textContent =
          option.textContent;
        document.querySelector(".dropdown-menu").classList.remove("show");
        changeTheme(themeName);
      });
    });

    /////////////////////////////////   CODE FOR FETCHING ARTISTS, ALBUMS AND SONGS:   ////////////////////////////////////////

    // const form = document.getElementById("form");
    // const button = document.querySelectorAll("button");

    let album, rating, artist, song, time, item;

    const artistInput = document.getElementById("artist");
    const songInput = document.getElementById("song");
    const albumInput = document.getElementById("album");
    const resultsList = document.getElementById("results");

// NOVO:

// Add event listener to the search form
// document.getElementById('search-form').addEventListener('submit', function (e) {
//   console.log("Event listener triggered"); // Ovdje dodajte
//   e.preventDefault(); // Prevent form submission
//   const query = document.getElementById('search-all-input').value; // Get query from input
//   console.log("Query from input:", query); // Provjera vrijednosti
//   displaySearchResults(query); // Call the search results function
// });



    /////// Function to send Api-request for Search results - from Frontend to Backend: //////////////////////

    // after implementing the route (named '/api/search' or similar), test it in browser or Postman to check if it returns correct JSON answer.

    // if the 'type' is not set, it will be a default value: 'artist,album,track':
    async function fetchSearchResults(query, type = "artist,album,track") {
      try {
        const response = await fetch(`/api/search?q=${query}&type=${type}`);
        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }

    
    // Funkcija za prikaz upozorenja ako je input-polje prazno:
    function displayMessage(container, text) {
      const message = document.createElement("p");
      message.textContent = text;
      message.classList.add("warning-message"); // Optional: Add a class for styling
      container.appendChild(message); // Append message to the container
    }

    // Function to display all fetched Search-results on the page:

    async function displaySearchResults(query) {
      const resultsContainer = document.getElementById("results-container"); // Your container element
      resultsContainer.innerHTML = ""; // Clear previous results

      const results = await fetchSearchResults(query);
      console.log(results); // Log the results to see what you get

      // if (!results) {
      //   console.error("No results found");
      //   return; // Exit if results are undefined
      // }

      // Provjera je li dobiveni rezultat prazan
      if (
        !results ||
        (results.artists.items.length === 0 &&
          results.albums.items.length === 0 &&
          results.tracks.items.length === 0)
      ) {
        displayMessage(resultsContainer, "No results found.");
        return; // Exit if all 3 results categories are undefined or empty
      }

      const ulArtists = document.createElement("ul"); // Create an unordered list for artists
      const ulAlbums = document.createElement("ul"); // Create an ordered list for albums
      const ulSongs = document.createElement("ul"); // Create an ordered list for songs
      const titleArtists = document.createElement("h4");
      const titleAlbums = document.createElement("h4");
      const titleSongs = document.createElement("h4");
      // [titleArtists, titleAlbums, titleSongs].forEach(element => element.createElement("h4"));
      // ulArtists.classList.add("flex-container");
      // ulAlbums.classList.add("flex-container");
      // ulSongs.classList.add("flex-container");
      [ulArtists, ulAlbums, ulSongs].forEach((element) =>
        element.classList.add("flex-container-ol")
      );

      // show subtitle inside results:
      ulArtists.appendChild(titleArtists);
      titleArtists.innerHTML = "Artists:";

      // Results displaying, depending on API-data structure (...to be modified):

      // Check and display ARTISTS:

      if (results.artists && results.artists.items.length > 0) {
        results.artists.items.forEach((item) => {
          const li = document.createElement("li");
          const img = document.createElement("img");

          // Provjera da li artist ima slike i da li je prva slika dostupna (if some is missing, doesn't matter, others will show up)
          if (item.images && item.images.length > 0) {
            img.src = item.images[0].url; // Set the image source
          } else {
            // Ako nema slika, postavi placeholder sliku:
            img.src = "./pictures/image-placeholder.jpg"; // Put the path to your placeholder image here
          }
          img.alt = `${item.name} Artist`;
          img.classList.add("result-image");

          // Insert the image before the text content
          li.insertBefore(img, li.firstChild);

          // Create a <div> for the text and append it
          const textDivArtist1 = document.createElement("div");
          const textDivArtist2 = document.createElement("div");
          // textDivArtist.textContent = `${item.name} - ${item.genres.join(
          //   ", "
          // )}`;
          textDivArtist1.textContent = `${item.name}`;
          li.appendChild(textDivArtist1);
          textDivArtist2.textContent = `${item.genres.join(", ")}`;
          li.appendChild(textDivArtist2);
          li.classList.add("li-item-style", "result-flex-item");

          titleArtists.classList.add("result-category"); // centered title "Artists:"
          textDivArtist1.classList.add("result-item-name"); // bold and bigger font

          ulArtists.appendChild(li);
          resultsContainer.appendChild(ulArtists);
        });
      }

      ulAlbums.appendChild(titleAlbums);
      titleAlbums.innerHTML = "Albums:";

      // Check and display ALBUMS:

      if (results.albums && results.albums.items.length > 0) {
        results.albums.items.forEach((item) => {
          const li = document.createElement("li");
          const img = document.createElement("img");

          // Provjera da li artist ima slike i da li je prva slika dostupna (id some is missing, doesn't matter, others will show up)
          if (item.images && item.images.length > 0) {
            img.src = item.images[0].url; // Set the image source
            img.alt = `${item.name} Album Cover`;
            img.classList.add("result-image");
            // Insert the image before the text content
            li.insertBefore(img, li.firstChild);
          }

          // Create a <div> for the text and append it

          const textDivAlbum1 = document.createElement("div");
          const textDivAlbum2 = document.createElement("div");
          const textDivAlbum3 = document.createElement("div");
          const textDivAlbum4 = document.createElement("div");
          // const [textDivAlbum1, textDivAlbum2, textDivAlbum3, textDivAlbum4] = Array.from({ length: 4 }, () => document.createElement("div"));
          // li.textContent = `${item.name} - by: ${item.artists[0].name} - release date: ${item.release_date} - album tracks nr: ${item.total_tracks}`;
          // li.appendChild(document.createTextNode(`${item.name} - by: ${item.artists[0].name} - release date: ${item.release_date} - album tracks nr: ${item.total_tracks}`));
          textDivAlbum1.textContent = `${item.name}`;
          textDivAlbum2.textContent = `By: ${item.artists[0].name}`;
          textDivAlbum3.textContent = `Release date: ${item.release_date}`;
          textDivAlbum4.textContent = `Album tracks number: ${item.total_tracks}`;
          // li.appendChild(textDivAlbum);
          li.append(textDivAlbum1, textDivAlbum2, textDivAlbum3, textDivAlbum4);
          li.classList.add("li-item-style", "result-flex-item");

          titleAlbums.classList.add("result-category"); // centered title "Albums:"
          textDivAlbum1.classList.add("result-item-name"); // bold and bigger font

          ulAlbums.appendChild(li);
          resultsContainer.appendChild(ulAlbums);
        });
      }

      ulSongs.appendChild(titleSongs);
      titleSongs.innerHTML = "Songs:";

      // Check and display TRACKS / SONGS:

      if (results.tracks && results.tracks.items.length > 0) {
        results.tracks.items.forEach((item) => {
          const li = document.createElement("li");
          const img = document.createElement("img");

          // Provjera da li artist ima slike i da li je prva slika dostupna (id some is missing, doesn't matter, others will show up)
          if (item.album && item.album.images && item.album.images.length > 0) {
            img.src = item.album.images[0].url; // Set the image source
            img.alt = `${item.name} Album Cover`;
            img.classList.add("result-image");
            // Insert the image before the text content
            li.insertBefore(img, li.firstChild);
          }

          // Create a <div> for the text and append it
          const textDivSong1 = document.createElement("div");
          const textDivSong2 = document.createElement("div");
          textDivSong1.textContent = `${item.name}`;
          textDivSong2.textContent = `By: ${item.artists[0].name}`;
          li.append(textDivSong1, textDivSong2);
          li.classList.add("li-item-style", "result-flex-item");

          titleSongs.classList.add("result-category"); // centered title "Songs:"
          textDivSong1.classList.add("result-item-name"); // bold and bigger font

          ulSongs.appendChild(li);
          resultsContainer.appendChild(ulSongs);
        });
      }
    }

    // dodati button play i button 'add to list' koji se appendaju ispod svake stavke
    // jedino artist nema te buttone, nego ima button za "explore music" ili slično, čime se otvaraju 10 njegovih albuma i pjesama.
    // dodati funkciju da se nakon pritiska na search button ili Enter tipku odmah fokusira na dobivene rezultate (pomak fokusa)
    // brojke staviti uz same list-iteme, a ne na početak retka (smanjiti width list-itema?)
    // tamo gdje se ne pojavljuju slike 8jer ih nema) staviti neku placeholder-sliku ili obavijest da slika nedostaje.

    // u Copper temi i Night temi i Frost tema staviti kontrastno: staviti bijela slova unutar formsa, a ne crna jer se ne vide
    // Energy tema - crna su slova, ali treba ih malo podebljati

    // možda (nice to have): dodati "expended search"?? - button kojim se pretraga po nekoj kategoriji može povećati, pa prikaže gradijalno svaki put još 10 rezultata.

    // Praćenje submita u search-form-u i prikaz search-rezultata:

    searchButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default form submission

      handleSearch(); // Pozovi handleSearch() umjesto displaySearchResults
    });

    // function for focusing on the Search Results:
    async function handleSearch() {
      const query = searchInput.value.trim(); // Get the input value

      const formContainer = document.getElementById("zero-input"); // Container near the input field

      // Uklonite ranije poruke upozorenja
    formContainer.querySelector(".warning-message")?.remove();

      if (query.length >= 1) {
        console.log("Form submitted");
        console.log("Query:", query);
        await displaySearchResults(query); // Koristi fetchSearchResults unutar displaySearchResults
        document.getElementById("search-results").focus(); // Focus on the results-container
      } else {
        console.log("Please enter your query - query not big enough.");
        displayMessage(formContainer, "Please enter your query - query not big enough.");
      }
    }

    // Praćenje pritiska na Enter tipku i poziv handleSearch()
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission on Enter
        handleSearch();
      }
    });

    // Event-listener za praćenje unosa u sva tri ova polja s posebnim kategorijama:
    [artistInput, songInput, albumInput].forEach((input) => {
      input.addEventListener("input", () => {
        const query = input.value.trim();
        if (query.length > 0) {
          fetchSuggestions2(query);
        } else {
          resultsList.innerHTML = ""; // Očisti rezultate ako je unos prazan
        }
      });
    });

    // Load lists from localStorage on init:
    function loadLists() {
      const savedList = localStorage.getItem("addedList");
      const savedFavorites = localStorage.getItem("favoritesList");

      if (savedList) {
        const items = JSON.parse(savedList);
        items.forEach((item) =>
          list.appendChild(
            createTask(
              item.artist,
              item.song,
              item.album,
              item.rating,
              item.time
            )
          )
        );
      }

      if (savedFavorites) {
        const items = JSON.parse(savedFavorites);
        items.forEach((item) =>
          favoritesList.appendChild(
            createFavorite(
              item.artist,
              item.song,
              item.album,
              item.rating,
              item.time
            )
          )
        );
      }
    }

    // Save lists to localStorage:
    function saveLists() {
      const addedItems = [];
      list.querySelectorAll("li").forEach((item) => {
        addedItems.push({
          artist: item.querySelector(".artist").textContent,
          song: item.querySelector(".song").textContent,
          album: item.querySelector(".album").textContent,
          rating: item.querySelector(".rating").textContent,
          time: item.querySelector(".time").textContent,
        });
      });
      localStorage.setItem("addedList", JSON.stringify(addedItems));

      const favoriteItems = [];
      favoritesList.querySelectorAll("li").forEach((item) => {
        favoriteItems.push({
          artist: item.querySelector(".artist").textContent,
          song: item.querySelector(".song").textContent,
          album: item.querySelector(".album").textContent,
          rating: item.querySelector(".rating").textContent,
          time: item.querySelector(".time").textContent,
        });
      });
      localStorage.setItem("favoritesList", JSON.stringify(favoriteItems));
    }

    // doraditi logiku Search funkcije !!! - što se dohvaća pomoću API-ja i kako se prikazuje

    // doraditi Play-funkciju:

    function playSong(event) {
      event.preventDefault();
    }

    // Creating new task / new item on a submit/play-list:
    function createTask(artist, song, album, rating, time) {
      const item = document.createElement("li");

      // const div = document.createElement("div");
      // div.classList.add("form-theme", "item-card");

      item.innerHTML = `<div class="form-theme item-card" > 
      <p class="item-fill flex-item">  
      <span class="thin"> Artist:  </span> <span  class="artist">${artist}</span> <br> 
      <span class="thin"> Song: </span> <span class="song">${song}</span> <br> 
      <span class="thin"> Album:  </span> <span class="album">${album}</span> <br> 
      <span class="thin"> Rate:  </span>   <span  class="rating">${rating}</span> <br> 
      <span class="thin"> Rated on:  </span>   <span class="time">${time}</span>
      </p>  </div>`;

      const itemCardDiv = item.querySelector(".item-card");

      addFavoriteButton(itemCardDiv);
      addRemoveButton(itemCardDiv);

      return item;
    }

    // console.log(paragraph);

    // Adding new task on the list:
    function addTask(event) {
      event.preventDefault();
      const artist = document.getElementById("artist").value.trim();
      const song = document.getElementById("song").value.trim();
      const album = document.getElementById("album").value.trim();
      const rating = document.getElementById("review").value;
      const time = new Date().toLocaleDateString();

      // test:
      //const time = new Date(2023, 11, 17).toLocaleDateString();

      const item = createTask(artist, song, album, rating, time);
      list.appendChild(item);
      document.getElementById("artist").value = "";
      document.getElementById("song").value = "";
      document.getElementById("album").value = "";
      document.getElementById("review").value = "";
      saveLists();
    }

    this.init = function () {
      // body initially has a default theme0:
      document.body.classList.add("theme0");
      // new task (item) added on the add-button click:
      submitToListButton.addEventListener("click", addTask);
      buttonPlay.addEventListener("click", playSong);
      loadLists();
    };

    // add button FavoriteButton:
    function addFavoriteButton(itemCardDiv) {
      const favoriteButton = document.createElement("button");
      favoriteButton.setAttribute("type", "button");
      favoriteButton.classList.add("favorite-button", "button", "flex-item");
      favoriteButton.addEventListener("click", setFavorite);
      favoriteButton.innerHTML = "Add to favorites";
      itemCardDiv.insertBefore(favoriteButton, itemCardDiv.firstChild);

      const listTitle = document.getElementById("new-title");
      listTitle.style.display = "block";
    }

    // Function setFavorite:
    function setFavorite(event) {
      const item = event.target.parentNode;
      const artist = item.querySelector(".artist").textContent;
      const song = item.querySelector(".song").textContent;
      const album = item.querySelector(".album").textContent;
      const rating = item.querySelector(".rating").textContent;
      const time = item.querySelector(".time").textContent;

      // Debugging:
      console.log("Extracted values:", { song, album, artist, rating, time });

      if (!artist || !song || !album || !rating || !time) {
        console.error("Some elements are missing in the item:", {
          artist,
          song,
          album,
          rating,
          time,
        });
        return;
      }

      // Create favorite item:
      const favoriteItem = createFavorite(artist, song, album, rating, time);

      // if (!songElement || !albumElement || !artistElement || !ratingElement || !timeElement) {
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
          console.log(`Added '${song}' on the favorites list.`);
        } else {
          console.log(`'${song}' is already on the list.`);
        }
      }

      addIf(favoriteItem);
      saveLists();
    }

    // Function createFavorite:
    function createFavorite(artist, song, album, rating, time) {
      const item = document.createElement("li");
      item.innerHTML = `<div class="form-theme item-card item-card2"> <p class="item-fill2 flex-item">
      <span class="thin2">Artist: </span><span class="artist2" id="white" >${artist}</span><br>
      <span class="thin2">Song: </span><span class="song2" id="white" > ${song} </span><br>
      <span class="thin2">Album: </span><span class="album2" id="white" >${album}</span><br>
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
