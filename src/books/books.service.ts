import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: any[] = [];

  getAllBooks(): any[] {
    return this.books;
  }

  getBooks(name: string, email: string): any[] {
    const books = this.books.filter((book) => {
      let isMacth = true;
      if (name && book.name != name) {
        isMacth = false;
      }
      if (email && book.email != email) {
        isMacth = false;
      }
      return isMacth;
    });
    return books;
  }

  getBookById(id: string) {
    const bookIdx = this.findBookById(id);
    return this.books[bookIdx];
  }

  createBook(createBookDto: CreateBookDto) {
    const { name, email, password, age } = createBookDto;
    this.books.push({
      id: uuidv4(),
      name,
      email,
      password,
      age,
    });
  }

  updateBook(id: string, updateBookDto: UpdateBookDto) {
    const { name, email, password, age } = updateBookDto;
    const bookIdx = this.findBookById(id);
    this.books[bookIdx].name = name;
    this.books[bookIdx].email = email;
    this.books[bookIdx].password = password;
    this.books[bookIdx].age = age;
  }

  findBookById(id: string) {
    const bookIdx = this.books.findIndex((books) => books.id === id);
    if (bookIdx === -1) {
      throw new NotFoundException(`Book with id ${id} is Not Found`);
    }
    return bookIdx;
  }

  deleteBookById(id: string) {
    const bookIdx = this.findBookById(id);
    this.books.splice(bookIdx, 1);
  }
}
