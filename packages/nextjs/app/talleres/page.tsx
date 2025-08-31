"use client";

import Link from "next/link";
import {
  CheckCircleIcon,
  CircleStackIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

interface Workshop {
  id: number;
  name: string;
  country: string;
  city: string;
  addressDetail: string;
  phone: string;
  services: string; // se guarda como un string separado por comas
  rating: number;
  isEnabled: boolean;
  wallet: string; // address
  status: ApprovalStatus;
}

const TalleresPage = () => {
  // Mock data - in a real app, this would come from your smart contract
  const workshopsData: Workshop[] = [
    {
      id: 1,
      name: "Taller Mecánico El Experto",
      country: "Bolivia",
      city: "La Paz",
      addressDetail: "Av. Buenos Aires #1234, Zona Miraflores",
      phone: "+591 2-2445678",
      services: "Mantenimiento General,Frenos,Suspensión,Motor,Transmisión",
      rating: 95,
      isEnabled: true,
      wallet: "0x742d35Cc6634C0532925a3b8D5c9E4b4C4b4b4b4",
      status: ApprovalStatus.APPROVED,
    },
    {
      id: 2,
      name: "AutoServicio Premium",
      country: "Bolivia",
      city: "Santa Cruz",
      addressDetail: "Av. Cristo Redentor #567, 4to Anillo",
      phone: "+591 3-3456789",
      services: "Aire Acondicionado,Sistema Eléctrico,Diagnóstico Computarizado,Pintura",
      rating: 88,
      isEnabled: true,
      wallet: "0x8f3CF7ad23Cd3CaDbD9735AFf958023239c6A063",
      status: ApprovalStatus.APPROVED,
    },
    {
      id: 3,
      name: "Taller Multimarca Altiplano",
      country: "Bolivia",
      city: "El Alto",
      addressDetail: "Av. 6 de Marzo #890, Villa Adela",
      phone: "+591 2-2867890",
      services: "Mecánica General,Soldadura,Enderezado,Cambio de Aceite",
      rating: 72,
      isEnabled: false,
      wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      status: ApprovalStatus.PENDING,
    },
    {
      id: 4,
      name: "Centro Automotriz Cochabamba",
      country: "Bolivia",
      city: "Cochabamba",
      addressDetail: "Av. Ayacucho #2345, Zona Central",
      phone: "+591 4-4234567",
      services: "Inyección Electrónica,Alineación,Balanceado,Sistema de Escape",
      rating: 91,
      isEnabled: true,
      wallet: "0xA0b86a33E6417c5e1C5e0b8a1e6c8b5d4a3c2b1a",
      status: ApprovalStatus.APPROVED,
    },
    {
      id: 5,
      name: "Taller Especializado Tarija",
      country: "Bolivia",
      city: "Tarija",
      addressDetail: "Calle Sucre #456, Barrio San Roque",
      phone: "+591 4-6678901",
      services: "Cajas Automáticas,Dirección Hidráulica,Radiadores",
      rating: 65,
      isEnabled: true,
      wallet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      status: ApprovalStatus.REJECTED,
    },
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-success";
    if (rating >= 80) return "text-info";
    if (rating >= 70) return "text-warning";
    return "text-error";
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 90) return "badge-success";
    if (rating >= 80) return "badge-info";
    if (rating >= 70) return "badge-warning";
    return "badge-error";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="hero bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl mb-6">
            <div className="hero-content text-center py-8">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold text-white mb-2">Talleres Mecánicos</h1>
                <p className="text-xl text-white/90">Directorio de talleres autorizados</p>
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
              <li className="font-semibold text-primary">🔧 Talleres</li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-2xl mb-8 w-full">
          <div className="stat bg-base-100">
            <div className="stat-figure text-primary">
              <WrenchScrewdriverIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Talleres</div>
            <div className="stat-value text-primary">{workshopsData.length}</div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-success">
              <CheckCircleIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Aprobados</div>
            <div className="stat-value text-success">
              {workshopsData.filter(w => w.status === ApprovalStatus.APPROVED).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-warning">
              <ClockIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Pendientes</div>
            <div className="stat-value text-warning">
              {workshopsData.filter(w => w.status === ApprovalStatus.PENDING).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-info">
              <CircleStackIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Activos</div>
            <div className="stat-value text-info">{workshopsData.filter(w => w.isEnabled).length}</div>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {workshopsData.map(workshop => (
            <div
              key={workshop.id}
              className="card bg-base-100 shadow-2xl border border-base-300 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="card-header bg-primary text-primary-content p-4 rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{workshop.name}</h3>
                    <p className="text-sm text-primary-content/80">ID: {workshop.id}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-300" />
                    <span className={`font-bold ${getRatingColor(workshop.rating)}`}>{workshop.rating}%</span>
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
                      <span className="font-medium">País:</span> {workshop.country}
                    </p>
                    <p>
                      <span className="font-medium">Ciudad:</span> {workshop.city}
                    </p>
                    <p>
                      <span className="font-medium">Dirección:</span> {workshop.addressDetail}
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
                      <span className="font-medium">Teléfono:</span> {workshop.phone}
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CogIcon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Servicios</span>
                  </div>
                  <div className="pl-6">
                    <div className="flex flex-wrap gap-1">
                      {workshop.services.split(",").map((service, index) => (
                        <span key={index} className="badge badge-outline badge-sm">
                          {service.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarIcon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Calificación</span>
                  </div>
                  <div className="pl-6">
                    <div className={`badge ${getRatingBadge(workshop.rating)} badge-lg`}>
                      {workshop.rating}% de satisfacción
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
                      {workshop.wallet.slice(0, 6)}...{workshop.wallet.slice(-4)}
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
            href="/talleres/postular"
            className="btn btn-secondary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            ➕ Registrarme como Taller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TalleresPage;
