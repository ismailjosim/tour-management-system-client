import { useEffect } from 'react';
import { useLocation } from 'react-router';

const DocumentTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    let pageName = 'Home';
    const path = location.pathname;

    if (path === '/') pageName = 'Home';
    else if (path === '/about') pageName = 'About Us';
    else if (path === '/contact') pageName = 'Contact';
    else if (path === '/faq') pageName = 'FAQs';
    else if (path === '/destinations') pageName = 'Destinations';
    else if (path.startsWith('/destination/')) pageName = 'Destination Details';
    else if (path.startsWith('/booking/')) pageName = 'Book Tour';
    else if (path === '/profile') pageName = 'Profile';
    else if (path === '/settings') pageName = 'Settings';
    else if (path === '/support') pageName = 'Support';
    else if (path.startsWith('/admin')) pageName = 'Admin Dashboard';
    else if (path.startsWith('/user')) pageName = 'User Dashboard';
    else if (path.startsWith('/guide')) pageName = 'Guide Dashboard';
    else if (path === '/login') pageName = 'Login';
    else if (path === '/register') pageName = 'Register';
    else if (path === '/forgot-password') pageName = 'Forgot Password';
    else if (path === '/reset-password') pageName = 'Reset Password';
    else if (path === '/verify') pageName = 'Verify Email';
    else if (path === '/unauthorized') pageName = 'Unauthorized';
    else if (path.startsWith('/payment/')) pageName = 'Payment';
    else {
      // Fallback for unknown paths
      const segments = path.split('/').filter(Boolean);
      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        pageName = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
      }
    }

    document.title = `${pageName} - Traveler | Travel Around The World`;
  }, [location]);

  return null;
};

export default DocumentTitleUpdater;
