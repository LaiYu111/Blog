import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
  Delete,
  Body,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs-extra';
import { handleResponse } from '../utils';
import { Public } from '../auth/constants';

@ApiTags('common')
@Controller('/api/common')
export class CommonController {
  constructor() {}

  @Public()
  @Post('/files/image')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './images', // specify the destination folder
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `origin-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async createImage(@UploadedFiles() files: Express.Multer.File[], @Res() res) {
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        const lowQualityFilename = file.filename.replace('origin-', 'min-');
        const lowQualityPath = `./images/${lowQualityFilename}`;

        // Generate low-quality image
        await sharp(file.path)
          .resize(400) // Adjust size as needed
          .toFile(lowQualityPath);

        return {
          originalname: file.originalname,
          filename: file.filename,
          path: file.path,
          lowQualityFilename: lowQualityFilename,
          lowQualityPath: lowQualityPath,
          highQualityFilename: file.filename,
        };
      }),
    );

    return handleResponse(
      res,
      HttpStatus.OK,
      'Files uploaded successfully!',
      processedFiles.map((file) => ({
        originalname: file.originalname,
        filename: file.filename,
        lowQualityFilename: file.lowQualityFilename,
        highQualityFilename: file.highQualityFilename,
      })),
      '',
    );

    // return {
    //   message: 'Files uploaded successfully!',
    //   files: processedFiles.map((file) => ({
    //     originalname: file.originalname,
    //     filename: file.filename,
    //     lowQualityFilename: file.lowQualityFilename,
    //     highQualityFilename: file.highQualityFilename
    //   })),
    // };
  }

  @Delete('/files/image')
  async deleteImages(@Body() filenames: string[], @Res() res) {
    try {
      const folderPath = join(process.cwd(), 'images');
      const deletionResults = await Promise.all(
        filenames.map(async (filename) => {
          try {
            const filePath = join(folderPath, filename);

            if (!fs.existsSync(filePath)) {
              return { filename, status: 'not found' };
            }

            // Determine the corresponding filenames for origin and min versions
            let originFilename, minFilename;
            if (filename.startsWith('origin-')) {
              originFilename = filename;
              minFilename = filename.replace('origin-', 'min-');
            } else if (filename.startsWith('min-')) {
              minFilename = filename;
              originFilename = filename.replace('min-', 'origin-');
            } else {
              return { filename, status: 'invalid format' };
            }

            const originFilePath = join(folderPath, originFilename);
            const minFilePath = join(folderPath, minFilename);

            // Delete the files
            if (fs.existsSync(originFilePath)) {
              await fs.remove(originFilePath);
            }
            if (fs.existsSync(minFilePath)) {
              await fs.remove(minFilePath);
            }

            return { filename, status: 'deleted' };
          } catch (error) {
            return { filename, status: 'error', error: error.message };
          }
        }),
      );

      return handleResponse(
        res,
        HttpStatus.OK,
        'Batch deletion complete',
        deletionResults,
      );
    } catch (error) {
      return handleResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Batch deletion fail',
        null,
        error,
      );
    }
  }
}
