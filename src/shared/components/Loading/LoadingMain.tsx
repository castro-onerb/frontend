import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/components/loading/loading-main.json';

export function LoadingMain() {
  return (
    <div className='z-20' style={{ width: 150, height: 150 }}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
}
