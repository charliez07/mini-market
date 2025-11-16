import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getMySelling, markItemSold, cancelItemBooking } from '../utils/api';
import './MySelling.css';

function MySelling() {
  const { currentUser } = useUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchSelling = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMySelling(currentUser);
      setItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load selling items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleMarkSold = async (itemId) => {
    try {
      setActionError(null);
      await markItemSold(itemId, currentUser);
      await fetchSelling();
    } catch (err) {
      setActionError(err.message || 'Failed to mark item as sold');
    }
  };

  const handleCancelBooking = async (itemId) => {
    try {
      setActionError(null);
      await cancelItemBooking(itemId, currentUser);
      await fetchSelling();
    } catch (err) {
      setActionError(err.message || 'Failed to cancel booking');
    }
  };

  const grouped = {
    available: items.filter((i) => i.status === 'available'),
    booked: items.filter((i) => i.status === 'booked'),
    sold: items.filter((i) => i.status === 'sold'),
  };

  return (
    <div className="page-container">
      <h2>My Selling</h2>
      {loading && <p className="info-text">Loading your listings...</p>}
      {error && <p className="error-text">{error}</p>}
      {actionError && <p className="error-text">{actionError}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="info-text">You have not posted any items yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="status-groups">
          <div className="status-group">
            <h3>Available</h3>
            {grouped.available.length === 0 ? (
              <p className="info-text">No available items.</p>
            ) : (
              <ul>
                {grouped.available.map((item) => (
                  <li key={item.id}>
                    {item.title} - ${item.price}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="status-group">
            <h3>Booked</h3>
            {grouped.booked.length === 0 ? (
              <p className="info-text">No booked items yet.</p>
            ) : (
              <ul>
                {grouped.booked.map((item) => (
                  <li key={item.id}>
                    {item.title} - booked by {item.buyer}{' '}
                    <button
                      className="small-button primary"
                      onClick={() => handleMarkSold(item.id)}
                    >
                      Mark as Sold
                    </button>
                    <button
                      className="small-button secondary"
                      onClick={() => handleCancelBooking(item.id)}
                    >
                      Cancel Booking
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="status-group">
            <h3>Sold</h3>
            {grouped.sold.length === 0 ? (
              <p className="info-text">No sold items yet.</p>
            ) : (
              <ul>
                {grouped.sold.map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MySelling;

