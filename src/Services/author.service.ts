import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Book, BookDocument } from '../Repository/Models'

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async ratingsByAuthor(): Promise<any[]> {
    var ratings = this.bookModel.aggregate([
      {
        $unwind: '$reviews',
      },
      {
        $group: {
          _id: '$author',
          ratings: { $sum: '$reviews.rating' },
        },
      },
    ])

    return ratings.exec()
  }
}
