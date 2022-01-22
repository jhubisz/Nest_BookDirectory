import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { BookDto } from 'src/Repository/Dto'
import { Book } from 'src/Repository/Models'
import { BookService } from '../Services/book.service'

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() bookDto: BookDto): Promise<Book> {
    console.log(bookDto)
    return await this.bookService.create(bookDto)
  }

  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.bookService.getAll()
  }

  @Get('/genres/')
  async getGenres(): Promise<any[]> {
    return await this.bookService.getGroupedByGenre()
  }

  @Get('/genres/years/')
  async getYears(): Promise<any[]> {
    return await this.bookService.getGroupedByGenreAndYear()
  }

  @Get(':id')
  async getBook(@Param() params): Promise<Book> {
    return await this.bookService.getById(params.id)
  }
}
