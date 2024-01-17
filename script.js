document.addEventListener('DOMContentLoaded', () => {
    const studentButton = document.getElementById('student-btn');
    const staffButton = document.getElementById('staff-btn');
    const spellsButton = document.getElementById('spells-btn');
    const contentList = document.getElementById('list-container');
    
    studentButton.addEventListener('click', (event) => {
        fetchData('Students');
    });


    function fetchData(category) {
        let API_URL;
        API_URL = 'https://hp-api.onrender.com/api/characters/students';
        
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

    studentButton.click()

});