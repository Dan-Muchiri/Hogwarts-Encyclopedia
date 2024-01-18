document.addEventListener('DOMContentLoaded', () => {
    const studentButton = document.getElementById('student-btn');
    const staffButton = document.getElementById('staff-btn');
    const spellsButton = document.getElementById('spells-btn');
    const favoritesButton = document.getElementById('fav-btn');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const contentList = document.getElementById('list-container');
    
    studentButton.addEventListener('click', () => {
        fetchData('Students');
    });

    staffButton.addEventListener('click', () => {
        fetchData('Staff');
    });

    spellsButton.addEventListener('click', () => {
        fetchData("Spells");
    });

    favoritesButton.addEventListener('click', () => {
        fetchData('Favorites');
    });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        searchCharacters(searchTerm);
    });


    function fetchData(category) {
        let API_URL;
        switch (category) {
            case 'Students':
            API_URL = 'https://hp-api.onrender.com/api/characters/students';
            break;
            case 'Staff':
            API_URL = 'https://hp-api.onrender.com/api/characters/staff';
            break;
            case 'Spells':
            API_URL = 'https://hp-api.onrender.com/api/spells';
            break;
            case 'Favorites':
            API_URL = 'http://localhost:3000/characters';
            break;
            default:
            console.error('Invalid category');
            return;
        }
        
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            
            if (Array.isArray(data)) {
            contentList.innerHTML = '';

            const listHeader =document.createElement('h2');
            listHeader.textContent = `${category} list`;
            contentList.appendChild(listHeader); 

                if(category==="Favorites"){
                const smallHeader =document.createElement('h3');
                smallHeader.textContent = `Favorite Characters`;
                contentList.appendChild(smallHeader);
                }

            data.forEach((item,index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-item');
                listItem.textContent = item.name;

                listItem.addEventListener('click', () => {
                showDetails(item, category);
                });

                contentList.appendChild(listItem);

            if (index === 0) {
                listItem.click();
            } 
            });
            } else {
            console.error('Invalid data format received');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

            if(category==='Favorites'){
            fetchLocalSpells();
            }
    }


    function fetchLocalSpells() {
        fetch('http://localhost:3000/spells')
        .then(response => response.json())
        .then(data => {
            
            if (Array.isArray(data)) {
            const smallHeader =document.createElement('h3');
            smallHeader.textContent = `Favorite Spells`;
            contentList.appendChild(smallHeader);

            data.forEach((item,index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-item');
                listItem.textContent = item.name;
                
                listItem.addEventListener('click', () => {
                showDetails(item, 'Fav-spells');
                });
                contentList.appendChild(listItem);

            if (index === 0) {
                listItem.click();
            } 
            });
            } else {
            console.error('Invalid data format received');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }



    function showDetails(item,category) {
        const detailsContainer = document.getElementById('details');
        detailsContainer.innerHTML = '';
        
        if(category ==='Spells'){
        detailsContainer.innerHTML=`<h2>Name: ${item.name}</h2>
                                    <p>Description: ${item.description}</p>
                                    <button id='add-favorite'>Add to favorite</button>`

        const addButton = document.getElementById('add-favorite');
        addButton.addEventListener('click', () => {
            addToFavorites(item, category);
        });
        }else if (category === 'Fav-spells'){
            detailsContainer.innerHTML=`<h2>Name: ${item.name}</h2>
                                    <p>Description: ${item.description}</p>
                                    <button id='delete-favorite'>Remove favorite</button>`

        const deleteButton = document.getElementById('delete-favorite');
        deleteButton.addEventListener('click', () => {
            removeFavorite(item, category);
        });
        }else if (category === 'Favorites'){
            detailsContainer.innerHTML=`<h2>Name: ${item.name}</h2>
                                    <p>Species: ${item.species}</p>
                                    <p>Gender: ${item.gender}</p>
                                    <p>House: ${item.house}</p>
                                    <p>Ancestry: ${item.ancestry}</p>
                                    <p>Eye Color: ${item.eyeColour}</p>
                                    <p>Hair Color: ${item.hairColour}</p>
                                    <p>Wand: </p>
                                    <li>Wood: ${item.wand.wood}</li>
                                    <li>Core: ${item.wand.core}</li>
                                    <li>Length: ${item.wand.length}</li>
                                    <p>Patronus:${item.patronus}</p>
                                    <p>Actor: ${item.actor}</p>
                                    <img src='${item.image}'>
                                    <button id='delete-favorite'>Remove favorite</button>`;

        const deleteButton = document.getElementById('delete-favorite');
        deleteButton.addEventListener('click', () => {
            removeFavorite(item, category);
        });
        }else{
        detailsContainer.innerHTML=`<h2>Name: ${item.name}</h2>
                                    <p>Species: ${item.species}</p>
                                    <p>Gender: ${item.gender}</p>
                                    <p>House: ${item.house}</p>
                                    <p>Ancestry: ${item.ancestry}</p>
                                    <p>Eye Color: ${item.eyeColour}</p>
                                    <p>Hair Color: ${item.hairColour}</p>
                                    <p>Wand: </p>
                                    <li>Wood: ${item.wand.wood}</li>
                                    <li>Core: ${item.wand.core}</li>
                                    <li>Length: ${item.wand.length}</li>
                                    <p>Patronus:${item.patronus}</p>
                                    <p>Actor: ${item.actor}</p>
                                    <img src='${item.image}'>
                                    <button id='add-favorite'>Add to favorite</button>`;

                                    const addButton = document.getElementById('add-favorite');
                                    addButton.addEventListener('click', () => {
                                        addToFavorites(item, category);
                                    });
        }

    }


    function addToFavorites(item, category) {
        console.log('Adding to favorites:', item);
    
        let API_URL;
        if (category === "Spells") {
            API_URL = 'http://localhost:3000/spells';
        } else {
            API_URL = 'http://localhost:3000/characters';
        }
    
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Added to favorites:', data);
        })
        .catch(error => {
            console.error('Error adding to favorites:', error);});

        const addButton = document.getElementById('add-favorite');
            addButton.textContent = 'Among Favorites';
            addButton.classList.add('is-favorite'); 
    }


    function removeFavorite(item, category) {
        console.log('Removing from favorites:', item);
    
        let API_URL;
        if (category === 'Fav-spells') {
            API_URL = `http://localhost:3000/spells/${item.id}`;
        } else {
            API_URL = `http://localhost:3000/characters/${item.id}`;
        }
    
        fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to remove from favorites: ${response.status}`);
                }
                console.log('Removed from favorites successfully');
                favoritesButton.click();
            })
            .catch(error => {
                console.error('Error removing from favorites:', error);
            });
    }
    
    
    
    
    


    function searchCharacters(searchTerm) {
        fetch('https://hp-api.onrender.com/api/characters')
            .then(response => response.json())
            .then(characterData => {
                if (Array.isArray(characterData)) {
                    const filteredCharacters = characterData.filter(character =>
                        character.name.toLowerCase().includes(searchTerm)
                    );
    
                    contentList.innerHTML = '';  
    
                    if (filteredCharacters.length > 0) {
                        const listHeaderCharacters = document.createElement('h2');
                        listHeaderCharacters.textContent = 'Search Results - Characters';
                        contentList.appendChild(listHeaderCharacters);
    
                        filteredCharacters.forEach((character, index) => {
                            const listItem = document.createElement('li');
                            listItem.classList.add('list-item');
                            listItem.textContent = character.name;
    
                            listItem.addEventListener('click', () => {
                                showDetails(character, 'Search Results - Characters');
                            });
    
                            contentList.appendChild(listItem);
    
                            if (index === 0) {
                                listItem.click();
                            }
                        });
                    }

                    fetch('https://hp-api.onrender.com/api/spells')
                        .then(response => response.json())
                        .then(spellData => {
                            if (Array.isArray(spellData)) {
                        
                                const filteredSpells = spellData.filter(spell =>
                                    spell.name.toLowerCase().includes(searchTerm)
                                );
    
                                if (filteredSpells.length > 0) {
                                    const listHeaderSpells = document.createElement('h2');
                                    listHeaderSpells.textContent = 'Search Results - Spells';
                                    contentList.appendChild(listHeaderSpells);
    
                                    filteredSpells.forEach((spell,index) => {
                                        const listItem = document.createElement('li');
                                        listItem.classList.add('list-item');
                                        listItem.textContent = spell.name;
    
                                        listItem.addEventListener('click', () => {
                                            showDetails(spell, 'Spells');
                                        });
    
                                        contentList.appendChild(listItem);

                                        if (index === 0) {
                                            listItem.click();
                                        }
                                    });
                                } else if (filteredCharacters.length < 1) {
                                    contentList.innerHTML = '<p>No matching results found.</p>';
                                }
                            } else {
                                console.error('Invalid spell data format received');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching spells data:', error);
                        });
                } else {
                    console.error('Invalid character data format received');
                }
            })
            .catch(error => {
                console.error('Error fetching characters data:', error);
            });
    }
    

    studentButton.click()

});