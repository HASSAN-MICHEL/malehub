// controllers/libraryController.js
import LibraryBook from '../models/Library.js';
import { slugify } from '../utils/helper.js';

// public

// Récupérer tous les livres
export const getBooks = async (req, res) => {
  try {
    const { category, featured, available } = req.query;
    const filters = {};
    
    if (category) filters.category = category;
    if (featured === 'true') filters.is_featured = true;
    if (available === 'true') filters.is_available = true;
    
    const books = await LibraryBook.findAll(filters);
    
    res.json({
      success: true,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération des livres' 
    });
  }
};

// Récupérer un livre par son slug
export const getBookBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const book = await LibraryBook.findBySlug(slug);
    
    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Livre non trouvé' 
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération du livre' 
    });
  }
};

// Récupérer les catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await LibraryBook.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération des catégories' 
    });
  }
};

// ── Routes admin ─────────────────────────────────────────────────────────────

// Créer un livre
export const createBook = async (req, res) => {
  try {
    const { title, description, author, cover_image, category, isbn, 
            published_year, pages, download_url, preview_url, is_available, is_featured } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Le titre est requis' 
      });
    }
    
    const slug = slugify(title);
    const existingBook = await LibraryBook.findBySlug(slug);
    
    if (existingBook) {
      return res.status(400).json({ 
        success: false, 
        message: 'Un livre avec ce titre existe déjà' 
      });
    }
    
    const id = await LibraryBook.create({
      title, slug, description, author, cover_image, category, isbn,
      published_year, pages, download_url, preview_url, is_available, is_featured
    });
    
    res.json({
      success: true,
      message: 'Livre créé avec succès',
      data: { id, slug }
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la création du livre' 
    });
  }
};

// Mettre à jour un livre
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await LibraryBook.findById(id);
    
    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Livre non trouvé' 
      });
    }
    
    const { title, description, author, cover_image, category, isbn,
            published_year, pages, download_url, preview_url, is_available, 
            is_featured, sort_order } = req.body;
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (title !== undefined) updateData.slug = slugify(title);
    if (description !== undefined) updateData.description = description;
    if (author !== undefined) updateData.author = author;
    if (cover_image !== undefined) updateData.cover_image = cover_image;
    if (category !== undefined) updateData.category = category;
    if (isbn !== undefined) updateData.isbn = isbn;
    if (published_year !== undefined) updateData.published_year = published_year;
    if (pages !== undefined) updateData.pages = pages;
    if (download_url !== undefined) updateData.download_url = download_url;
    if (preview_url !== undefined) updateData.preview_url = preview_url;
    if (is_available !== undefined) updateData.is_available = is_available;
    if (is_featured !== undefined) updateData.is_featured = is_featured;
    if (sort_order !== undefined) updateData.sort_order = sort_order;
    
    await LibraryBook.update(id, updateData);
    
    res.json({
      success: true,
      message: 'Livre mis à jour avec succès'
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la mise à jour du livre' 
    });
  }
};

// Supprimer un livre
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LibraryBook.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        message: 'Livre non trouvé' 
      });
    }
    
    res.json({
      success: true,
      message: 'Livre supprimé avec succès'
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression du livre' 
    });
  }
};