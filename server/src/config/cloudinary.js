"use strict";

//packages
import {v2 as cloudinary} from 'cloudinary';

//env
import { cloudeName, cloudeApiKey, cloudeApiSecret } from "../hiddenEnv.js";
          
 cloudinary.config({ 
  cloud_name: cloudeName, 
  api_key: cloudeApiKey, 
  api_secret: cloudeApiSecret 
});

export default cloudinary;
