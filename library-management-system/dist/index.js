"use strict";
// Класс для книги библиотеки
class LibraryBook {
    constructor(title, author, publishedYear, genre) {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genre = genre;
        this.isAvailable = true; // Изначально книга доступна
    }
    borrowBook() {
        if (this.isAvailable) {
            this.isAvailable = false; // Изменяем статус на "не доступна"
            console.log(`Книга "${this.title}" была взята.`);
        }
        else {
            console.log(`Книга "${this.title}" недоступна для заимствования.`);
        }
    }
    returnBook() {
        this.isAvailable = true; // Изменяем статус на "доступна"
        console.log(`Книга "${this.title}" была возвращена.`);
    }
}
// Класс для пользователя библиотеки
class LibraryUser {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }
    borrow(book) {
        if (book.isAvailable) {
            book.borrowBook(); // Меняем статус книги
            this.borrowedBooks.push(book); // Добавляем книгу в массив
        }
        else {
            console.log(`Пользователь "${this.name}" не может взять книгу "${book.title}".`);
        }
    }
    return(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index > -1) {
            book.returnBook(); // Меняем статус книги
            this.borrowedBooks.splice(index, 1); // Удаляем книгу из массива
        }
        else {
            console.log(`Пользователь "${this.name}" не брал книгу "${book.title}".`);
        }
    }
}
// Класс библиотеки
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book); // Добавляем книгу в библиотеку
        console.log(`Книга "${book.title}" добавлена в библиотеку.`);
    }
    registerUser(user) {
        this.users.push(user); // Регистрация нового пользователя
        console.log(`Пользователь "${user.name}" зарегистрирован.`);
    }
    findBooksByAuthor(author) {
        return this.books.filter(book => book.author === author); // Поиск книг по автору
    }
    findAvailableBooks() {
        return this.books.filter(book => book.isAvailable); // Поиск доступных книг
    }
}
// Тестирование системы
// Создаем библиотеку
const library = new Library();
// Создаем книги
const book1 = new LibraryBook("1984", "Джордж Оруэлл", 1949, "Фантастика");
const book2 = new LibraryBook("Мастер и Маргарита", "Михаил Булгаков", 1966, "Роман");
const book3 = new LibraryBook("Преступление и наказание", "Фёдор Достоевский", 1866, "Роман");
// Добавляем книги в библиотеку
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
// Регистрируем пользователей
const user1 = new LibraryUser(1, "Алексей");
const user2 = new LibraryUser(2, "Мария");
library.registerUser(user1);
library.registerUser(user2);
// Пользователи берут книги
user1.borrow(book1); // Успешно
user1.borrow(book2); // Успешно
user2.borrow(book1); // Не доступна
// Пользователь возвращает книгу
user1.return(book1); // Успешно
user2.borrow(book1); // Успешно
// Поиск книг по автору
const booksByBulgarov = library.findBooksByAuthor("Михаил Булгаков");
console.log("Книги Михаила Булгакова:", booksByBulgarov.map(book => book.title));
// Список доступных книг
const availableBooks = library.findAvailableBooks();
console.log("Доступные книги:", availableBooks.map(book => book.title));
