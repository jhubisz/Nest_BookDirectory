import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { ReviewDto } from 'src/Repository/Dto'
import {
  Book,
  BookDocument,
  Review,
  ReviewDocument,
} from '../Repository/Models'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(bookId: string, reviewDto: ReviewDto): Promise<Book> {
    const book = await this.bookModel.findById(bookId)
    if (!book) throw new NotFoundException(`Book with id ${bookId} not found`)

    const newReview = new this.reviewModel(reviewDto)
    book.reviews.push(newReview)
    book.save()
    return book
  }

  async remove(bookId: string, reviewId: string): Promise<void> {
    const result = await this.bookModel.updateOne(
      { _id: bookId },
      {
        $pull: {
          reviews: { _id: new Types.ObjectId(reviewId) },
        },
      },
    )
  }
}
