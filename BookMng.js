const sign_up_open = document.getElementById("sign-up-open");
const sign_up_container = document.getElementById("sign-up-container");
const sign_up_close = document.getElementById("sign-up-close");
const log_in_open = document.getElementById("log-in-open");
const log_in_container = document.getElementById("log-in-container");
const log_in_close = document.getElementById("log-in-close");
const padajuci_meni = document.getElementById("padajuci-meni");
const show_favorites = document.getElementById("show-favorites");
const genre_menu = document.getElementById("genre-meni");
const search = document.getElementById("search");
let favoriteBookIds = []; // Array za praćenje omiljenih knjiga

search.addEventListener("input", function () {
    const searchTerm = search.value.trim().toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.year.toString().includes(searchTerm) ||
        book.pages.toString().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

show_favorites.className = "w-1/3 h-12 bg-white border border-transparent rounded-xl cursor-pointer";
let showFavorites = false;

show_favorites.addEventListener("click", function () {
    showFavorites = !showFavorites;

    if (showFavorites) {
        show_favorites.className = "w-1/3 h-12 bg-green-500 border border-transparent font-bold rounded-xl cursor-pointer";
        showFavoritesOnly();
    } else {
        show_favorites.className = "w-1/3 h-12 bg-white border border-transparent rounded-xl cursor-pointer";
        displayBooks();
    }
});

function add_to_favorites(bookId) {
    favoriteBookIds.push(bookId);
    displayBooks();
}

function showFavoritesOnly() {
    const favoriteBooks = books.filter(book => favoriteBookIds.includes(book.id));
    displayBooks(favoriteBooks);
}

genre_menu.addEventListener("change", function () {
    const selectedGenre = genre_menu.value;
    if (selectedGenre === "1") {
        displayBooks(); // Prikazujemo sve knjige ako je izabrana opcija "Sort by genre:"
    } else {
        const filteredBooksByGenre = books.filter(book =>
            book.genre.toLowerCase() === selectedGenre.toLowerCase()
        );
        displayBooks(filteredBooksByGenre); // Prikazujemo samo knjige sa izabranim žanrom
    }
});

function updateGenreMenu() {
    genre_menu.innerHTML = '<option value="1">Sort by genre:</option>';
    const uniqueGenres = [...new Set(books.map(book => book.genre))];
    uniqueGenres.forEach((genre, index) => {
        const option = document.createElement('option');
        option.value = genre.toLowerCase();
        option.textContent = genre;
        genre_menu.appendChild(option);
    });
}


var imgSrc = null;
var reviewText = null;
sign_up_open.onclick = function () {
    sign_up_container.style.display = "flex";
    sign_up_container.style.zIndex = 1;
};

sign_up_close.onclick = function () {
    sign_up_container.style.display = "none";
};

log_in_open.onclick = function () {
    log_in_container.style.display = "flex";
    log_in_container.style.zIndex = 1;
};

log_in_close.onclick = function () {
    log_in_container.style.display = "none";
};

padajuci_meni.addEventListener("change", function () {
    const selectedOption = parseInt(padajuci_meni.value);
    if (selectedOption === 2) {
        sortBooksByTitleAZ();
    } else if (selectedOption === 3) {
        sortBooksByAuthor();
    } else if (selectedOption === 4) {
        sortBooksByPublicationYear();
    } else if (selectedOption === 5) {
        sortBooksByRatingDescending();
    } else if (selectedOption === 6) {
        sortBooksByPages();
    } else {
        displayBooks();
    }
});
function sortBooksByRatingDescending() {
    books.sort((a, b) => {
        // Prvo tretiramo slučaj kada je rating null
        if (a.rating === null && b.rating === null) {
            // Ako oba nemaju rating, održavamo trenutni redosled
            return 0;
        } else if (a.rating === null) {
            // Ako a nema rating, stavljamo ga na kraj
            return 1;
        } else if (b.rating === null) {
            // Ako b nema rating, stavljamo ga na početak
            return -1;
        } else {
            // Oba imaju rating, pa ih sortiramo od najvećeg ka najmanjem
            return b.rating - a.rating;
        }
    });
    displayBooks();
}


function sortBooksByPages() {
    books.sort((a, b) => b.pages - a.pages);
    displayBooks();
}



function sortBooksByPublicationYear() {
    books.sort((a, b) => b.year - a.year);
    displayBooks();
}

function sortBooksByAuthor() {
    books.sort((a, b) => {
        const titleA = a.author.toUpperCase();
        const titleB = b.author.toUpperCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
    displayBooks();
}

function sortBooksByTitleAZ() {
    books.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
    displayBooks();
}


let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Romance', year: 1925, pages: 208, review: null },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813, pages: 432,  review: null },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Southern Gothic Bildungsroman', year: 1960, pages: 336,  review: null },
    { id: 4, title: 'Anna Karenina', author: 'Leo Tolstoy', genre: 'Realist novel', year: 1878, pages: 1174, review: null },
    { id: 5, title: 'Lolita', author: 'Vladimir Nabokov', genre: 'Erotic novel', year: 1955, pages: 336, review: null },
];

const add_book = document.getElementById("add-book");
const bookList = document.getElementById('book-list');

function displayBooks(booksArray = books) {
    bookList.innerHTML = '';
    booksArray.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = "border w-full h-40 border-gray-300 flex flex-row gap-4 justify-between items-end rounded-xl m-2 p-4 bg-white shadow-md relative";
        const bookInfo = document.createElement('div');
        bookInfo.className = "flex flex-col ";
        bookInfo.innerHTML = `
          <div class="font-bold justify-start text-lg hover:underline book-title">${book.title}</div> 
          <div class="">Author: ${book.author}</div>
          <div>Genre: ${book.genre}</div>
          <div>Year: ${book.year}</div>
          <div>Number of pages: ${book.pages}</div>
        `;

        const starsContainer = document.createElement('div');
        starsContainer.className = "";

        starsContainer.innerHTML = `
          <span class="flex">
            <span class="star text-3xl cursor-pointer ${getStarColor(book.rating, 1)}" data-value="1">&#9733;</span>
            <span class="star text-3xl cursor-pointer ${getStarColor(book.rating, 2)}" data-value="2">&#9733;</span>
            <span class="star text-3xl cursor-pointer ${getStarColor(book.rating, 3)}" data-value="3">&#9733;</span>
            <span class="star text-3xl cursor-pointer ${getStarColor(book.rating, 4)}" data-value="4">&#9733;</span>
            <span class="star text-3xl cursor-pointer ${getStarColor(book.rating, 5)}" data-value="5">&#9733;</span>
          </span>
        `;

        const favoriteButton = document.createElement('button');
        favoriteButton.className = "absolute top-3 h-2/5 right-36 px-3 py-1 bg-white mr-4 w-28 box-border border-2 border-black  rounded-2xl cursor-pointer hover:bg-blue-200 hover:border-transparent hover:font-bold";
        favoriteButton.textContent = "Add to Favorites";
        favoriteButton.setAttribute('data-id', book.id);
        favoriteButton.addEventListener("click", function() {
            add_to_favorites(book.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = "absolute top-12 h-1/5 right-2 px-3 py-1 bg-white mr-4 w-28 box-border border-2 border-black  rounded-2xl cursor-pointer hover:bg-red-200 hover:border-transparent  hover:font-bold";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute('data-id', book.id);
        deleteButton.addEventListener('click', (event) => {
            const bookId = parseInt(event.target.getAttribute('data-id'));
            deleteBook(bookId);
        });

        const editButton = document.createElement('button');
        editButton.className = "absolute top-3 h-1/5 right-2 px-3 py-1 bg-white mr-4 w-28 box-border border-2 border-black rounded-2xl cursor-pointer hover:bg-purple-200 hover:border-transparent  hover:font-bold";
        editButton.textContent = "Edit";
        editButton.setAttribute('data-id', book.id);
        editButton.addEventListener('click', () => {
            const bookId = parseInt(editButton.getAttribute('data-id'));
            const selectedBook = books.find(book => book.id === bookId);
            editBook(selectedBook);
        });

        const reviewR = document.createElement('button');
        reviewR.className = "absolute top-18 right-36 h-2/5 text-md right-2 px-3 py-1 bg-white mr-4 w-28 box-border border-2 border-black  rounded-2xl cursor-pointer hover:bg-purple-200 hover:border-transparent hover:font-bold";
        reviewR.innerHTML = book.review ? "Review" : "Add Review";

        reviewR.setAttribute('data-id', book.id);
        reviewR.addEventListener("click", function () {
            if (reviewR.innerHTML === "Add Review") {
                reviewR.innerHTML = "Review";
                bookImg_bookDescription(book);
            } else if (reviewR.innerHTML === "Review") {
                saveBookInfo(book);
                reviewR.innerHTML = "Review";
            }
        }); 

        bookItem.appendChild(bookInfo);
        bookItem.appendChild(favoriteButton);
        bookItem.appendChild(starsContainer);
        bookItem.appendChild(deleteButton);
        bookItem.appendChild(editButton);
        bookItem.appendChild(reviewR);
        bookList.appendChild(bookItem);

        const ratingStars = bookItem.querySelectorAll('.star');
        ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const ratingValue = parseInt(star.getAttribute('data-value'));
                const bookId = parseInt(bookItem.getAttribute('data-id'));
                const starsContainer = star.parentNode;
                starsContainer.querySelectorAll('.star').forEach(s => {
                    const sValue = parseInt(s.getAttribute('data-value'));
                    if (sValue <= ratingValue) {
                        s.classList.add('text-yellow-500');
                    } else {
                        s.classList.remove('text-yellow-500');
                    }
                });
                setRating(bookId, ratingValue);
            });
        });

        const bookTitleElement = bookItem.querySelector('.book-title');
        bookTitleElement.addEventListener("click", function () {
            bookImg_bookDescription(book);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    updateGenreMenu();
});

function addBookToList(title, author, genre, year, pages) {
    const newBook = {
        id: books.length + 1,
        title,
        author,
        genre,
        year,
        pages,
        rating: 0,
        review: null
    };
    books.push(newBook);
    displayBooks();
    updateGenreMenu();
}

function book_add() {
    const book_container = document.createElement('div');
    book_container.className = "fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center";

    const book_form = document.createElement('div');
    book_form.className = "bg-purple-200 p-6 flex flex-col box-border border-2 border-black w-450 gap-5 rounded-5";

    const input_title = document.createElement('input');
    input_title.className = "w-full h-10 px-4 text-base rounded-7";
    input_title.setAttribute("type", "text");
    input_title.setAttribute("placeholder", "Add book title");

    const input_author = document.createElement('input');
    input_author.className = "w-full h-10 px-4 text-base rounded-7";
    input_author.setAttribute("type", "text");
    input_author.setAttribute("placeholder", "Add author name");

    const input_genre = document.createElement('input');
    input_genre.className = "w-full h-10 px-4 text-base rounded-7";
    input_genre.setAttribute("type", "text");
    input_genre.setAttribute("placeholder", "Add book genre");

    const input_year = document.createElement('input');
    input_year.className = "w-full h-10 px-4 text-base rounded-7";
    input_year.setAttribute("type", "text");
    input_year.setAttribute("placeholder", "Add publication year");

    const input_pages = document.createElement('input');
    input_pages.className = "w-full h-10 px-4 text-base rounded-7";
    input_pages.setAttribute("type", "text");
    input_pages.setAttribute("placeholder", "Add number of pages");

    const add_button = document.createElement('button');
    add_button.className = "w-full pl-3 h-12 text-left text-lg bg-white border border-transparent rounded-lg focus:outline-none focus:border-gray-300 cursor-pointer box-border hover:bg-purple-300 hover:border-2 hover:border-black hover:font-bold";
    add_button.innerHTML = "Add book";
    add_button.addEventListener("click", function () {
        const title = input_title.value;
        const author = input_author.value;
        const genre = input_genre.value;
        const year = input_year.value;
        const pages = input_pages.value;
        addBookToList(title, author, genre, year, pages);
        book_container.remove();
    });

    book_form.append(input_title);
    book_form.append(input_author);
    book_form.append(input_genre);
    book_form.append(input_year);
    book_form.append(input_pages);
    book_form.append(add_button);
    book_container.append(book_form);
    document.body.appendChild(book_container);
}

function editBook(book) {
    const editContainer = document.createElement('div');
    editContainer.className = "fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center";

    const editForm = document.createElement('div');
    editForm.className = "bg-purple-200 p-6 flex flex-col box-border border-2 border-black w-450 gap-5 rounded-5";

    const inputTitle = document.createElement('input');
    inputTitle.className = "w-full h-10 px-4 text-base rounded-7";
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Edit book title");
    inputTitle.value = book.title;

    const inputAuthor = document.createElement('input');
    inputAuthor.className = "w-full h-10 px-4 text-base rounded-7";
    inputAuthor.setAttribute("type", "text");
    inputAuthor.setAttribute("placeholder", "");
    inputAuthor.value = book.author;

    const inputGenre = document.createElement('input');
    inputGenre.className = "w-full h-10 px-4 text-base rounded-7";
    inputGenre.setAttribute("type", "text");
    inputGenre.setAttribute("placeholder", "");
    inputGenre.value = book.genre;

    const inputYear = document.createElement('input');
    inputYear.className = "w-full h-10 px-4 text-base rounded-7";
    inputYear.setAttribute("type", "text");
    inputYear.setAttribute("placeholder", "");
    inputYear.value = book.year;

    const inputPages = document.createElement('input');
    inputPages.className = "w-full h-10 px-4 text-base rounded-7";
    inputPages.setAttribute("type", "text");
    inputPages.setAttribute("placeholder", "");
    inputPages.value = book.pages;

    const saveButton = document.createElement('button');
    saveButton.className = "w-full pl-3 h-12 text-left text-lg bg-white border border-transparent rounded-lg focus:outline-none focus:border-gray-300 cursor-pointer box-border hover:bg-purple-300 hover:border-2 hover:border-black hover:font-bold";
    saveButton.innerHTML = "Save changes";
    saveButton.addEventListener("click", function () {
        book.title = inputTitle.value;
        book.author = inputAuthor.value;
        book.genre = inputGenre.value;
        book.year = inputYear.value;
        book.pages = inputPages.value;
        displayBooks();
        editContainer.remove();
    });

    editForm.append(inputTitle);
    editForm.append(inputAuthor);
    editForm.append(inputGenre);
    editForm.append(inputYear);
    editForm.append(inputPages);
    editForm.append(saveButton);
    editContainer.append(editForm);
    document.body.appendChild(editContainer);
}

function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    displayBooks();
}

function setRating(bookId, ratingValue) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        book.rating = ratingValue;
        displayBooks();
    }
}

function getStarColor(rating, starNumber) {
    if (rating >= starNumber) {
        if (starNumber === 1) {
            return 'text-yellow-500';
        } else if (starNumber === 2) {
            return 'text-yellow-500';
        } else if (starNumber === 3) {
            return 'text-yellow-500';
        } else if (starNumber === 4) {
            return 'text-yellow-500';
        } else {
            return 'text-yellow-500';
        }
    } else {
        return 'text-gray-400';
    }
}

add_book.addEventListener("click", function () {
    book_add();
});

function bookImg_bookDescription(book) {
    const img_description_Container = document.createElement('div');
    img_description_Container.className = "fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex flex-col items-center justify-center";

    const img_description_form = document.createElement('div');
    img_description_form.className = "w-1/3 bg-transparent h-1/5 flex flex-row gap-2 rounded-2xl";

    const img_form = document.createElement('div');
    img_form.className = "w-1/2 h-full bg-purple-200 flex justify-center items-center border-2 border-black border-opacity-50 rounded-2xl";

    const img_button = document.createElement('button');
    img_button.className = "bg-white w-28 h-12 box-border border-2 border-black rounded-2xl cursor-pointer hover:bg-purple-300 hover:border-4 hover:border-black hover:font-bold";
    img_button.innerHTML = "Add Image";
    img_button.addEventListener("click", function () {
        img_button.remove();
        const imageElement = document.createElement('img');
        imageElement.src = "../Images/knjiga.png";
        imageElement.className = "w-full h-full object-cover rounded-2xl";
        img_form.appendChild(imageElement);
    });

    const description_form = document.createElement('div');
    description_form.className = "w-1/2 h-full bg-purple-200 flex flex-col gap-2 justify-center items-center border-2 border-black border-opacity-50 rounded-2xl";

    const description_input = document.createElement('textarea');
    description_input.className = "w-full bg-purple-200 h-3/4 px-2 py-1 text-base rounded-2xl border border-gray-300 resize-none";
    description_input.setAttribute("placeholder", "Add your review");
    description_input.setAttribute("wrap", "soft");

    const button = document.createElement('button');
    button.className = "bg-white w-40 h-12 box-border border-2 border-black rounded-2xl cursor-pointer hover:bg-purple-200 hover:border-4 hover:border-black hover:font-bold";
    button.innerHTML = "Save";
    button.addEventListener("click", function () {
        imgSrc = img_form.querySelector('img').src;
        reviewText = description_input.value;
        book.review = reviewText;
        img_description_Container.remove();
    });

    description_form.append(description_input);
    description_form.append(button);
    img_form.append(img_button);
    img_description_form.append(img_form);
    img_description_form.append(description_form);

    img_description_Container.append(img_description_form);

    document.body.appendChild(img_description_Container);
}

function saveBookInfo(book) {
    const savedBookInfo = document.createElement('div');
    savedBookInfo.className = "fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex flex-col items-center justify-center";

    const savedBookInfoForm = document.createElement('div');
    savedBookInfoForm.className = "bg-purple-200 p-6 flex flex-col justify-center items-center box-border border-2 border-black w-1/3 h-2/5 gap-5 rounded-5";

    const reviewAll = document.createElement('div');
    reviewAll.className = "w-full h-3/4 flex gap-2 flex-row";

    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.className = "w-1/2 h-auto object-cover rounded-2xl";

    const reviewElement = document.createElement('div');
    reviewElement.className = "w-1/2 border-2 p-2 border-black border-opacity-50 rounded-2xl overflow-wrap overflow-y-auto";
    reviewElement.textContent = book.review;

    const closeButton = document.createElement('button');
    closeButton.className = "bg-white w-28 box-border border-2 border-black border-opacity-0 rounded-2xl cursor-pointer hover:bg-red-500 hover:border-transparent hover:font-bold";
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", function () {
        savedBookInfo.remove();
    });

    reviewAll.append(imgElement);
    reviewAll.append(reviewElement);
    savedBookInfoForm.append(reviewAll);
    savedBookInfoForm.append(closeButton);
    savedBookInfo.append(savedBookInfoForm);
    document.body.appendChild(savedBookInfo);
}
