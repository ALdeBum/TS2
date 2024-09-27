// Интерфейс для книги
interface Book {
    title: string;             // Название книги
    author: string;            // Автор книги
    publishedYear: number;     // Год публикации
    genre: string;             // Жанр книги
    isAvailable: boolean;      // Статус доступности книги
}

// Класс для книги библиотеки
class LibraryBook implements Book {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    isAvailable: boolean;

    constructor(title: string, author: string, publishedYear: number, genre: string) {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genre = genre;
        this.isAvailable = true; // Изначально книга доступна
    }

    borrowBook(): void {
        if (this.isAvailable) {
            this.isAvailable = false; // Изменяем статус на "не доступна"
            console.log(`Книга "${this.title}" была взята.`);
        } else {
            console.log(`Книга "${this.title}" недоступна для заимствования.`);
        }
    }

    returnBook(): void {
        this.isAvailable = true; // Изменяем статус на "доступна"
        console.log(`Книга "${this.title}" была возвращена.`);
    }
}

// Интерфейс для пользователя
interface User {
    id: number;               // Уникальный идентификатор пользователя
    name: string;             // Имя пользователя
    borrowedBooks: Book[];    // Массив книг, которые взял пользователь
}

// Класс для пользователя библиотеки
class LibraryUser implements User {
    id: number;
    name: string;
    borrowedBooks: Book[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }

    borrow(book: LibraryBook): void {
        if (book.isAvailable) {
            book.borrowBook(); // Меняем статус книги
            this.borrowedBooks.push(book); // Добавляем книгу в массив
        } else {
            console.log(`Пользователь "${this.name}" не может взять книгу "${book.title}".`);
        }
    }

    return(book: LibraryBook): void {
        const index = this.borrowedBooks.indexOf(book);
        if (index > -1) {
            book.returnBook(); // Меняем статус книги
            this.borrowedBooks.splice(index, 1); // Удаляем книгу из массива
        } else {
            console.log(`Пользователь "${this.name}" не брал книгу "${book.title}".`);
        }
    }
}

// Класс библиотеки
class Library {
    books: LibraryBook[];     // Массив книг в библиотеке
    users: LibraryUser[];     // Массив зарегистрированных пользователей

    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book: LibraryBook): void {
        this.books.push(book); // Добавляем книгу в библиотеку
        console.log(`Книга "${book.title}" добавлена в библиотеку.`);
    }

    registerUser(user: LibraryUser): void {
        this.users.push(user); // Регистрация нового пользователя
        console.log(`Пользователь "${user.name}" зарегистрирован.`);
    }

    findBooksByAuthor(author: string): LibraryBook[] {
        return this.books.filter(book => book.author === author); // Поиск книг по автору
    }

    findAvailableBooks(): LibraryBook[] {
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
