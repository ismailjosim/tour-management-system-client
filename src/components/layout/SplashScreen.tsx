import { useEffect, useState } from 'react';
import logoDark from '@/assets/images/site-logo-dark.png';
import logoLight from '@/assets/images/site-logo-light.png';

const TAGLINES = [
  'Discover your next adventure…',
  'The world is waiting for you…',
  'Every journey starts with a single step…',
  'Crafting unforgettable travel memories…',
];

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [tagline] = useState(() => TAGLINES[Math.floor(Math.random() * TAGLINES.length)]);
  const [fadeOut, setFadeOut] = useState(false);

  // Detect system dark mode preference (since ThemeProvider isn't wrapping this)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Also check if the saved theme in localStorage is dark
  const savedTheme = localStorage.getItem('vite-ui-theme');
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  useEffect(() => {
    // Animate progress bar from 0 → 100 over ~1.8s
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        // Small pause at 100%, then fade out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinish, 500); // match CSS transition
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(135deg, hsl(217,22%,14%) 0%, hsl(219,27%,10%) 100%)'
          : 'linear-gradient(135deg, hsl(0,0%,100%) 0%, hsl(0,0%,96%) 100%)',
        transition: 'opacity 0.5s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Decorative background blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'hsl(179,97%,31%)',
          opacity: 0.07,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'hsl(14,65%,57%)',
          opacity: 0.08,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <div
        style={{
          marginBottom: '32px',
          animation: 'splashLogoIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}
      >
        <img
          src={isDark ? logoLight : logoDark}
          alt="Traveler Logo"
          style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: '15px',
          color: isDark ? 'hsl(0,0%,70%)' : 'hsl(0,0%,45%)',
          marginBottom: '36px',
          letterSpacing: '0.04em',
          fontFamily: 'Poppins, sans-serif',
          animation: 'splashFadeUp 0.7s ease 0.2s both',
        }}
      >
        {tagline}
      </p>

      {/* Progress bar track */}
      <div
        style={{
          width: '220px',
          height: '4px',
          borderRadius: '99px',
          background: isDark ? 'hsl(219,27%,25%)' : 'hsl(0,0%,88%)',
          overflow: 'hidden',
          animation: 'splashFadeUp 0.7s ease 0.3s both',
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            borderRadius: '99px',
            background: 'linear-gradient(90deg, hsl(179,97%,31%), hsl(14,65%,57%))',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      {/* Percentage label */}
      <p
        style={{
          marginTop: '14px',
          fontSize: '12px',
          color: isDark ? 'hsl(0,0%,55%)' : 'hsl(0,0%,60%)',
          fontFamily: 'Poppins, sans-serif',
          fontVariantNumeric: 'tabular-nums',
          animation: 'splashFadeUp 0.7s ease 0.4s both',
        }}
      >
        {progress}%
      </p>

      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: scale(0.8) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
