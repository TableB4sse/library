function Book(title, author, pages, isRead, id){
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author} ${this.pages} pages, ${this.isRead ? 'read':'not read yet'}`;
}

function addBookToLibrary(title, author, pages, read, id, library){
  const book = new Book(title, author, pages, read, id);
  library.push(book);
};


function removeBook(library, bookId){
  const bookIndex = library.findIndex((book) => book.id == bookId );
  library.splice(bookIndex, 1);
  displayBook(library);
}


function displayBook(library){
  const libraryContainer = document.querySelector(".library-container");
  libraryContainer.textContent = "";

  library.forEach((book) => {
    const divBook = document.createElement("div");
    const readButton = document.createElement("button");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const removeButton = document.createElement("button");

    divBook.classList.add("book");

    readButton.textContent = "READ";
    if (book.isRead) {
      readButton.classList.add("not-read");
      readButton.classList.add("read");
    } else {
      readButton.classList.add("not-read");
    }
    readButton.addEventListener("click", () => {
      book.isRead = !book.isRead;
      readButton.classList.toggle("read");

    });

    title.textContent = book.title;
    title.classList.add("title");
    author.textContent = "Author: " + book.author;
    author.classList.add("author");
    pages.textContent = "Pages: " + book.pages;
    pages.classList.add("pages");

    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", () => {
      removeBook(library, book.id);
    });

    divBook.append(readButton, title, author, pages, removeButton);

    libraryContainer.append(divBook);

  });
}

const newBookButton = document.querySelector(".new-book-btn");
const bookModal = document.querySelector(".book-modal");
const addButton = document.querySelector(".add-button");
const cancelButton = document.querySelector(".cancel-button");
const bookForm = document.querySelector(".book-form");

function openBookModal() {
  bookModal.showModal();
}

function closeBookModal(){
  bookForm.reset();
  bookModal.close();
}

function addBook(library){
  const bookData = new FormData(bookForm);
  const bookId = crypto.randomUUID();
  addBookToLibrary(bookData.get("title"), bookData.get("author"), bookData.get("pages"), bookData.has("isRead"), bookId, library);
}

function setupEventListeners (library) {
  newBookButton.addEventListener("click", openBookModal);
  cancelButton.addEventListener("click", closeBookModal);
  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook(library);
    closeBookModal();
    displayBook(library);
  });
}

const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 295, false, crypto.randomUUID()),
  new Book("A Little Life", "Hanya Yanagihara", 738, true, crypto.randomUUID()),
  new Book("1984", "George Orwell", 328, true, crypto.randomUUID()),
  new Book("Dune", "Frank Herbert", 688, false, crypto.randomUUID()),
  new Book("The Name of the Wind", "Patrick Rothfuss", 662, true, crypto.randomUUID()),
  new Book("The Catcher in the Rye", "J.D. Salinger", 277, false, crypto.randomUUID()),
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, true, crypto.randomUUID()),
  new Book("Crime and Punishment", "Fyodor Dostoevsky", 671, false, crypto.randomUUID()),
  new Book("The Martian", "Andy Weir", 387, true, crypto.randomUUID()),
  new Book("Project Hail Mary", "Andy Weir", 496, false, crypto.randomUUID()),
  new Book("The Count of Monte Cristo", "Alexandre Dumas", 1276, true, crypto.randomUUID()),
  new Book("The Three-Body Problem", "Liu Cixin", 416, false, crypto.randomUUID()),
];

setupEventListeners(myLibrary);
displayBook(myLibrary);
