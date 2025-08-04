export interface INavbarValue {
	title?: string;
	actions: React.ReactNode[];
	backTo?: string;
	setTitle: (title?: string) => void;
	setActions: (actions: React.ReactNode[]) => void;
	setBackTo: (backTo?: string) => void;
	reset: () => void;
}

export interface INavbarContext {
	get: (key: string) => INavbarValue;
}
