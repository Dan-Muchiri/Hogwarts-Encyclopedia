document.addEventListener('DOMContentLoaded', () => {
    const studentButton = document.getElementById('student-btn');
    const staffButton = document.getElementById('staff-btn');
    const spellsButton = document.getElementById('spells-btn');
    const contentList = document.getElementById('list-container');
    
    studentButton.addEventListener('click', (event) => {
        fetchData('Students');
    });

    staffButton.addEventListener('click', (event) => {
        fetchData('Staff');
    });

    spellsButton.addEventListener('click', (event) => {
        fetchData("Spells");
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

            data.forEach((item,index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-item');
                listItem.textContent = item.name;
                listItem.dataset.id = item._id; 
                
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
    }


    function showDetails(item,category) {
        const detailsContainer = document.getElementById('details');
        detailsContainer.innerHTML = '';
        
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
                                    <img src='${item.image}'>`
    }

    studentButton.click()

});