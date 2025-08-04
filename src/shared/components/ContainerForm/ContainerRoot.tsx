import { useViewport } from '@/shared/utils/viewport-bool';
import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

interface IContainerProps {
  children?: ReactNode;
  className?: string;
}

export function ContainerRoot({ children, className }: IContainerProps) {

  const { max } = useViewport();

  return (
  <>
    {max(800) ? (
      <ContainerMobile className={className}>{children}</ContainerMobile>
    ) : (
      <ContainerDesktop className={className}>{children}</ContainerDesktop>
    )}
  </>
  );
}

function ContainerDesktop({ children, className }: IContainerProps) {
  return (
    <div className={`relative flex-1 flex flex-col items-center gap-3 py-10 justify-between ${className}`}>
      {children}
    </div>
  );
}

function ContainerMobile({ children, className }: IContainerProps) {
  const [height, setHeight] = useState(450);
  const [animateLimit, setAnimateLimit] = useState(false);

  const minHeight = 280;
  const maxHeight = 580;

  return (
    <motion.div
      className={`z-1 absolute bg-white left-0 right-0 bottom-0 rounded-t-xl flex-1 flex flex-col gap-3 p-3 py-3 ${className}`} // mantém igual
      style={{ height }}
      // ❌ remova drag do container principal
      initial={{ height: minHeight }}
      animate={{
        height: animateLimit ? maxHeight + 80 : height,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* ✅ Apenas a alça será "draggable" */}
      <motion.div
        className="relative flex justify-center p-2 cursor-grab active:cursor-grabbing"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        dragDirectionLock={true}
        onDrag={(_, info) => {
          const newHeight = height - info.delta.y;

          if (newHeight > maxHeight) {
            setAnimateLimit(true);
          } else {
            setHeight(Math.max(minHeight, Math.min(newHeight, maxHeight)));
          }
        }}
        onDragEnd={() => {
          setAnimateLimit(false);
        }}
      >
        <span className="inline bg-neutral-400 w-14 h-1 rounded-full"></span>
      </motion.div>

      {/* ✅ Conteúdo agora scrolla normalmente */}
      <div className="flex-1 overflow-x-clip overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
}
