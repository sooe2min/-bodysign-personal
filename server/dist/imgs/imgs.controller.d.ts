/// <reference types="multer-s3" />
import { ImgsService } from './imgs.service';
export declare class ImgsController {
    private readonly imgsService;
    constructor(imgsService: ImgsService);
    create(file: Express.MulterS3.File, req: any): Promise<any>;
}
