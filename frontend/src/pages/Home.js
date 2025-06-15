import React from 'react';

const Home = ({ chooseRole }) => (
  <div className="text-center">
    <h1 className="mb-4">Welcome to Java Course Platform</h1>
    <button className="btn btn-primary me-3" onClick={() => chooseRole('ADMIN')}>Login as Admin</button>
    <button className="btn btn-success" onClick={() => chooseRole('STUDENT')}>Login as Student</button>
  </div>
);

export default Home;
