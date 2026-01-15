import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieProps {
  size: 'small' | 'medium' | 'large';
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
  small: 'w-32 h-32',
  medium: 'w-96 h-96',
  large: 'w-[600px] h-[600px]'
};

const LottieAnimation: React.FC<LottieProps> = ({ 
  size,
  src,
  loop ,
  autoplay ,
  className ,
}) => {

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
};

export default LottieAnimation;