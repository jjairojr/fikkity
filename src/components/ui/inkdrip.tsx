export function InkDrip({ delay = 0 }) {
  return (
    <div
      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 to-transparent opacity-60"
      style={{
        height: "100px",
        animation: `inkDrip 3s ease-out ${delay}s infinite`,
        animationFillMode: "both",
      }}
    >
      <div className="absolute bottom-0 w-3 h-3 bg-red-500 rounded-full transform translate-x-[-50%] animate-pulse" />
    </div>
  );
}
