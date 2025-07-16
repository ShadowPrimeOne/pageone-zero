'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Sidebar navigation items
const navItems = [
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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Sidebar link component
  const NavLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const isActive = pathname === href || (href === '/leads' && pathname === '/');
    return (
      <Link href={href} className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setSidebarOpen(false)}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
        <div className="flex items-center h-16 px-6 font-bold text-xl tracking-tight text-blue-700 border-b border-gray-100">PageOne</div>
        <nav className="flex flex-col gap-1 mt-4">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setSidebarOpen((v) => !v)} aria-label="Open sidebar">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex-1" />
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg ml-4">
            <span>PO</span>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 