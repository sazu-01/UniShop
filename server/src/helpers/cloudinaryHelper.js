import cloudinary from "../config/cloudinary.js";

export const publicIdWithouthExtensionFromUrl = async (imageUrl) => {
  
  const pathSegments = imageUrl.split("/");

  //get the last segment
  const lastSegment = pathSegments[pathSegments.length - 1];

  //split extension from images
  const valueWithouthExtension = lastSegment.split(".")[0];

  return valueWithouthExtension;
};

export const deleteFileFromCloudinary = async (folderName, publicId) => {
  try {
    
    const response = await cloudinary.uploader.destroy(
      `${folderName}/${publicId}`
    );
    console.log('Cloudinary response:', response); // Add this line

    if (response.result === 'not found') {
      console.warn(`Image with public ID ${publicId} was not found on Cloudinary.`);
      return; // Return without throwing an error
    }

    if (response.result !== 'ok') {
      throw new Error(`Image with public ID ${publicId} was not deleted successfully from Cloudinary. Reason: ${response.result}`);
    }

  } catch (error) {
    throw error;
  }
};
