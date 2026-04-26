import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Map, Flag, Compass, User } from 'lucide-react';

const tabs = [
  { to: '/',          icon: Sun,     label: 'Today'    },
  { to: '/map',       icon: Map,     label: 'Map'      },
  { to: '/missions',  icon: Flag,    label: 'Missions' },
  { to: '/guide',     icon: Compass, label: 'Guide'    },
  { to: '/me',        icon: User,    label: 'Me'       },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  const activeIndex = tabs.findIndex(t =>
    t.to === '/' ? pathname === '/' : pathname.startsWith(t.to)
  );

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[1100] pb-safe"
      style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(24px)', borderTop: '1px solid rgba(11,31,46,0.06)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-2">
        {tabs.map(({ to, icon: Icon, label }, i) => {
          const isActive = i === activeIndex;
          return (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="flex flex-col items-center gap-0.5 px-3 py-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-teal-600"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={isActive ? '#0D9488' : '#94A3B8'}
                />
              </motion.div>
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? '#0D9488' : '#94A3B8' }}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
