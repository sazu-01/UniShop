import fs from "fs";

 const deleteImage = async (defaultImageForUser) => {
    try {
      await fs.access(defaultImageForUser);
      await fs.unlink(defaultImageForUser);
    } catch (error) {
      console.log(error.message);
    }
 }

 export {deleteImage};