import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Admin from './Admin';
import AdminLogin from './AdminLogin';
import { LogOut } from 'lucide-react';

const ProtectedAdmin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={() => {}} />;
  }

  return (
    <div>
      {/* Logout Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Admin Panel */}
      <Admin />
    </div>
  );
};

export default ProtectedAdmin;
