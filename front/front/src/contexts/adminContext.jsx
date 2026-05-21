// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { adminAuthAPI } from '../services/admin'; // ← Importer adminAuthAPI

// const AdminAuthContext = createContext(null //

// export const useAdminAuth = () => {
//   const context = useContext(AdminAuthContext);
//   if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
//   return context;
// };

// export const AdminAuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('admin_token');
//     if (token) {
//       loadUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const loadUser = async () => {
//     try {
//       const response = await adminAuthAPI.getMe(); // ← Utiliser adminAuthAPI
//       setUser(response.data.data.user);
//     } catch (error) {
//       console.error('Error loading user:', error);
//       localStorage.removeItem('admin_token');
//       localStorage.removeItem('admin_refreshToken');
//       localStorage.removeItem('admin_user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const response = await adminAuthAPI.login({ email, password }); // ← Utiliser adminAuthAPI
//       const { token, refreshToken, user } = response.data.data;
//       localStorage.setItem('admin_token', token);
//       localStorage.setItem('admin_refreshToken', refreshToken);
//       localStorage.setItem('admin_user', JSON.stringify(user));
//       setUser(user);
//       return user;
//     } catch (error) {
//       console.error('Login error details:', error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('admin_token');
//     localStorage.removeItem('admin_refreshToken');
//     localStorage.removeItem('admin_user');
//     setUser(null);
//     window.location.href = '/admin/login';
//   };

//   const hasPermission = (allowedRoles) => {
//     if (!user) return false;
//     return allowedRoles.includes(user.role);
//   };

//   return (
//     <AdminAuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://maleahub.vercel.app/api';

const AdminAuthContext = createContext(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refreshToken');
      localStorage.removeItem('admin_user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, refreshToken, user } = response.data.data;
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_refreshToken', refreshToken);
      localStorage.setItem('admin_user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login error details:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_refreshToken');
    localStorage.removeItem('admin_user');
    setUser(null);
    window.location.href = '/admin/login';
  };

  const hasPermission = (allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
