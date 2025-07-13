import { MapPinned } from "lucide-react";

export function Location() {
  return (
    <div className="py-20 px-8 border-t border-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            LOCALIZAÇÃO
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto mb-8"></div>
        </div>

        <div className="space-y-4 text-gray-400">
          <p className="text-sm tracking-[1px] uppercase font-mono flex justify-center">
            <MapPinned size={19} className="mr-2" />
            Goiânia • Curitiba • São Paulo
          </p>
          <p className="text-sm tracking-[1px] uppercase font-mono">
            Liv Art Studio • Ambiente Seguro
          </p>
        </div>
      </div>
    </div>
  );
}
