import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { bookItem } from '../utils/api';
import './ItemCard.css';

function ItemCard({ item, onBooked }) {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canBook = item.status === 'available' && item.seller !== currentUser;

  const handleBook = async () => {
    if (!canBook || loading) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await bookItem(item.id, currentUser);
      if (onBooked) {
        onBooked(updated);
      }
    } catch (err) {
      setError(err.message || 'Failed to book item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-footer">
          <span className="item-price">${item.price}</span>
          <span className="item-seller">Seller: {item.seller}</span>
        </div>
        <div className="item-actions">
          {error && <div className="item-error">{error}</div>}
          {item.seller === currentUser ? (
            <span className="item-badge">Your listing</span>
          ) : (
            <button
              className="book-button"
              onClick={handleBook}
              disabled={!canBook || loading}
            >
              {loading ? 'Booking...' : 'Book'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

