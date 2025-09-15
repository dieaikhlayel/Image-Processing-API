import express from 'express'; // Import Express framework for building web applications
import path from 'path'; // Import path module for handling file paths
import { resizeImage, resizeImagePath } from '../../utils/imageTransforms'; // Import image resizing utility functions from a relative path
import { promises as fsPromises } from 'fs'; // Import promises-based file system module for asynchronous file operations
import fs from 'fs'; // Import synchronous file system module for checking file existence

const images = express.Router(); // Create an Express Router instance for image-related routes

images.get('/', async (req: express.Request, res: express.Response) => { // Define GET route handler for the root endpoint
  try {
    const filename = req.query.filename as unknown as string; // Extract filename from query parameters (cast to string)
    const height = parseInt(req.query.height as unknown as string); // Extract and parse height from query parameters
    const width = parseInt(req.query.width as unknown as string); // Extract and parse width from query parameters
    const outputPath: string = resizeImagePath(filename, height, width); // Generate the output file path for the resized image

    if (!fs.existsSync(outputPath)) { // Check if the resized image file already exists
      const resizedImage = await resizeImage(filename, height, width); // Resize the image using the utility function
      await fsPromises.writeFile(outputPath, resizedImage); // Save the resized image to the output path
    }

    res.sendFile(path.resolve(outputPath)); // Send the resized image file to the client using the resolved absolute path
  } catch (err: any) { // Catch any errors during processing
    res.render('errors', { message: err.message }); // Render an error page with the error message
  }
});

export default images; // Export the router for use in the main application