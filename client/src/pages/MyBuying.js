import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getMyBuying } from '../utils/api';
import './MyBuying.css';

function MyBuying() {
  const { currentUser } = useUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuying = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMyBuying(currentUser);
        setItems(data);
      } catch (err) {
        setError(err.message || 'Failed to load booked items');
      } finally {
        setLoading(false);
      }
    };
    fetchBuying();
  }, [currentUser]);

  return (
    <div className="page-container">
      <h2>My Buying</h2>
      {loading && <p className="info-text">Loading your booked items...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="info-text">You have not booked any items yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title} - {item.status === 'sold' ? 'Sold' : 'Booked'} from {item.seller}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBuying;

