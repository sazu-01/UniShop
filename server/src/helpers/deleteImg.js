"use strict";

//import package
import fs from "fs";

 const deleteImage = async (deleteFile) => {
    try {

      //check if the file exists and user has access to it
      await fs.promises.access(deleteFile);
    
      //if the file exists and user has access, delete it
      await fs.promises.unlink(deleteFile);

    } catch (error) {
      throw error;
    }
 }

 export {deleteImage};