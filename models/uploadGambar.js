import { dbConnection } from "../config/db.js";

export const upload = async(imageUrl)=>{
    const response = await dbConnection.query('INSERT INTO image (image_url) VALUES (?)',[imageUrl])
    return response
}