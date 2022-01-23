import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import {
  BooksController,
  ReviewsController,
  AuthorsController,
} from './Controllers'
import { Book, BookSchema, Review, ReviewSchema } from './Repository/Models'
import { BookService, ReviewService, AuthorService } from './Services'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONN),
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [BooksController, ReviewsController, AuthorsController],
  providers: [BookService, ReviewService, AuthorService],
})
export class AppModule {}
