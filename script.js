const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    displayBooks(myLibrary);
}

function displayBooks(lib) {
    const content = document.querySelector(".content");
    while(content.firstChild) {
        content.removeChild(content.lastChild);
    }
    lib.forEach((book, i) => {
        const container = document.createElement("div");
        container.classList.add("container");
        content.appendChild(container);
        for(property in book) {
            if(property === "read") {
                const prop = document.createElement("div");
                prop.textContent = `${property.toString().charAt(0).toUpperCase() + property.toString().slice(1)}:`;
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = book.read;
                checkbox.addEventListener("click", () => {
                    book.toggleRead();
                    displayBooks(myLibrary);
                });
                prop.classList.add("property");
                container.appendChild(prop);
                prop.appendChild(checkbox);
                
            }
            else if (book.hasOwnProperty(property))
            {
                const prop = document.createElement("div");
                prop.textContent = `${property.toString().charAt(0).toUpperCase() + property.toString().slice(1)}: ${book[property]}`;
                prop.classList.add("property")
                container.appendChild(prop);
            }
        }
        const del = document.createElement("input");
        del.type = "button";
        del.value = "Delete book";
        container.classList.add(i);
        del.addEventListener("click", function(element) {
            myLibrary.splice(this.classList[0], 1);
            displayBooks(myLibrary);
        });
        container.appendChild(del);
    });
}

const addBook = document.getElementById("add-book");
const close = document.getElementById("close");
const sumbit = document.getElementById("submit");
const formContainer = document.querySelector("dialog");
const form = document.querySelector("form");

addBook.addEventListener("click", () => {
    formContainer.showModal();
});

close.addEventListener("click", () => {
    formContainer.close();
});

form.addEventListener("submit", () => {
    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.checked);
    form.reset();
});

displayBooks(myLibrary);

//addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1, false);
//addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", 2, false);
//addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 3, false);
//addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", 4, false);
//addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 5, false);
//addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", 6, false);