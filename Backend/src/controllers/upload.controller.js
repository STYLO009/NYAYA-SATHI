const cloudinary = require("../config/cloudinary");

// Helper function to handle stream uploads
const uploadToCloudinary = (buffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

// const handleImageUpload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image file provided",
//       });
//     }

//     // Upload buffer to Cloudinary
//     const result = await uploadToCloudinary(req.file.buffer, "user_uploads");

//     return res.status(200).json({
//       success: true,
//       message: "Image uploaded successfully",
//       data: {
//         publicId: result.public_id,
//         url: result.secure_url,
//         format: result.format,
//         width: result.width,
//         height: result.height,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to upload image",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  uploadToCloudinary,
};