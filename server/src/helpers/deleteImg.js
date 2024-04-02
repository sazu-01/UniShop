"use strict";

//import package
import fs from "fs";

 const deleteImage = async (defaultImageForUser) => {
    try {
      //check if the file exists and user has access to it
      await fs.access(defaultImageForUser);

      //if the file exists and user has access, delete it
      await fs.unlink(defaultImageForUser);
    } catch (error) {
      throw error;
    }
 }

 export {deleteImage};