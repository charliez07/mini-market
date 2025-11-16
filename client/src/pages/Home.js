import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getItems } from '../utils/api';
import ItemCard from '../components/ItemCard';
import './Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchItems();
  }, [location.pathname]); // Refetch when navigating to home

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItems();
      setItems(data);
      console.log('Fetched items:', data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load items. Please try again.';
      setError(errorMessage);
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-container">Loading items...</div>;
  }

  if (error) {
    return <div className="page-container error">{error}</div>;
  }

  return (
    <div className="page-container">
      <h2>Available Items</h2>
      {items.length === 0 ? (
        <p className="empty-state">No items available at the moment.</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onBooked={() => {
                // After booking, refetch items so the booked item disappears from public list
                fetchItems();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

