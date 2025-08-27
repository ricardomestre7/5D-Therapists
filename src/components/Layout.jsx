import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Edit3, FileText, Zap, LogOut, Sun, Moon, Settings, User, BarChartHorizontalBig, ShieldQuestion, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme/theme-provider.jsx';
import { Button } from '@/components/ui/button.jsx';

const NavItem = ({ to, icon: Icon, label, exact = false }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <motion.li
      whileHover={{ scale: 1.05, x: isActive ? 0 : 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
      >
        <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-purple-400'}`} />
        {label}
      </Link>
    </motion.li>
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-gray-300 hover:bg-slate-700 rounded-full"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
      className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.svg 
              width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#grad1_layout)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="url(#grad2_layout)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#grad3_layout)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="grad1_layout" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "rgb(168, 85, 247)", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor: "rgb(236, 72, 153)", stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="grad2_layout" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "rgb(236, 72, 153)", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor: "rgb(168, 85, 247)", stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="grad3_layout" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "rgb(124, 58, 237)", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor: "rgb(192, 38, 211)", stopOpacity:1}} />
                </linearGradient>
              </defs>
            </motion.svg>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              5D Therapists
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onLogout();
                // Navigation to /login is handled by ProtectedRoute in App.jsx
              }}
              className="text-gray-300 hover:bg-slate-700 rounded-full"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const Sidebar = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Dashboard", exact: true },
    { to: "/collect-data", icon: Edit3, label: "Coleta de Dados" },
    { to: "/reports", icon: FileText, label: "Relatórios" },
    { to: "/practices", icon: Zap, label: "Práticas Quânticas" },
  ];

  return (
    <motion.aside 
      className="w-60 bg-slate-800 p-5 space-y-6 shadow-xl fixed top-16 bottom-0 left-0 overflow-y-auto z-30"
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 60, delay: 0.3 }}
    >
      <div className="flex flex-col items-center mb-6 border-b border-slate-700 pb-4">
        <img  alt="User Avatar" className="w-20 h-20 rounded-full mb-3 border-2 border-purple-500 object-cover" src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3" />
        <p className="text-sm text-slate-400">Terapeuta Logado</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t border-slate-700">
        <p className="text-xs text-center text-slate-500">© {new Date().getFullYear()} 5D Therapists</p>
      </div>
    </motion.aside>
  );
};

const AppLayout = ({ children, onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={onLogout} />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 ml-60 bg-slate-900 quantum-subtle-pattern overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;