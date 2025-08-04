import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ReactElement,
	type ReactNode,
	type Ref,
} from 'react';
import {
	autoUpdate,
	computePosition,
	flip,
	offset,
	shift,
	type Placement,
} from '@floating-ui/react';
import { cloneWithRef } from '@/shared/utils/react/cloneWithRef';
import { createContext } from 'react';

interface IDropdownContext {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DropdownContext = createContext<IDropdownContext | null>(null);

interface IDropdownRootProps {
	children: ReactElement;
	dropdown: ReactNode;
	placement?: Placement;
	closeOnClickOutside?: boolean;
}

export function DropdownRoot({
	children,
	dropdown,
	placement = 'bottom-start',
	closeOnClickOutside = true,
}: IDropdownRootProps) {
	const [open, setOpen] = useState(false);

	const referenceRef = useRef<HTMLElement | null>(null);
	const floatingRef = useRef<HTMLElement | null>(null);

	const updatePosition = useCallback(() => {
		const refEl = referenceRef.current;
		const floatEl = floatingRef.current;
		if (refEl && floatEl) {
			void computePosition(refEl, floatEl, {
				placement,
				middleware: [offset(4), flip(), shift()],
			}).then(({ x, y, strategy }) => {
				Object.assign(floatEl.style, {
					position: strategy,
					left: `${x}px`,
					top: `${y}px`,
				});
			});
		}
	}, [placement]);

	useEffect(() => {
		if (open && referenceRef.current && floatingRef.current) {
			return autoUpdate(
				referenceRef.current,
				floatingRef.current,
				updatePosition,
			);
		}
	}, [open, updatePosition]);

	useEffect(() => {
		if (!open || !closeOnClickOutside) return;
		function onClick(e: MouseEvent) {
			const target = e.target as Node;
			if (
				referenceRef.current?.contains(target) ||
				floatingRef.current?.contains(target)
			)
				return;
			setOpen(false);
		}
		document.addEventListener('mousedown', onClick);
		return () => document.removeEventListener('mousedown', onClick);
	}, [open, closeOnClickOutside]);

	return (
		<DropdownContext.Provider value={{ open, setOpen }}>
			{cloneWithRef(children, referenceRef, {
				onClick: () => setOpen((o) => !o),
			})}

			{open && (
				<div
					ref={floatingRef as Ref<HTMLDivElement> | undefined}
					style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}
				>
					{dropdown}
				</div>
			)}
		</DropdownContext.Provider>
	);
}
