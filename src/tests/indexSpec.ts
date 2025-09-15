import supertest from 'supertest'; // Import supertest for making HTTP requests in tests
import app from '../app'; // Import the Express app to be tested
const request = supertest(app);  // Create a supertest instance for the app, letting TypeScript infer the type

describe('endpoint: /api/images', (): void => { // Define a test suite for the /api/images endpoint
  it('gets /api/images?filename=fjord&height=700&width=400', async (): Promise<void> => { // Define a test case for a specific GET request
    const response: supertest.Response = await request.get( // Send a GET request to /api/images with query parameters
      '/api/images?filename=fjord&width=400&height=700' // Query parameters specify the image filename and dimensions
    );
    expect(response.status).toBe(200); // Assert that the response status code is 200 (OK)
  });
});