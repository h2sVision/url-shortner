const express = require('express');
const { createShortUrl, redirectUrl, getAllUrls } = require('../controllers/urlController');

const router = express.Router();

router.post('/api/shorten', createShortUrl);
router.get('/:id', redirectUrl);
router.get('/all', getAllUrls);

module.exports = router;
