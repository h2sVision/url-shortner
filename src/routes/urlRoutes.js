const express = require('express');
const { createShortUrl, redirectUrl, getAllShortUrls } = require('../controllers/urlController');

const router = express.Router();

router.post('/api/shorten', createShortUrl);
router.get('/:id', redirectUrl);
router.get('/api/shortenedUrls', getAllShortUrls);

module.exports = router;
