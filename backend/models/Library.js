// models/LibraryBook.js
import db from '../config/database.js';

class LibraryBook {
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM library_books WHERE 1=1';
    const params = [];
    let paramCounter = 1;
    
    if (filters.category) {
      query += ` AND category = $${paramCounter++}`;
      params.push(filters.category);
    }
    
    if (filters.is_featured !== undefined) {
      query += ` AND is_featured = $${paramCounter++}`;
      params.push(filters.is_featured);
    }
    
    if (filters.is_available !== undefined) {
      query += ` AND is_available = $${paramCounter++}`;
      params.push(filters.is_available);
    }
    
    query += ' ORDER BY sort_order ASC, created_at DESC';
    
    const result = await db.query(query, params);
    return result.rows;
  }
  
  static async findById(id) {
    const result = await db.query('SELECT * FROM library_books WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  static async findBySlug(slug) {
    const result = await db.query('SELECT * FROM library_books WHERE slug = $1', [slug]);
    return result.rows[0];
  }
  
  static async create(data) {
    const {
      title, slug, description, author, cover_image, category,
      isbn, published_year, pages, download_url, preview_url,
      is_available, is_featured, sort_order
    } = data;
    
    const result = await db.query(
      `INSERT INTO library_books 
       (title, slug, description, author, cover_image, category, isbn, 
        published_year, pages, download_url, preview_url, is_available, is_featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING id`,
      [title, slug, description, author, cover_image, category, isbn,
       published_year, pages, download_url, preview_url, is_available !== false, 
       is_featured === true, sort_order || 0]
    );
    
    return result.rows[0].id;
  }
  
  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramCounter = 1;
    
    const allowedFields = ['title', 'slug', 'description', 'author', 'cover_image', 
                           'category', 'isbn', 'published_year', 'pages', 
                           'download_url', 'preview_url', 'is_available', 
                           'is_featured', 'sort_order'];
    
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        fields.push(`${field} = $${paramCounter++}`);
        values.push(data[field]);
      }
    }
    
    if (fields.length === 0) return false;
    
    values.push(id);
    const result = await db.query(
      `UPDATE library_books SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCounter}`,
      values
    );
    
    return result.rowCount > 0;
  }
  
  static async delete(id) {
    const result = await db.query('DELETE FROM library_books WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
  
  static async getCategories() {
    const result = await db.query(
      "SELECT DISTINCT category FROM library_books WHERE category IS NOT NULL AND category != '' ORDER BY category"
    );
    return result.rows.map(r => r.category);
  }
}

export default LibraryBook;