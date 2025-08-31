"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const VehiculoPage = () => {
  const params = useParams();
  const plate = params.plate as string;

  // Fetch vehicle data from smart contract
  const {
    data: vehicleData,
    isLoading,
    error,
  } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getCarByplate",
    args: [plate],
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-lg text-base-content">Cargando información del vehículo...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !vehicleData || !vehicleData.isEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗❌</div>
          <h1 className="text-2xl font-bold text-error mb-4">Vehículo no encontrado</h1>
          <p className="text-base-content mb-6">
            No se encontró información para la placa: <strong>{plate?.toUpperCase()}</strong>
          </p>
          <Link href="/" className="btn btn-primary">
            🏠 Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="hero bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl mb-6">
            <div className="hero-content text-center py-8">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold text-white mb-2">Información del Vehículo</h1>
                <p className="text-xl text-white/90 font-semibold">{vehicleData.plate}</p>
              </div>
            </div>
          </div>
          <div className="breadcrumbs text-sm bg-base-100 rounded-lg p-3 shadow-md">
            <ul>
              <li>
                <Link href="/" className="text-primary hover:text-primary-focus transition-colors">
                  🏠 Inicio
                </Link>
              </li>
              <li className="text-base-content/70">🚗 Vehículos</li>
              <li className="font-semibold text-primary">{vehicleData.plate}</li>
            </ul>
          </div>
        </div>

        {/* Datos de Identificación del Vehículo */}
        <div className="card bg-base-100 shadow-2xl mb-8 border border-primary/20">
          <div className="card-header bg-primary text-primary-content p-6 rounded-t-2xl">
            <h2 className="text-2xl font-bold flex items-center gap-3">📋 DATOS IDENTIFICACIÓN VEHÍCULO</h2>
          </div>
          <div className="card-body p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <IdentificationCard label="PLACA" value={vehicleData.plate} />
              <IdentificationCard label="VIN" value={vehicleData.vin} />
            </div>
          </div>
        </div>

        {/* Datos del Vehículo */}
        <div className="card bg-base-100 shadow-2xl mb-8 border border-primary/20">
          <div className="card-header bg-primary text-primary-content p-6 rounded-t-2xl">
            <h2 className="text-2xl font-bold flex items-center gap-3">🚗 DATOS DEL VEHÍCULO</h2>
          </div>
          <div className="card-body p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TechnicalDataItem icon="🚗" label="Marca" value={vehicleData.brand} />
                <TechnicalDataItem icon="📅" label="Modelo" value={vehicleData.model} />
                <TechnicalDataItem icon="🗓️" label="Año" value={Number(vehicleData.year)} />
                <TechnicalDataItem
                  icon="🛣️"
                  label="Kilometraje"
                  value={`${Number(vehicleData.mileage).toLocaleString()} km`}
                />
              </div>
              <div className="space-y-6">
                <TechnicalDataItem
                  icon="💰"
                  label="Precio"
                  value={`Bs. ${Number(vehicleData.price).toLocaleString()}`}
                />
                <TechnicalDataItem icon="📞" label="Contacto" value={vehicleData.contact} />
                <TechnicalDataItem icon="📊" label="Estado" value={vehicleData.isSold ? "Vendido" : "Disponible"} />
                <TechnicalDataItem
                  icon="👤"
                  label="Propietario"
                  value={`${vehicleData.currentOwner.slice(0, 6)}...${vehicleData.currentOwner.slice(-4)}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Historial de Mantenimiento */}
        <div className="card bg-base-100 shadow-2xl mb-8 border border-primary/20">
          <div className="card-header bg-secondary text-secondary-content p-6 rounded-t-2xl">
            <h2 className="text-2xl font-bold flex items-center gap-3">🔧 HISTORIAL DE MANTENIMIENTO</h2>
          </div>
          <div className="card-body p-8">
            {vehicleData.fixes.length > 0 ? (
              <div className="space-y-4">
                {vehicleData.fixes.map(fix => (
                  <div
                    key={fix.id}
                    className="bg-base-200 p-6 rounded-xl border border-base-300 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-primary mb-2">Reparación #{Number(fix.id)}</h3>
                        <p className="text-base-content mb-2">{fix.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                          <span className="flex items-center gap-1">🏪 Taller ID: {Number(fix.workshopId)}</span>
                          <span className="flex items-center gap-1">
                            📅 {new Date(Number(fix.date) * 1000).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">Bs. {Number(fix.cost).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <div className="text-center">
                    <div className="text-sm font-medium text-accent mb-1">Costo Total de Mantenimiento</div>
                    <div className="text-3xl font-bold text-accent">
                      Bs. {vehicleData.fixes.reduce((total, fix) => total + Number(fix.cost), 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-base-content/50">
                <div className="text-6xl mb-4">🔧</div>
                <p className="text-lg">No hay registros de mantenimiento disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button className="btn btn-secondary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            ➕ Agregar Reporte
          </button>
          <button className="btn btn-accent btn-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            🖨️ Imprimir Información
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehiculoPage;

const IdentificationCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
    <div className="text-center">
      <div className="text-sm font-medium text-primary mb-2">{label}</div>
      <div className="text-2xl font-bold text-primary">{value}</div>
    </div>
  </div>
);

const TechnicalDataItem = ({ icon, label, value }: { icon: string; label: string; value: string | number }) => (
  <div className="bg-base-200 p-4 rounded-xl hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-center">
      <span className="font-semibold text-base-content/70 flex items-center gap-2">
        {icon} {label}
      </span>
      <span className="font-bold text-lg light:text-gray-800">{value}</span>
    </div>
  </div>
);
