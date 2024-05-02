// Book class : represent a book
 class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
 }
//UI class: handle UI task
  class UI {
    static displayBooks() {
        
         const books = Store.getBooks()
       

         books.forEach( book => UI.addBookToList(book))
    }


    static addBookToList(book){
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static clearField(){
        document.querySelector('#title').value = ""
        document.querySelector('#author').value = ""
        document.querySelector('#isbn').value = ""
    }
    static deleteBook(target){
     if(target.classList.contains('delete')){
        target.parentElement.parentElement.remove()
     }
    }

    static showAlert(message, className){
      const div = document.createElement('div')
      div.className = `alert alert-${className}` 
      div.appendChild(document.createTextNode(message))
      const container = document.querySelector('.container')
      const form = document.querySelector('#book-form')

      container.insertBefore(div, form)

      //remove alert after 3seconds

      setTimeout(()=> document.querySelector('.alert').remove(), 1800)
    }
  }
// store class: handles storage

 class Store{

 static getBooks(){
  let books;
  if(localStorage.getItem('books') === null){
    books = []
  } else {
    books = JSON.parse(localStorage.getItem('books'))
  }
  return books
 }

 static addBook(book){
  const books = Store.getBooks()
    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
 }

 static removeBook(title){
 const books = Store.getBooks()

  books.forEach((book,index)=>{
    if(book.title === title){
      books.splice(index, 1)
    }
  })
  localStorage.setItem('books', JSON.stringify(books))
 }

 }



//Event : display Book

document.addEventListener("DOMContentLoaded", UI.displayBooks)

//Event : Add a book
document.querySelector("#book-form").addEventListener('submit', (e) =>{
   e.preventDefault()
    
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

// validate 
if(title === "" || author === "" || isbn === ""){
    UI.showAlert('please enter all form details', 'danger')
} else {
     // instantiate new book
  const book = new Book(title,author,isbn)
 

  // Add book to list

  UI.addBookToList(book)

  //add book to store
  Store.addBook(book)

  // show sucess messgae
 UI.showAlert('Book added successfully', 'success')

 
  //clear fields
  UI.clearField()

}

     
    

 
})

//Event : Remove Book

document.querySelector('#book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target)

// remove store book
 Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent)

    // show delete messgae
    UI.showAlert('Book deleted', 'success')
   
})
