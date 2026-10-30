import React from 'react';
import { useTheme } from '../context/useTheme';

const ThemeToggle = ({ variant = 'navbar', className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`btn btn-outline-light w-100 d-flex align-items-center justify-content-center theme-toggle-sidebar ${className}`}
        title={isDark ? "Cambiar a modo normal" : "Cambiar a modo nocturno"}
        aria-label={isDark ? "Cambiar a modo normal" : "Cambiar a modo nocturno"}
      >
        <i className={`fa ${isDark ? 'fa-sun-o text-warning' : 'fa-moon-o'} mr-2`} style={{ fontSize: '1.1rem' }}></i>
        <span>{isDark ? 'Modo Normal' : 'Modo Nocturno'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${isDark ? 'theme-toggle-dark' : 'theme-toggle-light'} ${className}`}
      title={isDark ? "Cambiar a modo normal" : "Cambiar a modo nocturno"}
      aria-label={isDark ? "Cambiar a modo normal" : "Cambiar a modo nocturno"}
    >
      <span className="theme-toggle-icon-box">
        {isDark ? (
          <i className="fa fa-sun-o theme-icon-sun" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-moon-o theme-icon-moon" aria-hidden="true"></i>
        )}
      </span>
      <span className="theme-toggle-text">
        {isDark ? 'Modo Normal' : 'Modo Nocturno'}
      </span>
    </button>
  );
};

export default ThemeToggle;
