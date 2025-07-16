import React from 'react';
import Link from 'next/link';

export const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" /></svg>
  ) },
  { label: 'Leads', href: '/leads', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
  ) },
  { label: 'Clients', href: '/clients', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87" /><path d="M9 20H4v-2a4 4 0 013-3.87" /><circle cx="12" cy="7" r="4" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
  ) },
  { label: 'Campaigns', href: '/campaigns', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10h2l1 2h13l1-2h2" /><circle cx="12" cy="17" r="4" /><path d="M12 3v4" /></svg>
  ) },
  { label: 'Profile', href: '/profile', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M5.5 21h13a2.5 2.5 0 002.5-2.5v-1A5.5 5.5 0 0015.5 12h-7A5.5 5.5 0 003 17.5v1A2.5 2.5 0 005.5 21z" /></svg>
  ) },
];

interface SidebarProps {
  currentPath: string;
  onLinkClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, onLinkClick }) => (
  <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
    <div className="flex items-center h-16 px-6 font-bold text-xl tracking-tight text-blue-700 dark:text-blue-200 border-b border-gray-100 dark:border-gray-700">PageOne</div>
    <nav className="flex flex-col gap-1 mt-4">
      {navItems.map((item) => {
        const isActive = currentPath === item.href || (item.href === '/leads' && currentPath === '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}`}
            onClick={onLinkClick}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  </aside>
);

export default Sidebar; 