"use client";

import Link from "next/link";
import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ClockIcon,
  CreditCardIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

interface Concessionaire {
  id: number;
  name: string;
  country: string;
  city: string;
  addressDetail: string;
  phone: string;
  email: string;
  nit: string;
  certifications: string; // se guarda como un string separado por comas
  isEnabled: boolean;
  wallet: string; // address
  status: ApprovalStatus;
}

const ConcesionariosPage = () => {
  // Mock data - in a real app, this would come from your smart contract
  const concessionairesData: Concessionaire[] = [
    {
      id: 1,
      name: "AutoMax Bolivia",
      country: "Bolivia",
      city: "La Paz",
      addressDetail: "Av. 6 de Agosto #2547, Zona San Jorge",
      phone: "+591 2-2441234",
      email: "ventas@automax.bo",
      nit: "1023456789012",
      certifications: "ISO 9001,Certificación Toyota,Servicio Autorizado Hyundai",
      isEnabled: true,
      wallet: "0x742d35Cc6634C0532925a3b8D5c9E4b4C4b4b4b4",
      status: ApprovalStatus.APPROVED,
    },
    {
      id: 2,
      name: "Concesionario Premium Motors",
      country: "Bolivia",
      city: "Santa Cruz",
      addressDetail: "Av. Banzer Km 9, Zona Norte",
      phone: "+591 3-3567890",
      email: "info@premiummotors.bo",
      nit: "2034567890123",
      certifications: "Certificación BMW,Mercedes-Benz Autorizado,ISO 14001",
      isEnabled: true,
      wallet: "0x8f3CF7ad23Cd3CaDbD9735AFf958023239c6A063",
      status: ApprovalStatus.APPROVED,
    },
    {
      id: 3,
      name: "Vehículos del Altiplano",
      country: "Bolivia",
      city: "El Alto",
      addressDetail: "Av. Juan Pablo II #1234, Ciudad Satélite",
      phone: "+591 2-2834567",
      email: "contacto@altiplano.bo",
      nit: "3045678901234",
      certifications: "Servicio Suzuki,Certificación Nissan",
      isEnabled: false,
      wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      status: ApprovalStatus.PENDING,
    },
    {
      id: 4,
      name: "AutoSur Cochabamba",
      country: "Bolivia",
      city: "Cochabamba",
      addressDetail: "Av. Blanco Galindo Km 6.5, Quillacollo",
      phone: "+591 4-4123456",
      email: "ventas@autosur.bo",
      nit: "4056789012345",
      certifications: "Ford Autorizado,Chevrolet Service,ISO 9001",
      isEnabled: true,
      wallet: "0xA0b86a33E6417c5e1C5e0b8a1e6c8b5d4a3c2b1a",
      status: ApprovalStatus.APPROVED,
    },
    {
      id: 5,
      name: "Importadora Andina",
      country: "Bolivia",
      city: "Tarija",
      addressDetail: "Av. Las Américas #890, Barrio San Luis",
      phone: "+591 4-6789012",
      email: "info@andina.bo",
      nit: "5067890123456",
      certifications: "Importador Oficial Kia,Servicio Mazda",
      isEnabled: true,
      wallet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      status: ApprovalStatus.REJECTED,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="hero bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl mb-6">
            <div className="hero-content text-center py-8">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold text-white mb-2">Concesionarios</h1>
                <p className="text-xl text-white/90">Directorio de concesionarios autorizados</p>
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
              <li className="font-semibold text-primary">🏢 Concesionarios</li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-2xl mb-8 w-full">
          <div className="stat bg-base-100">
            <div className="stat-figure text-primary">
              <BuildingOfficeIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Concesionarios</div>
            <div className="stat-value text-primary">{concessionairesData.length}</div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-success">
              <CheckCircleIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Aprobados</div>
            <div className="stat-value text-success">
              {concessionairesData.filter(c => c.status === ApprovalStatus.APPROVED).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-warning">
              <ClockIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Pendientes</div>
            <div className="stat-value text-warning">
              {concessionairesData.filter(c => c.status === ApprovalStatus.PENDING).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-info">
              <CircleStackIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Activos</div>
            <div className="stat-value text-info">{concessionairesData.filter(c => c.isEnabled).length}</div>
          </div>
        </div>

        {/* Concessionaires Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {concessionairesData.map(concessionaire => (
            <div
              key={concessionaire.id}
              className="card bg-base-100 shadow-2xl border border-base-300 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="card-header bg-primary text-primary-content p-4 rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{concessionaire.name}</h3>
                    <p className="text-sm text-primary-content/80">ID: {concessionaire.id}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body p-6">
                {/* Location */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Ubicación</span>
                  </div>
                  <div className="pl-6 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">País:</span> {concessionaire.country}
                    </p>
                    <p>
                      <span className="font-medium">Ciudad:</span> {concessionaire.city}
                    </p>
                    <p>
                      <span className="font-medium">Dirección:</span> {concessionaire.addressDetail}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Contacto</span>
                  </div>
                  <div className="pl-6 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Teléfono:</span> {concessionaire.phone}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {concessionaire.email}
                    </p>
                    <p>
                      <span className="font-medium">NIT:</span> {concessionaire.nit}
                    </p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheckIcon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Certificaciones</span>
                  </div>
                  <div className="pl-6">
                    <div className="flex flex-wrap gap-1">
                      {concessionaire.certifications.split(",").map((cert, index) => (
                        <span key={index} className="badge badge-outline badge-sm">
                          {cert.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Wallet */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCardIcon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Wallet</span>
                  </div>
                  <div className="pl-6">
                    <code className="text-xs bg-base-200 p-2 rounded block">
                      {concessionaire.wallet.slice(0, 6)}...{concessionaire.wallet.slice(-4)}
                    </code>
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">Contactar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Link
            href="/concesionarios/postular"
            className="btn btn-secondary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            ➕ Registrarme como Concesionario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConcesionariosPage;
