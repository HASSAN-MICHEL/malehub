// routes/libraryRoutes.js
import { Router } from 'express';
import * as libraryCtrl from '../controllers/librarycontrole.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = Router();

// oublic pour client
router.get('/',              libraryCtrl.getBooks);           // GET /library
router.get('/books',         libraryCtrl.getBooks);           // GET /library/books
router.get('/books/:slug',   libraryCtrl.getBookBySlug);      // GET /library/books/:slug
router.get('/categories',    libraryCtrl.getCategories);      

// ── Routes protégées (admin uniquement) 
router.use(protect);  

router.post('/admin/books',        adminOnly, libraryCtrl.createBook);   
router.put('/admin/books/:id',     adminOnly, libraryCtrl.updateBook);   
router.delete('/admin/books/:id',  adminOnly, libraryCtrl.deleteBook);   

export const LibraryRoute = router;