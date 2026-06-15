
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

const myLibrary = [
  new Book("The Hobbit", "J.R.R Tolkien", 295, false, crypto.randomUUID()),
  new Book("A Little Life", "Hanya Yanagihara", 738, true, crypto.randomUUID()),
];


