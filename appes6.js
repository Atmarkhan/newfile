class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-List');
        //Creat tr elemet
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td ><a href="#"class="delete">X</a></td>
        `;
    
        list.appendChild(row);
    

    }

    showAlert(message, className) {
        //clear div
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');

    // get form
    const form = document.querySelector('#book-form');
    //insert alert

    container.insertBefore(div, form);

    //timeout after 3 seconds
     setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);   

    }
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }

    }
    clearFields() {
        document.getElementById('title').value ='';
        document.getElementById('author').value ='';
        document.getElementById('isbn').value ='';

    }
}

// local storage class
class store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];

        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static displayBooks() {
        const books = store.getBooks();

        books.forEach(function(book){

        const ui = new UI;

        // Add book to ui
        ui.addBookToList(book);
            
        });

    }
    static addBook(book){
        const books = store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));



    }
   static removeBook(isbn){
    const books = store.getBooks();

    
    books.forEach(function(book, index){
       if(book.isbn === isbn) {
           books.splice(index, 1);
       }
        });
        localStorage.setItem('books', JSON.stringify(books));
   }
}

// DOM load Event
document.addEventListener('DOMContentLoaded', store.displayBooks);

// event listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){
    //console.log('test');

    //get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

     // instantiate book
     const book = new Book(title, author, isbn);


     // Insertaite UI 
     const ui = new UI(); 

     //console.log(ui);
     
     // validate
     if(title === '' || author === '' || isbn === '') {
        // error alert
        ui.showAlert('please fill in all fields', 'error');
     } else {
    // add ui book to list
     ui.addBookToList(book);

     //Add to LS
     store.addBook(book);

     // show succes
     ui.showAlert('book Added!', 'success');

     //clear fields
     ui.clearFields();
     }
 
   e.preventDefault();
});

//Event listener for delete
document.getElementById('book-List').addEventListener('click', function(e){

   //Instantiate UI
   const ui = new UI();

    //UI delete book
   ui.deleteBook(e.target);

   //remove form ls
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

   //show message
   ui.showAlert('book Removed!', 'success')

    e.preventDefault();
});
