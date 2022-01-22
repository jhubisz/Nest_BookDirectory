import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BookDto } from 'src/Repository/Dto'
import { Book, BookDocument } from '../Repository/Models'

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(book: BookDto): Promise<Book> {
    const newBook = new this.bookModel({ ...book })
    return newBook.save()
  }

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec()
  }

  async getById(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec()
  }
}
