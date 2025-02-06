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
}

function displayBooks(lib) {
    const content = document.querySelector(".content");
    while(content.firstChild) {
        content.removeChild(content.lastChild);
    }
    lib.forEach((book) => {
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
    });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", 9999, true);


displayBooks(myLibrary);