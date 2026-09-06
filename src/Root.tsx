import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/app/store.ts';
import { ThemeProvider } from './Providers/theme.provider.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import SplashScreen from './components/layout/SplashScreen.tsx';
import router from './routes/routes.ts';

// Only show splash on the very first load of this browser session (not on SPA route changes).
const SPLASH_KEY = 'traveler_splash_shown';

export function Root() {
  const [showSplash, setShowSplash] = useState(() => sessionStorage.getItem(SPLASH_KEY) !== 'true');

  const handleSplashFinish = () => {
    sessionStorage.setItem(SPLASH_KEY, 'true');
    setShowSplash(false);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        <RouterProvider router={router} />
        <Toaster richColors />
      </ReduxProvider>
    </ThemeProvider>
  );
}
