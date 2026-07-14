import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'ember', toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('rse-theme') || 'ember';
    }
    return 'ember';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('rse-theme', theme); } catch (_) {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'ember' ? 'grey' : 'ember'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
