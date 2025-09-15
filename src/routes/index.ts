import express from 'express'; // Import Express framework for building web applications
import { promises as fsPromises } from 'fs'; // Import promises-based file system module for asynchronous file operations
import fs from 'fs'; // Import synchronous file system module for checking file existence
import path from 'path'; // Import path module for handling file paths
import { resizeImage, resizeImagePath } from '../utils/imageTransforms'; // Import image resizing utility functions
import getAvailableImageNames from './file'; // Import function to retrieve available image filenames
const routes = express.Router(); // Create an Express Router instance to define routes

interface ImageQuery { // Define TypeScript interface for query parameters
  filename?: string; // Optional filename query parameter
  width?: string; // Optional width query parameter
  height?: string; // Optional height query parameter
}

const validate = async (query: ImageQuery): Promise<null | string> => { // Async function to validate query parameters
  if (!query.filename) { // Check if filename is provided
    const availableImageNames: string = (await getAvailableImageNames()).join(', '); // Get list of available image names and join them into a string
    return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`; // Return error message if filename is missing
  }

  if (!query.width && !query.height) { // If neither width nor height is provided, no resizing is needed
    return null; // Return null to indicate no validation error
  }

  const width: number = parseInt(query.width || ''); // Parse width query parameter to a number
  if (Number.isNaN(width) || width < 1) { // Check if width is invalid or not positive
    return "Please provide a positive numerical value for the 'width' query segment."; // Return error message for invalid width
  }

  const height: number = parseInt(query.height || ''); // Parse height query parameter to a number
  if (Number.isNaN(height) || height < 1) { // Check if height is invalid or not positive
    return "Please provide a positive numerical value for the 'height' query segment."; // Return error message for invalid height
  }

  return null; // Return null if all validations pass
};

routes.get('/', async (req: express.Request, res: express.Response) => { // Define GET route handler for the root endpoint
  try {
    const filename = req.query.filename as unknown as string; // Extract filename from query parameters (cast to string)
    const height = parseInt(req.query.height as unknown as string); // Extract and parse height from query parameters
    const width = parseInt(req.query.width as unknown as string); // Extract and parse width from query parameters
    const outputPath: string = resizeImagePath(filename, height, width); // Generate the output file path for the resized image

    const validationMessage: null | string = await validate(req.query); // Validate query parameters

    if (validationMessage) { // If validation fails, send the error message
      res.send(validationMessage);
      return;
    }

    if (!fs.existsSync(outputPath)) { // Check if the resized image file already exists
      const resizedImage = await resizeImage(filename, height, width); // Resize the image using the utility function
      await fsPromises.writeFile(outputPath, resizedImage); // Save the resized image to the output path
    }
    if (outputPath) { // If output path exists, send the resized image file to the client
      res.sendFile(path.resolve(outputPath)); // Resolve the absolute path and send the file
    } else { // Handle unexpected case where outputPath is not defined
      res.send('This should not have happened!');
    }
  } catch (err: any) { // Catch any errors during processing
    res.render('errors', { message: err.message }); // Render an error page with the error message
  }
});
routes.use('/images', routes); // Mount the router on the '/images' path (Note: This creates a recursive routing, which may not be intended)

export default routes; // Export the router for use in the main application