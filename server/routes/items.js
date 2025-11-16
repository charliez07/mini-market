const express = require('express');
const router = express.Router();
const { readItems, writeItems, getNextId } = require('../utils/fileUtils');

// GET /api/items - Get all available items (public view)
router.get('/', (req, res) => {
  try {
    const items = readItems();
    // Filter to show only available items for public view
    const availableItems = items.filter((item) => item.status === 'available');
    console.log(`Returning ${availableItems.length} available items`);
    res.json(availableItems);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items: ' + error.message });
  }
});

// POST /api/items - Create a new listing
router.post('/', (req, res) => {
  try {
    const { title, description, price, image, seller } = req.body;

    // Validate required fields
    if (!title || !description || price === undefined || price === null || price === '' || !seller) {
      return res.status(400).json({ error: 'Missing required fields: title, description, price, and seller are required' });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ error: 'Price must be a valid positive number' });
    }

    const items = readItems();
    const imageUrl =
      image && typeof image === 'string' && image.trim().length > 0
        ? image.trim()
        : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

    const newItem = {
      id: getNextId(items),
      title: title.trim(),
      description: description.trim(),
      price: parsedPrice,
      image: imageUrl,
      seller: seller.trim(),
      status: 'available',
      buyer: null,
    };

    items.push(newItem);
    const writeSuccess = writeItems(items);
    
    if (!writeSuccess) {
      return res.status(500).json({ error: 'Failed to save item to file' });
    }

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item: ' + error.message });
  }
});

// PUT /api/items/:id/book - Book an available item
router.put('/:id/book', (req, res) => {
  try {
    const { buyer } = req.body;
    const itemId = parseInt(req.params.id, 10);

    if (!buyer) {
      return res.status(400).json({ error: 'Buyer is required to book an item' });
    }

    const items = readItems();
    const item = items.find((it) => it.id === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.seller === buyer) {
      return res.status(400).json({ error: 'You cannot book your own item' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ error: 'Item is not available for booking' });
    }

    item.status = 'booked';
    item.buyer = buyer;

    const writeSuccess = writeItems(items);
    if (!writeSuccess) {
      return res.status(500).json({ error: 'Failed to save booking' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error booking item:', error);
    res.status(500).json({ error: 'Failed to book item: ' + error.message });
  }
});

// GET /api/items/my-selling/:seller - Items for a given seller (all statuses)
router.get('/my-selling/:seller', (req, res) => {
  try {
    const { seller } = req.params;
    const items = readItems();
    const sellerItems = items.filter((item) => item.seller === seller);
    res.json(sellerItems);
  } catch (error) {
    console.error('Error fetching seller items:', error);
    res.status(500).json({ error: 'Failed to fetch seller items: ' + error.message });
  }
});

// GET /api/items/my-buying/:buyer - Items booked by a given buyer
router.get('/my-buying/:buyer', (req, res) => {
  try {
    const { buyer } = req.params;
    const items = readItems();
    const buyerItems = items.filter((item) => item.buyer === buyer);
    res.json(buyerItems);
  } catch (error) {
    console.error('Error fetching buyer items:', error);
    res.status(500).json({ error: 'Failed to fetch buyer items: ' + error.message });
  }
});

// PUT /api/items/:id/sold - Mark a booked item as sold
router.put('/:id/sold', (req, res) => {
  try {
    const { seller } = req.body;
    const itemId = parseInt(req.params.id, 10);

    if (!seller) {
      return res.status(400).json({ error: 'Seller is required to mark item as sold' });
    }

    const items = readItems();
    const item = items.find((it) => it.id === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.seller !== seller) {
      return res.status(403).json({ error: 'Only the seller can mark this item as sold' });
    }

    if (item.status !== 'booked') {
      return res.status(400).json({ error: 'Only booked items can be marked as sold' });
    }

    item.status = 'sold';

    const writeSuccess = writeItems(items);
    if (!writeSuccess) {
      return res.status(500).json({ error: 'Failed to save item as sold' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error marking item as sold:', error);
    res.status(500).json({ error: 'Failed to mark item as sold: ' + error.message });
  }
});

// PUT /api/items/:id/cancel - Cancel a booking and make item available again
router.put('/:id/cancel', (req, res) => {
  try {
    const { seller } = req.body;
    const itemId = parseInt(req.params.id, 10);

    if (!seller) {
      return res.status(400).json({ error: 'Seller is required to cancel booking' });
    }

    const items = readItems();
    const item = items.find((it) => it.id === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.seller !== seller) {
      return res.status(403).json({ error: 'Only the seller can cancel this booking' });
    }

    if (item.status !== 'booked') {
      return res.status(400).json({ error: 'Only booked items can have their booking cancelled' });
    }

    item.status = 'available';
    item.buyer = null;

    const writeSuccess = writeItems(items);
    if (!writeSuccess) {
      return res.status(500).json({ error: 'Failed to save cancelled booking' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking: ' + error.message });
  }
});

module.exports = router;
