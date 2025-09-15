// src/routes/api/pageNotFound.ts
import type { Request, Response } from 'express';

const pageNotFound404 = (req: Request, res: Response) => {
  res.status(404).json({ error: 'Page not found' });
};

export default pageNotFound404;