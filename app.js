// Book constructor
function Book(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI constructor
function UI(){}
// Add a constructors
UI.prototype.addBookToList = function(book) {
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

   //console.log(row);
}

// show alert
 UI. prototype.showAlert = function(message, className) {
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

// Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


//clear fields
UI.prototype.clearFields  = function() {
    document.getElementById('title').value ='';
    document.getElementById('author').value ='';
    document.getElementById('isbn').value ='';
}

// event listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){
    //console.log('test');
    
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

     // instantiate book
     const book = new Book(title, author, isbn);


     // Insertaite UI 
     const ui = new UI(); 
     
     // validate
     if(title === '' || author === '' || isbn === '') {
        // error alert
        ui.showAlert('please fill in all fields', 'error');
     } else {
    // add ui book to list
     ui.addBookToList(book);

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

   //show message
   ui.showAlert('book Removed!', 'success')

    e.preventDefault();
});
