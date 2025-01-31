// src/server/services/elasticsearch.ts
import { Client } from '@elastic/elasticsearch';
import { Product } from '../models/Product';

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
});

export const elasticsearchService = {
  async indexProduct(product: any) {
    try {
      await client.index({
        index: 'products',
        id: product._id.toString(),
        document: {
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          condition: product.condition,
          seller: product.seller,
          createdAt: product.createdAt
        }
      });
    } catch (error) {
      console.error('Elasticsearch indexing failed:', error);
      throw error;
    }
  },

  async search(query: string, filters: any = {}) {
    try {
      const { category, condition, minPrice, maxPrice } = filters;

      const must: any[] = [
        {
          multi_match: {
            query,
            fields: ['title^2', 'description'],
            fuzziness: 'AUTO'
          }
        }
      ];

      if (category) {
        must.push({ term: { category } });
      }
      if (condition) {
        must.push({ term: { condition } });
      }
      if (minPrice || maxPrice) {
        must.push({
          range: {
            price: {
              ...(minPrice && { gte: minPrice }),
              ...(maxPrice && { lte: maxPrice })
            }
          }
        });
      }
