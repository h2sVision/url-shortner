const Url = require('../models/url');
const crypto = require('crypto');

const generateSlang = () => {
  let slang = crypto.randomBytes(4).toString('base64url'); 
  return slang.substring(0, 5); 
};

// Create a short URL
exports.createShortUrl = async (req, res) => {
  const { url, expiresAt } = req.body;

  const urlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (!urlPattern.test(url)) {
    return res.status(400).json({ message: 'Invalid URL format' });
  }

  try {
    // Check if URL already exists
    let existingUrl = await Url.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.status(200).json(existingUrl);
    }

    // Generate a unique slang for the short URL
    let shortId = generateSlang();

    // Ensure the slang is unique in the database
    while (await Url.findOne({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` })) {
      shortId = generateSlang();
    }

    // Create and save the short URL
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;
    const newUrl = new Url({
      originalUrl: url,
      shortUrl,
      expiresAt,
    });

    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (err) {
    console.error('Error in createShortUrl:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Redirect to original URL
exports.redirectUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findOne({ shortUrl: `${req.protocol}://${req.get('host')}/${id}` });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ message: 'URL has expired' });
    }

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error('Error in redirectUrl:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllUrls = async (req, res) => {
    console.log("Received request for all URLs");
    const { page = 1, limit = 10 } = req.query;
  
    try {
      const totalUrls = await Url.countDocuments();
      console.log(`Total URLs in the database: ${totalUrls}`);
  
      const urls = await Url.find()
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      if (urls.length === 0) {
        return res.status(404).json({ message: 'No URLs found' });
      }
  
      res.status(200).json({
        total: totalUrls,
        page,
        limit,
        urls
      });
    } catch (err) {
      console.error('Error in getAllUrls:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };