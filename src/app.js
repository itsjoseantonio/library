let myLibrary = [];
let index = 0;

const inputTitle = document.querySelector('.inputTitle');
const inputAuthor = document.querySelector('.inputAuthor');
const inputPages = document.querySelector('.inputPages');
const inputStatus = document.querySelector('.inputStatus');
const buttonDelete = document.querySelector('.buttonDelete');
const buttonSubmit = document.getElementById('buttonSubmit');
const container = document.querySelector('.container-books');

// MODAL
const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.addBook = function () {
    const newBook = {};
    newBook.title = this.title;
    newBook.author = this.author;
    newBook.pages = this.pages;
    newBook.status = this.status;
    myLibrary.push(newBook);
    console.log(myLibrary, 'LIBRARY');
};

Book.prototype.displayBook = function (book) {
    let isChecked = this.status;

    if (isChecked === undefined) isChecked = book.status;
    else isChecked = this.status;

    const wrapper = document.createElement('div');
    wrapper.classList.add('four', 'wide', 'column', 'wrap-card');
    wrapper.setAttribute('data-index', index);

    const uicard = document.createElement('div');
    uicard.classList.add('ui', 'cards');

    const card = document.createElement('div');
    card.classList.add('card');

    const content = document.createElement('div');
    content.classList.add('content');

    const pages = document.createElement('div');
    pages.classList.add('right', 'floated', 'meta');
    pages.textContent = `${book.pages} pág.`;

    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = book.title;

    const meta = document.createElement('div');
    meta.classList.add('meta');
    meta.textContent = book.author;

    const description = document.createElement('div');
    description.classList.add('description');

    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const inputCheck = document.createElement('input');
    inputCheck.setAttribute('type', 'checkbox');
    inputCheck.setAttribute('id', `read-${index}`);
    inputCheck.setAttribute('data-index', index);
    isChecked ? (inputCheck.checked = true) : (inputCheck.checked = false);

    const label = document.createElement('label');
    label.setAttribute('for', `read-${index}`);
    label.classList.add('blue');
    label.textContent = 'Mark as read';

    const extraContent = document.createElement('div');
    extraContent.classList.add('extra', 'content');

    const wrapButton = document.createElement('div');
    wrapButton.classList.add('ui', 'two', 'buttons');

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('ui', 'basic', 'button', 'red', 'buttonDelete');
    buttonDelete.textContent = 'Delete';

    container.appendChild(wrapper);
    wrapper.appendChild(uicard);
    uicard.appendChild(card);
    card.appendChild(content);
    content.appendChild(pages);
    content.appendChild(header);
    content.appendChild(meta);
    content.appendChild(description);
    description.appendChild(formGroup);
    formGroup.appendChild(inputCheck);
    formGroup.appendChild(label);
    card.appendChild(extraContent);
    extraContent.appendChild(wrapButton);
    wrapButton.appendChild(buttonDelete);

    // EVENT DELETE BUTTON
    buttonDelete.addEventListener('click', deleteBook);
    inputCheck.addEventListener('click', changeStatus);
    index++;
    console.log(index, 'INDEX');
};

Book.prototype.saveOnLocal = function () {
    localStorage.setItem('myBooks', JSON.stringify(myLibrary));
};

Book.prototype.getLocal = function () {
    const string = localStorage.getItem('myBooks');
    const myBooks = JSON.parse(string);
    myLibrary = myBooks;
    container.innerHTML = '';
    index = 0;
    for (book of myBooks) {
        this.displayBook(book);
    }
};

function deleteBook() {
    const wrapCard = this.closest('.wrap-card');
    const wrapIndex = this.closest('.wrap-card').dataset.index;
    wrapCard.remove();
    myLibrary.splice(wrapIndex, 1);
    const book = new Book();
    book.saveOnLocal();
    book.getLocal();
}

function changeStatus() {
    const index = this.dataset.index;
    myLibrary[index].status = this.checked;
    const book = new Book();
    book.saveOnLocal();
}

function toggleModal() {
    modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const book = new Book(
        inputTitle.value,
        inputAuthor.value,
        inputPages.value,
        inputStatus.checked
    );
    console.log(book, 'BOOK');
    book.addBook();
    book.displayBook(book);
    book.saveOnLocal();
});

window.addEventListener('load', function () {
    const book = new Book();
    book.getLocal();
});

trigger.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
