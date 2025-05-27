'use client';

import React from 'react';

export default function AdminTest() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Admin Test Page</h1>
      <p>Pokud vidíte tuto stránku, admin routing funguje.</p>
      <button onClick={() => {
        fetch('/api/auth/check')
          .then(r => r.json())
          .then(data => console.log('Auth check:', data));
      }}>
        Test Auth API
      </button>
      <br/><br/>
      <button onClick={() => {
        fetch('/api/ordinace')
          .then(r => r.json())
          .then(data => console.log('Ordinace API:', data));
      }}>
        Test Ordinace API
      </button>
    </div>
  );
}