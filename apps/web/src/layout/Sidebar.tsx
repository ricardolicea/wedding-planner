import { useState } from 'react';
import imageBrindis from 'apps/web/src/assets/image-brindis.jpeg';
const WEDDING_NAME = 'Ricardo & Sofy';
const WEDDING_DATE = '21 Marzo 2026';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'guests', label: 'Invitados', icon: '🧑‍🤝‍🧑' },
  { id: 'budget', label: 'Presupuesto', icon: '💰' },
  { id: 'tasks', label: 'Tareas', icon: '✅' },
  { id: 'vendors', label: 'Proveedores', icon: '📇' },
  { id: 'events', label: 'Eventos', icon: '📅' },
  { id: 'settings', label: 'Configuración', icon: '⚙️' },
  { id: 'admin-users', label: 'Administrar Usuarios', icon: '👥' },
];

export function Sidebar() {
  const [active, setActive] = useState<string>('dashboard');

  return (
    <aside className=" md:flex md:flex-col w-72 bg-[#F9F5F2] border-r border-[#e2d5cb]/80">
      {/* Cabecera */}
      <div className="px-6 pt-6 pb-5 border-b border-[#e2d5cb]/80">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-[3px] border-[#E8C5C8] bg-[#f4e7df] shadow-sm">
            <img
              src={imageBrindis}
              alt="Ricardo y Sofy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#A09388] mb-1">
              Nuestra boda
            </div>
            <div className="font-semibold text-[15px] text-[#2b2730]">
              {WEDDING_NAME}
            </div>
            <div className="text-xs text-[#8a7e73] mt-1">{WEDDING_DATE}</div>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                isActive
                  ? 'bg-white text-[#2b2730] shadow-sm border border-[#f0dfd4]'
                  : 'text-[#5b525b] hover:bg-white/60 hover:text-[#2b2730]',
              ].join(' ')}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#e2d5cb]/80 text-xs text-[#A09388]">
        Hecho con <span className="text-red-500">❤️</span> por ustedes
      </div>
    </aside>
  );
}
