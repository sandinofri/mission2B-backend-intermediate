import { upload } from "../models/uploadGambar.js";

export const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Tidak ada file gambar yang diupload" });
    }

    const imageUrl = req.file.filename;
    await upload(imageUrl)
    return res.status(200).json({
        message:'success upload image',
        image:imageUrl
    })
  } catch (error) {
    return res.status(500).json({
        message:error.message
    })
  }
};
