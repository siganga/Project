import React, { useState, useEffect } from 'react';

const OrderList = () => { 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`http://localhost:5000/api/orders/`);
      const data = await res.json();
      setOrders(data.reverse());
    }

    fetchOrders();
  }, []);
  console.log(orders)
  /**/

   if (!Array.isArray(orders)) {
    return <p>No orders available.</p>;
  }
//tyle={{ fontFamily: 'Arial', padding: '1rem', border: '1px solid #ccc' }}
  return (
    <div  >
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} >All Orders</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {


          orders.map(order => (
          <li key={order._id}  style={{ marginBottom: '1rem' }}>
             <strong>Order ID:</strong> {order._id} -<span style={{ fontStyle: 'italic' }}>User:</span> {order.email} - <span style={{ fontStyle: 'italic' }}>Address:</span> {order.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
