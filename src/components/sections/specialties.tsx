export function Specialties() {
  return (
    <div className="py-20 px-8 border-t border-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            ESPECIALIDADES
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Blackwork",
              icon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle cx="12" cy="12" r="6" fill="currentColor" />
                  <circle cx="12" cy="12" r="2" fill="black" />
                </svg>
              ),
            },
            {
              name: "Fine Line",
              icon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <g stroke="currentColor" strokeWidth="0.5" fill="none">
                    <path d="M4 8h16M6 12h12M8 16h8" />
                    <circle cx="20" cy="8" r="1" fill="currentColor" />
                    <circle cx="18" cy="12" r="1" fill="currentColor" />
                    <circle cx="16" cy="16" r="1" fill="currentColor" />
                  </g>
                </svg>
              ),
            },
            {
              name: "Oriental",
              icon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path
                    d="M12 3L6 9h12l-6-6zM12 21l6-6H6l6 6z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              ),
            },
          ].map((specialty, index) => (
            <div
              key={specialty.name}
              className="text-center group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-20 h-20 mx-auto mb-4 border border-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] bg-black/20 backdrop-blur-sm text-gray-400 group-hover:text-red-500">
                {specialty.icon}
              </div>
              <h3 className="text-sm tracking-[2px] uppercase font-mono text-gray-400 group-hover:text-red-500 transition-colors">
                {specialty.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
