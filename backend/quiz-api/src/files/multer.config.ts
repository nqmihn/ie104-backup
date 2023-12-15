import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path, { join } from "path";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    getRootPath = () => {
        return process.cwd();
    };

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const folder = req?.headers?.folder_type ?? "default";
                    cb(null, join(this.getRootPath(), `public/images/${folder}`))
                },
                filename: (req, file, cb) => {
                    let finalName = `${Date.now()}-${file.originalname}`
                    cb(null, finalName)
                }
            })
        };
    }
}