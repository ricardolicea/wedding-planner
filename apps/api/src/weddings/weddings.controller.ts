import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Wedding, WeddingsService } from './weddings.service';

@Controller('weddings')
export class WeddingsController {
    constructor(private readonly weddingsService: WeddingsService) {}

    @Get()
    getWeddings(): Promise<Wedding[]> {
        return this.weddingsService.getWeddings();
    }

    @Post()
    createWedding() {
        // Lógica para crear una boda
    }
}
