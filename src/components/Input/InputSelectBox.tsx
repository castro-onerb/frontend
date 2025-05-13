import { Icon } from "@iconify/react";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react";

interface ISelectBoxProps {
  children?: ReactNode;
}

interface ISelectItemProps {
  value: string;
  children?: ReactNode;
}

interface ISelectContext {
  openBox: boolean;
  setOpenBox: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  setSelected: (value: string) => void;
}

interface ISelectTriggerProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}

const SelectContext = createContext<ISelectContext | null>(null);

export function InputSelectTrigger({ placeholder = "Selecione", value, onChange, children }: ISelectTriggerProps) {
  const [openBox, setOpenBox] = useState(false);

  return (
    <SelectContext.Provider value={{ openBox, setOpenBox, selected: value, setSelected: onChange }}>
      <div
        onClick={() => setOpenBox(!openBox)}
        className={`relative px-2 py-1 rounded-md hover:bg-zinc-100 cursor-pointer transition ${openBox && "bg-zinc-100"}`}>
        <span className="select-none text-zinc-800 flex gap-1 items-center">
          {value || placeholder}
          <Icon icon={`icon-park-solid:down-one`} />
        </span>
      </div>
      {children}
    </SelectContext.Provider>
  );
}

export function InputSelectBox({ children }: ISelectBoxProps) {
  const context = useContext(SelectContext);
  const boxRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");

  useEffect(() => {
    if (!context?.openBox) return;

    const updatePosition = () => {
      if (boxRef.current) {
        const rect = boxRef.current.getBoundingClientRect();
        const spaceBottom = window.innerHeight - rect.top;
        const spaceTop = rect.top;

        if (spaceBottom < 200 && spaceTop > 200) {
          setPosition("top");
          setMaxHeight(spaceTop - 16);
        } else {
          setPosition("bottom");
          setMaxHeight(spaceBottom - 16);
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [context?.openBox]);

  if (!context?.openBox) return null;

  return (
    <div
      ref={boxRef}
      className={`absolute ${position === "bottom" ? "top-full mt-1" : "bottom-full mb-1"} left-0 bg-white p-1 shadow-lg rounded-xl border border-zinc-200 z-10 overflow-auto box-scrollbar`}
      style={{ maxHeight }}>
      {children}
      <div className="bg-white sticky -bottom-1 flex justify-center">
        <Icon icon="icon-park-solid:down-one" />
      </div>
    </div>
  );
}

export function InputSelectItem({ value, children }: ISelectItemProps) {
  const context = useContext(SelectContext);

  if (!context) return null;

  const { setSelected, setOpenBox, selected } = context;
  const isActive = selected === value;

  const handleClick = () => {
    setSelected(value);
    setOpenBox(false);
  };

  return (
    <div
      onClick={handleClick}
      className={`px-2 py-1 rounded-lg cursor-pointer transition ${
        isActive ? "bg-zinc-100 font-medium" : "hover:bg-zinc-100"
      }`}>
      {children || value}
    </div>
  );
}
