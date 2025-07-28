 const express = require('express');
const multer = require('multer');
const path = require('path');
const contactController = require('../controllers/contactController');

const router = express.Router();

// 🗂 Storage setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 📌 ROUTES

// GET all contacts or search
router.get('/', contactController.getContacts);

// POST: Add contact (with profile picture upload)
router.post('/', upload.single('profilePic'), contactController.addContact);

// PUT: Update contact by ID
router.put('/:id', contactController.editContact);

// DELETE: Delete contact by ID
router.delete('/:id', contactController.deleteContact);

// GET: Export contacts as CSV
router.get('/export/csv', contactController.exportContacts);

module.exports = router;
