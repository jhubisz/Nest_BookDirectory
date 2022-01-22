import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { BooksController, ReviewsController } from './Controllers'
import { Book, BookSchema, Review, ReviewSchema } from './Repository/Models'
import { BookService } from './Services/book.service'
import { ReviewService } from './Services/review.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONN),
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [BooksController, ReviewsController],
  providers: [BookService, ReviewService],
})
export class AppModule {}
