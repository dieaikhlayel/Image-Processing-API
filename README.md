# image-processing-API
An image processing API that resizes and saves images to user specifications when visiting a URL. This API allows users to upload an image and specify dimensions (width and height) via query parameters, processing the image using the Sharp library and returning the resized image.

Started by: Diea Ikhlayel

## Project Description
This API, developed by Diea Ikhlayel, provides a simple and efficient way to resize images on the fly by accessing a URL endpoint. It uses the Sharp library for fast and high-quality image processing, built with Express.js for handling HTTP requests and TypeScript for type safety. The API is designed for developers who need a lightweight solution for dynamic image resizing in their applications.

## Dependencies
```json
{
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "sharp": "^0.34.3",
  "supertest": "^7.1.4"
}
```
- `ejs`: Template engine for rendering views.
- `express`: Web framework for Node.js.
- `sharp`: High-performance image processing library.
- `supertest`: HTTP assertions for testing the API.

## devDependencies
```json
{
  "@types/express": "^5.0.3",
  "@types/gulp": "^4.0.17",
  "@types/jasmine": "^5.1.9",
  "@types/morgan": "^1.9.10",
  "@types/node": "^24.3.1",
  "@types/sharp": "^0.31.1",
  "@types/supertest": "^6.0.3",
  "@typescript-eslint/eslint-plugin": "^8.42.0",
  "@typescript-eslint/parser": "^8.42.0",
  "eslint": "^9.34.0",
  "esm": "^3.2.5",
  "jasmine": "^5.10.0",
  "jasmine-spec-reporter": "^7.0.0",
  "nodemon": "^3.1.10",
  "prettier": "^3.6.2",
  "shelljs": "^0.10.0",
  "ts-node": "^10.9.2",
  "typescript": "^5.9.2"
}
```
- `@types/*`: Type definitions for Express, Gulp, Jasmine, Morgan, Node.js, Sharp, and Supertest.
- `@typescript-eslint/*`: ESLint plugin and parser for TypeScript.
- `eslint`: Linting tool for code quality.
- `esm`: Enables ES module support.
- `jasmine`: Testing framework for unit tests.
- `jasmine-spec-reporter`: Reporter for Jasmine test results.
- `nodemon`: Auto-restart server during development.
- `prettier`: Code formatter.
- `shelljs`: Shell scripting for Node.js.
- `ts-node`: TypeScript execution environment.
- `typescript`: TypeScript compiler.

## Installation
1. Ensure you have Node.js (version 16 or higher) installed on your system.
2. Copy the project folder to your local machine or extract it from the provided archive.
3. Navigate to the project directory:
   ```
   cd image-processing-api
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Build the TypeScript code:
   ```
   npm run build
   ```
6. Ensure the `src/images` folder exists in the project root to store input images.

## Build and Run the Server
After installing the dependencies, build the TypeScript code into JavaScript (output saved in the `dist` folder):
```
npm run build
```

Start the server:
```
npm run start
```
This command runs the server on port 3000 using `nodemon` for development. Access the API at `http://localhost:3000`.

For production, use:
```
npm run start:prod
```
This builds the project and runs the compiled JavaScript.

## Testing
Run the test suite to verify API functionality:
```
npm run test
```
This compiles the TypeScript code and executes unit tests using Jasmine and Supertest to ensure the API endpoints work as expected.

## API Endpoints
This project provides an endpoint to resize images based on user specifications.

### Resize Image
- **Endpoint**: `GET /api/images`
- **Query Parameters**:
  - `filename` (required): The name of the image file (e.g., `image.jpg`).
  - `width` (required): Desired width of the resized image (in pixels).
  - `height` (required): Desired height of the resized image (in pixels).
- **Example**:
  ```
  GET /api/images?filename=image.jpg&width=200&height=200
  ```
- **Response**: Returns the resized image if successful, or an error message if the parameters are invalid or the file is not found.
- **Notes**:
  - Supported image formats: JPEG, PNG, WebP (based on Sharp's supported formats).
  - Images must be placed in the `src/images` folder in the project root.
  - Resized images are cached in the `cache` folder to improve performance for repeated requests.

### Expected Errors
Below are common errors you may encounter when using the `/api/images` endpoint:

- **Missing Parameters**:
  - **Status**: `400 Bad Request`
  - **Message**: `"Missing required query parameters: filename, width, or height"`
  - **Example**: `GET /api/images?filename=image.jpg`
  - **Cause**: One or more required query parameters (`filename`, `width`, `height`) are not provided.

- **Invalid Width or Height**:
  - **Status**: `400 Bad Request`
  - **Message**: `"Width and height must be positive integers"`
  - **Example**: `GET /api/images?filename=image.jpg&width=-100&height=abc`
  - **Cause**: The `width` or `height` parameters are negative, zero, or non-numeric.

- **File Not Found**:
  - **Status**: `404 Not Found`
  - **Message**: `"Image file not found: <filename>"`
  - **Example**: `GET /api/images?filename=nonexistent.jpg&width=200&height=200`
  - **Cause**: The specified `filename` does not exist in the `src/images` folder.

- **Unsupported File Format**:
  - **Status**: `400 Bad Request`
  - **Message**: `"Unsupported image format. Supported formats: JPEG, PNG, WebP"`
  - **Example**: `GET /api/images?filename=image.gif&width=200&height=200`
  - **Cause**: The image file format is not supported by the Sharp library.

- **Server Error**:
  - **Status**: `500 Internal Server Error`
  - **Message**: `"An error occurred while processing the image"`
  - **Example**: Rare, but may occur during image processing (e.g., corrupted image file).
  - **Cause**: Internal issues, such as Sharp failing to process a valid image due to corruption or memory limits.

## Known Issues and Resolutions
- **Testing Issue**: There was an issue with the test suite execution due to configuration or dependency mismatches. This has been resolved by ensuring proper TypeScript compilation before running tests (`npx tsc`) and verifying the Jasmine configuration in `spec/support/jasmine.json`.
- **Start Script Issue**: The `npm run start` command, which uses `nodemon src/app.ts`, encountered an issue but does not prevent the application from functioning. Ensure `ts-node` and `nodemon` are correctly installed, and use `npm run start:prod` for production to avoid this issue.

## Project Structure
- **src/images/**: Stores input and output images.
  - `full/`: Contains original full-size images.
  - `thumbnails/`: Contains generated thumbnail images.
- **routes/api/**: Contains API route handlers:
  - `images.ts`: Manages image resizing requests.
  - `pageNotFound.ts`: Handles 404 errors for unmatched routes.
  - `file.ts`: Manages file operations.
  - `index.ts`: Main router file.
- **tests/**: Contains test files:
  - `helpers/`: Utility functions for testing.
  - `reporter.ts`: Custom test reporter configuration.
  - `imageTransformsSpec.ts`: Tests for image transformation logic.
  - `indexSpec.ts`: Main test suite file.
- **utils/**: Utility functions:
  - `imageTransforms.ts`: Handles image transformation logic (e.g., resizing or formatting).
- **views/**: Contains view templates:
  - `errors.ejs`: Error page template.
  - `index.ejs`: Main index page template.
  - `page-not-found.ejs`: 404 page template.
  - `app.ts`: Main application script for views.
- **public/css/**: Contains CSS files:
  - `style.css`: Stylesheet for the application.
- **dist/**: Compiled output directory.
- **node_modules/**: Project dependencies.
- **spec/support/**: Jasmine support files (e.g., `jasmine.json`).

## Usage Example
1. Ensure the `src/images` folder exists and place an image named `sample.jpg` in it.
2. Start the server with `npm run start`.
3. Access the endpoint:
   ```
   http://localhost:3000/api/images?filename=sample.jpg&width=300&height=300
   ```
4. The API will resize `sample.jpg` to 300x300 pixels and return the processed image.

## Submission Instructions
### Scripts for Testing, Starting, and Building
- **Build the application**:
  ```
  npm run build
  ```
  Compiles TypeScript code into JavaScript, outputting to the `dist` folder.
- **Start the server**:
  ```
  npm run start
  ```
  Runs the server on `http://localhost:3000` using `nodemon` for development.
- **Start in production**:
  ```
  npm run start:prod
  ```
  Builds and runs the compiled JavaScript.
- **Run tests**:
  ```
  npm run test
  ```
  Executes the test suite using Jasmine and Supertest to verify API functionality.

### Endpoints for Testing
To test the required functionality, use the following endpoint:
- **Resize Image**:
  - **URL**: `GET http://localhost:3000/api/images?filename=sample.jpg&width=300&height=300`
  - **Description**: Resizes the image `sample.jpg` from the `src/images` folder to 300x300 pixels and returns the resized image.
  - **Expected Response**: The resized image is returned if the file exists and parameters are valid; otherwise, an appropriate error message is returned (see "Expected Errors" section).

### Additional Functionality
- **Image Caching**: Resized images are cached in the `cache` folder to improve performance for repeated requests with the same parameters.
- **Error Handling**: Comprehensive error messages for missing parameters, invalid inputs, unsupported file formats, and file-not-found scenarios.
- **Type Safety**: TypeScript ensures type-safe code, reducing runtime errors.
- **Testing**: Unit tests with Jasmine and Supertest ensure robust API functionality.
- **Code Quality**: ESLint and Prettier are used for consistent code formatting and linting.

## Contributing
Contributions are welcome! Please follow these steps:
1. Contact the project maintainer (e.g., via email) to discuss your proposed changes.
2. Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Share your changes with the maintainer for review.

*Note*: GitHub repository setup is pending. Contribution instructions will be updated once the project is hosted on GitHub.