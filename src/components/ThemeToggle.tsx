'use client';

import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Vérifier les préférences utilisateur dans localStorage
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Appliquer le thème sur l'élément <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-blue-200 dark:bg-gray-800 rounded-lg"
    >
      {theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
    </button>
  );
}

export default ThemeToggle;
