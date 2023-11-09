const getJokeButton = document.getElementById("getJokeButton");
        const saveJokeButton = document.getElementById("saveJokeButton");
        const jokeText = document.getElementById("jokeText");
        const funnySound = document.getElementById("funnySound");
        const savedJokesList = document.getElementById("savedJokesList");
        const volumeSlider = document.getElementById("volumeSlider");

        // Function to display saved jokes on page load
        function displaySavedJokes() {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith("savedJoke-")) {
                    const savedJoke = localStorage.getItem(key);
                    const listItem = document.createElement("li");
                    listItem.textContent = savedJoke;
                    listItem.setAttribute("data-key", key);
                    listItem.addEventListener("click", removeSavedJoke);
                    savedJokesList.appendChild(listItem);
                }
            }
        }

        // Function to remove a saved joke
        function removeSavedJoke() {
            const key = this.getAttribute("data-key");
            localStorage.removeItem(key);
            savedJokesList.removeChild(this);
        }

        // Display saved jokes on page load
        displaySavedJokes();

        getJokeButton.addEventListener("click", () => {
            funnySound.volume = volumeSlider.value; // Adjust volume
            funnySound.play();
            fetch("https://icanhazdadjoke.com/", {
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "BadJokeGov/1.0"
                }
            })
            .then(response => response.json())
            .then(data => {
                const joke = data.joke;
                jokeText.textContent = joke;
            })
            .catch(error => {
                jokeText.textContent = "An error occurred while fetching the joke.";
                console.error(error);
            });
        });

        saveJokeButton.addEventListener("click", () => {
            const currentJoke = jokeText.textContent;
            if (currentJoke) {
                const key = "savedJoke-" + new Date().getTime();
                const listItem = document.createElement("li");
                listItem.textContent = currentJoke;
                listItem.setAttribute("data-key", key);
                listItem.addEventListener("click", removeSavedJoke);
                savedJokesList.appendChild(listItem);
                localStorage.setItem(key, currentJoke);
            }
        });

        // Update audio volume when the slider is moved
        volumeSlider.addEventListener("input", () => {
            funnySound.volume = volumeSlider.value;
        });
