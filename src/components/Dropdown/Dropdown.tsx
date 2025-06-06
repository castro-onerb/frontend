import {
  offset,
  flip,
  shift,
  autoUpdate,
  type Placement,
} from '@floating-ui/react-dom';

import {
  useFloating,
  useDismiss,
  useClick,
  useInteractions,
} from '@floating-ui/react-dom-interactions';

import {
  useState,
  useContext,
  createContext,
  type ReactNode,
  type ReactElement,
  type CSSProperties,
  type HTMLProps,
} from 'react';

import { cloneWithRef } from '@/utils/react/cloneWithRef';
import clsx from 'clsx';

interface DropdownContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  refs: {
    setReference: (node: HTMLElement | null) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles: CSSProperties;
  getReferenceProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown components must be used within <Dropdown>');
  return ctx;
}

export function Dropdown({
  children,
  placement = 'bottom-end',
  closeOnClickOutside = true,
}: {
  children: ReactNode;
  placement?: Placement;
  closeOnClickOutside?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const {
    context,
    x,
    y,
    strategy,
    reference,
    floating,
  } = useFloating({
    placement,
    middleware: [offset(8), flip(), shift()],
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, { enabled: closeOnClickOutside });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const floatingStyles: CSSProperties = {
    position: strategy,
    top: y ?? 0,
    left: x ?? 0,
  };

  const contextValue: DropdownContextType = {
    open,
    setOpen,
    refs: {
      setReference: reference,
      setFloating: floating,
    },
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
}

Dropdown.Trigger = function Trigger({ children }: { children: ReactElement }) {
  const { setOpen, open, refs, getReferenceProps } = useDropdownContext();

  const handleClick = (e: React.MouseEvent) => {
    const childProps = children.props as { onClick?: (e: React.MouseEvent) => void };
    childProps.onClick?.(e);
    setOpen(!open);
  };

  return cloneWithRef(children, refs.setReference, {
    ...getReferenceProps({ onClick: handleClick }),
  });
};

Dropdown.Content = function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, refs, floatingStyles, getFloatingProps } = useDropdownContext();
  if (!open) return null;

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
      className={clsx(
        'z-10 bg-white shadow-xl rounded-xl border border-slate-100',
        className
      )}
    >
      {children}
    </div>
  );
};
