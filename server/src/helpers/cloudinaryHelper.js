import cloudinary from "../config/cloudinary.js";

export const publicIdWithouthExtensionFromUrl = async (imageUrl) => {
  const pathSegments = imageUrl.split("/");

  //get the last segment
  const lastSegment = pathSegments[pathSegments.length - 1];

  //replace image extension with empty string
  const valueWithouthExtension = lastSegment.replace(".jpg", "");

  return valueWithouthExtension;
};

export const deleteFileFromCloudinary = async (folderName, publicId) => {
  try {
    
    const { result } = await cloudinary.uploader.destroy(
      `${folderName}/${publicId}`
    );

    if (result !== "ok") {
      throw new Error(
        "image was not deleted successfully from cloudinary. please try again"
      );
    }
  } catch (error) {
    throw error;
  }
};
