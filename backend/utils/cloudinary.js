import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

class CloudinaryConfig {
  constructor() {
    this.cloudinary = cloudinary;

    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file, options = {}) {
    try {
      if (!file) throw new Error("No file provided");

      if (Buffer.isBuffer(file)) {
        return await this.uploadFromBuffer(file, options);
      }

      return await this.cloudinary.uploader.upload(file, options);
    } catch (error) {
      throw error;
    }
  }

  uploadFromBuffer(buffer, options = {}) {
    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });
  }

  async deleteFile(publicId) {
    try {
      if (!publicId) throw new Error("publicId is required");

      return await this.cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw error;
    }
  }
}

export default new CloudinaryConfig();