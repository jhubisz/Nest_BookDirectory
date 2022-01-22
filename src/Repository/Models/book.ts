import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Review } from '.'
import { Document } from 'mongoose'

export type BookDocument = Book & Document

@Schema()
export class Book {
  @Prop({ required: true })
  bookName: string

  @Prop({ required: true })
  author: string

  @Prop({ required: true })
  releaseDate: Date

  @Prop({ required: true })
  genre: string

  @Prop()
  reviews: Array<Review>
}

export const BookSchema = SchemaFactory.createForClass(Book)
