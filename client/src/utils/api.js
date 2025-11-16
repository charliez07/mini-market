const API_BASE_URL = '/api';

// Fetch all available items
export const getItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch items: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Create a new listing
export const createItem = async (itemData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to create item: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Book an item
export const bookItem = async (itemId, buyer) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}/book`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buyer }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to book item: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error booking item:', error);
    throw error;
  }
};

// Get items for a seller
export const getMySelling = async (seller) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/my-selling/${encodeURIComponent(seller)}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch selling items: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching selling items:', error);
    throw error;
  }
};

// Get items for a buyer
export const getMyBuying = async (buyer) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/my-buying/${encodeURIComponent(buyer)}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch buying items: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching buying items:', error);
    throw error;
  }
};

// Mark an item as sold
export const markItemSold = async (itemId, seller) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}/sold`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seller }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to mark item as sold: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error marking item as sold:', error);
    throw error;
  }
};

// Cancel a booking
export const cancelItemBooking = async (itemId, seller) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seller }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to cancel booking: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

