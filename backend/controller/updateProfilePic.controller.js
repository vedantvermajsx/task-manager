import User from "../models/User.model.js";
import cloudinary from "../utils/cloudinary.js";

async function updateProfilePic(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (id !== userId) {
      return res.status(401).json({
        success: false,
        message: "Malformed request",
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    
   
    if (file.size > 3 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds limit",
      });
    }




    const fileBuffer = file.buffer;

    const result = await cloudinary.uploadFile(fileBuffer, {
      folder: "profile",
      format: "avif",
      quality: "auto",
      fetch_format: "auto",
    });


    const URL = result.secure_url;


    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { avatar: URL } },
      { returnDocument: "after" }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    return res.status(200).json({
      success: true,
      url: URL,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export default updateProfilePic;