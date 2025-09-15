import { resizeImage } from '../utils/imageTransforms'; // Import the resizeImage function from the imageTransforms utility module

describe('Testing image processing API', () => { // Define a test suite for the image processing API
  it('Resolves successfully when provided the right filename, height and width parameters', async () => { // Define a test case for the resizeImage function
    await expectAsync(resizeImage('santamonica', 400, 200)).toBeResolved(); // Test that resizeImage resolves successfully when given valid parameters: filename 'santamonica', width 400, and height 200
  });
});