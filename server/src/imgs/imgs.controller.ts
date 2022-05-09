import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

import { ImgsService } from './imgs.service';

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Controller('imgs')
export class ImgsController {
  constructor(private readonly imgsService: ImgsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (request, file, cb) {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.MulterS3.File,
    @Req() req,
  ): Promise<any> {
    return this.imgsService.uploadImg(file, req);
  }
}
