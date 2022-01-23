import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Review, ReviewDocument } from '.'
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
  reviews: ReviewDocument[]
}

export const BookSchema = SchemaFactory.createForClass(Book)
