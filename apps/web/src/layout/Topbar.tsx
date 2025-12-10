export function TopBar() {
  return (
    <header className="h-16 bg-transparent flex items-center border-b border-[#e2d5cb]/70 px-4 md:px-8">
      <div className="flex-1">
        <div className="text-xs uppercase tracking-[0.25em] text-[#A09388]">
          Panel de planeación
        </div>
        <div className="text-[15px] font-semibold text-[#2b2730]">
          Planeando nuestro gran día ✨
        </div>
        
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[#8a7e73]">Ricardo</span>
        <div className="h-9 w-9 rounded-full border border-[#E8C5C8] overflow-hidden bg-[#f4e7df]">
          {/* Avatar pequeño tuyo (cámbialo luego) */}
          
        </div>
      </div>
    </header>
  );
}
