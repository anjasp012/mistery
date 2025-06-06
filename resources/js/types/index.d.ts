import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Flash {
    success?: string;
    error?: string;
}
export interface Themes {
    [key: string]: {
        name: string;
        file: string;
        link: string;
        is_active: boolean;
    };
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: Flash;
    themes: Themes;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    keys: any[];
    boxes: any[];
    [key: string]: unknown; // This allows for additional properties...
}
