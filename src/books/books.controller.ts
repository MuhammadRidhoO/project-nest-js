import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/name')
  getBooks(@Query('name') name: string, @Query('email') email: string) {
    return this.booksService.getBooks(name, email);
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() payload: CreateBookDto) {
    return this.booksService.createBook(payload);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateBook(@Param('id') id: string, @Body() payload: UpdateBookDto) {
    return this.booksService.updateBook(id, payload);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBookById(id);
  }
}
