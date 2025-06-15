import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineUnlistedScript } from 'wxt/utils/define-unlisted-script';
import App from './ui/App';

export default defineUnlistedScript(() => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
});
