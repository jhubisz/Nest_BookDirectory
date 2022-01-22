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

  async getGroupedByGenre(): Promise<any[]> {
    var genres = this.bookModel.aggregate([
      { $group: { _id: '$genre', books: { $push: '$$ROOT' } } },
    ])

    return genres.exec()
  }

  async getGroupedByGenreAndYear(): Promise<any[]> {
    var genresYears = this.bookModel.aggregate([
      {
        $group: {
          _id: { genre: '$genre', year: { $year: '$releaseDate' } },
          books: { $push: '$$ROOT' },
        },
      },
      {
        $group: {
          _id: '$_id.genre',
          books: { $push: '$$ROOT' },
        },
      },
    ])

    return genresYears.exec()
  }
}
