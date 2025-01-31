// src/server/controllers/searchController.ts
import { Request, Response } from 'express';
import { elasticsearchService } from '../services/elasticsearch';

export const searchController = {
  async search(req: Request, res: Response) {
    try {
      const { q, ...filters } = req.query;

      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const results = await elasticsearchService.search(q as string, filters);
      res.json(results);
    } catch (error) {
      console.error('Search failed:', error);
      res.status(500).json({ error: 'Search failed' });
    }
  },

  async suggest(req: Request, res: Response) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({ error: 'Query is required' });
      }

      const result = await elasticsearchService.suggest(q as string);
      res.json(result);
    } catch (error) {
      console.error('Suggestion failed:', error
