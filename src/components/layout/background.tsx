import { FloatingParticles } from "../ui/floating-particles";

export function Background() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern animate-grid-move" />
      <div className="absolute inset-0 opacity-[0.05] bg-noise animate-noise-move" />

      {/* Enhanced Tribal Patterns */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="tribal"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,10 Q5,0 10,10 Q15,20 20,10"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-red-900/20"
              />
              <circle
                cx="10"
                cy="10"
                r="1"
                fill="currentColor"
                className="text-red-900/10"
              />
              <path
                d="M5,5 L15,15 M15,5 L5,15"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-red-900/15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tribal)" />
        </svg>
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Cyber Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse delay-1000" />
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent animate-pulse delay-500" />
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent animate-pulse delay-1500" />
      </div>
    </div>
  );
}
