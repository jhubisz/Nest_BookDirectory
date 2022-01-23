import { Controller, Get } from '@nestjs/common'
import { AuthorService } from 'src/Services/author.service'

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('ratings')
  async getRatings(): Promise<any[]> {
    return this.authorService.ratingsByAuthor()
  }
}
