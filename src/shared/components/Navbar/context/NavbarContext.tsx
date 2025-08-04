import { createContext } from 'react';
import type { INavbarContext } from '../types/navbar-context';

export const NavbarContext = createContext<INavbarContext | null>(null);
