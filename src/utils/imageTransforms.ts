// Import the 'sharp' library for high-performance image processing
import sharp from 'sharp';

// Import 'path' to safely resolve file paths across operating systems
import path from 'path';

/**
 * resizeImage
 * ------------
 * Uses Sharp to resize an image stored in the "full" folder.
 *
 * @param filename - The base name of the image file (without extension)
 * @param height   - Desired height for the resized image
 * @param width    - Desired width for the resized image
 * @returns A Promise that resolves to the resized image as a Buffer
 *
 * Notes:
 * - `sharp().resize()` performs the resize operation in memory.
 * - `.toBuffer()` returns the image data as a Buffer (not saved to disk).
 * - This is useful if you want to send the image directly in a response.
 */
export const resizeImage = (
  filename: string,
  height: number,
  width: number
): Promise<Buffer> => {
  return sharp(
    // Resolve absolute path to the original image inside src/images/full
    path.resolve(`src/images/full/${filename}.jpg`)
  )
    .resize({
      height: height,
      width: width,
    })
    .toBuffer(); // Convert processed image to Buffer (instead of writing a file)
};

/**
 * resizeImagePath
 * ----------------
 * Generates the expected output file path for a resized image.
 *
 * @param filename - The base name of the image file (without extension)
 * @param height   - Height used for the resized image
 * @param width    - Width used for the resized image
 * @returns The string path to where the resized image should be stored
 *
 * Example:
 *   resizeImagePath("fjord", 200, 300)
 *   → "src/images/thumbnails/fjord200x300.jpg"
 *
 * Notes:
 * - This function does NOT create the file; it only builds the path string.
 * - It’s typically used to check if a resized version already exists.
 */
export const resizeImagePath = (
  filename: string,
  height: number,
  width: number
): string => {
  return `src/images/thumbnails/${filename}${height}x${width}.jpg`;
};
