import path from 'path'; // Import path module for handling file paths
import { promises as fs } from 'fs'; // Import promises-based file system module for asynchronous file operations
const imagesFullPath = path.resolve(__dirname, '../images/full/'); // Resolve the absolute path to the 'images/full' directory relative to the current module
const getAvailableImageNames = async (): Promise<string[]> => { // Define an async function that returns a Promise of an array of strings
  try {
    return (await fs.readdir(imagesFullPath)).map( // Read the directory contents and map over the filenames
      (filename: string) => filename.split('.')[0]! // Extract the filename without the extension (e.g., 'image.jpg' -> 'image')
    );
  } catch { // Handle any errors during directory reading
    return []; // Return an empty array if an error occurs
  }
};
export default getAvailableImageNames; // Export the function for use in other modules