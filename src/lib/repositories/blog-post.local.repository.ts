import { BlogPost } from '@/domain/models/blog-post.model';
import { IBlogPostRepository } from '@/lib/interfaces/blog-post.interface';
import logger from '@/lib/logger'
import { getDatabaseFilePath } from '@/lib/config/database.config';
import { Database } from 'sqlite3';
import { SqlLiteAdapter } from './adapters/sqllite.adapter';
const dbPath = getDatabaseFilePath();
const db = new Database(dbPath);

export class BlogPostRepositoryLocal extends SqlLiteAdapter<BlogPost, string> implements IBlogPostRepository {
  constructor() {
    super("professor_news_posts", db);
  }

  async getBlogPosts( ): Promise<BlogPost[]> {
    const blogPosts = await this.list()
    return blogPosts
  }

  async getBlogPostBySlug(slug: string,  ): Promise<BlogPost | null> {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE slug = ?`;
      console.log('query with slug', query, slug)
      const result = await new Promise<any>((resolve, reject) => {
        this.db.get(query, [slug], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row);
        });
      });

      if (!result) {
        return null;
      }

      return result;
    } catch (error: any) {
      logger.log(`Error fetching blog post with slug ${slug}:`, error);
      throw new Error(`Failed to fetch blog post: ${error.message}`);
    }
  }

  async getBlogPostById(id: string,  ): Promise<BlogPost | null> {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      const result = await new Promise<any>((resolve, reject) => {
        this.db.get(query, [id], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row);
        });
      });

      if (!result) {
        return null;
      }

      return result;
    } catch (error: any) {
      logger.log(`Error fetching blog post with id ${id}:`, error);
      throw new Error(`Failed to fetch blog post: ${error.message}`);
    }
  }

  async createBlogPost(blogPost: Omit<BlogPost, 'id'>,   ): Promise<BlogPost> {
    try {
      const query = `
        INSERT INTO ${this.tableName} (title, slug, image_url, created_at, image_alt, excerpt, content_html, tag)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        blogPost.title,
        blogPost.slug,
        blogPost.image_url,
        blogPost.created_at,
        blogPost.image_alt,
        blogPost.excerpt,
        blogPost.content_html,
        blogPost.tag,

      ];

      await new Promise<void>((resolve, reject) => {
        this.db.run(query, params, function (err: Error | null) {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });

      return {
        id: Date.now().toString(), // Mock ID generation
        ...blogPost,
      };
    } catch (error: any) {
      logger.log(`Error creating blog post:`, error);
      throw new Error(`Failed to create blog post: ${error.message}`);
    }
  }

  async updateBlogPost(id: string, blogPost: Partial<BlogPost>,  ): Promise<BlogPost | null> {
    try {
      const updates: string[] = [];
      const params: any[] = [];

      const persistenceBlogPost = {
        ...await this.getBlogPostById(id), // Get existing post
        ...blogPost // Merge with updates
      } as BlogPost;

      for (const [key, value] of Object.entries(persistenceBlogPost)) {
        if (value !== undefined) {
          updates.push(`${key} = ?`);
          params.push(value);
        }
      }

      if (updates.length === 0) {
        return this.getBlogPostById(id);
      }

      params.push(id);

      const query = `
        UPDATE ${this.tableName}
        SET ${updates.join(', ')}
        WHERE id = ?
      `;
      console.log('query with id', query, id)

      await new Promise<void>((resolve, reject) => {
        this.db.run(query, params, function (err: Error | null) {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });

      return this.getBlogPostById(id);
    } catch (error: any) {
      logger.log(`Error updating blog post with id ${id}:`, error);
      throw new Error(`Failed to update blog post: ${error.message}`);
    }
  }

  async deleteBlogPost(id: string,  ): Promise<boolean> {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;

      console.log('query with id', query, id)
      await new Promise<void>((resolve, reject) => {
        this.db.run(query, [id], function (err: Error | null) {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });

      return true;
    } catch (error: any) {
      logger.log(`Error deleting blog post with id ${id}:`, error);
      throw new Error(`Failed to delete blog post: ${error.message}`);
    }
  }

  async list( ): Promise<BlogPost[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${this.tableName}`;
      

      this.db.all(query, [], (err, rows: any[]) => {
        if (err) {
          logger.log(`Error listing blog posts:`, err);
          reject(new Error(`Database error listing blog posts: ${err.message || 'Unknown error'}`));
          return;
        }
        resolve(rows || []);
      });
    });
  }
}

// export singleton
export const blogPostRepositoryLocal = new BlogPostRepositoryLocal();