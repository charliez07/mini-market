const fs = require('fs');
const path = require('path');

const ITEMS_FILE = path.join(__dirname, '../data/items.json');

// Read items from JSON file
function readItems() {
  try {
    const data = fs.readFileSync(ITEMS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading items file:', error);
    return [];
  }
}

// Write items to JSON file
function writeItems(items) {
  try {
    fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing items file:', error);
    return false;
  }
}

// Get next available ID
function getNextId(items) {
  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map(item => item.id));
  return maxId + 1;
}

module.exports = {
  readItems,
  writeItems,
  getNextId
};

