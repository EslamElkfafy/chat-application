import { useEffect } from 'react';

const useViewportHeight = () => {
  useEffect(() => {
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    adjustHeight();

    window.addEventListener('resize', adjustHeight);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);
};

export default useViewportHeight;