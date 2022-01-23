import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ReviewDto } from 'src/Repository/Dto'
import { Book } from 'src/Repository/Models'
import { ReviewService } from 'src/Services/review.service'

@Controller('books')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':bookId/reviews')
  async createReview(
    @Param() params,
    @Body() reviewDto: ReviewDto,
  ): Promise<Book> {
    return this.reviewService.create(params.bookId, reviewDto)
  }

  @Delete(':bookId/reviews/:reviewId')
  async removeReview(@Param() params): Promise<void> {
    await this.reviewService.remove(params.bookId, params.reviewId)
  }
}
