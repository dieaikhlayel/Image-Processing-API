// src/app.ts
import express from 'express';
import routes from './routes/index';
import path from 'path';
import pageNotFound404 from './routes/api/pageNotFound';

const app = express();

const port = 3000;

// Middleware
app.use(express.json());
app.use('/api', routes);
app.use('/public', express.static(path.join(__dirname, '../public')));

// View Engine Setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Error Handling
app.use(pageNotFound404);

// Start the server only if run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(
      `Example API: http://localhost:${port}/api/images?filename=encenadaport&height=700&width=400`
    );
  });
}

export default app;