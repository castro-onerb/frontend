import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/components/loading/loading-main.json';
import { useEffect } from 'react';

export function LoadingMain() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="z-20" style={{ width: 150, height: 150 }}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
}
