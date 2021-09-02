const errorMessage = document.getElementById('error-message');

const loadData = () => {
    // input value
    const inputValue = document.getElementById('search-field');

    // error
    if (inputValue.value == '') {
        errorMessage.innerHTML = `
       <span class='d-block text-gray'>Input Book Name</span>
       `;
    } else {
        // Loading data
        const url = `https://openlibrary.org/search.json?q=${inputValue.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data))
            .catch(error => console.log('api error'));

        // clear error message
        errorMessage.innerHTML = '';
    }
    // clear input value
    inputValue.value = '';

}
const displayData = (books) => {

    // search found
    const totalFound = document.getElementById('total-found');
    totalFound.innerHTML = `

    <span class='d-block text-gray'>About ${books.numFound} Results Searching '${books.q}' keyword</span>
    
    `;

    // All About Search Result 
    const minBooks = books.docs;
    console.log(minBooks);
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    minBooks.forEach(book => {
        const cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                 <div class="card h-100">
                  <img src="${cover}" class="card-img-top" alt="...">
                    <div class="card-body">
                     <h5 class="card-title">${book.first_publish_year}</h5>
                     <h5 class="card-title">${book.author_name[0] ? book.author_name[0] : "Unknown"}</h5>
                     <h5 class="card-title">${book.publisher[0] ? book.publisher[0] : "Unknown"}</h5>
                     <p class="card-text">${(book.title)}</p>
                  </div>
              </div>
            `;
        searchResult.appendChild(div);
    });


}