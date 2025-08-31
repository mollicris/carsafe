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
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

interface Workshop {
  id: bigint;
  name: string;
  country: string;
  city: string;
  addressDetail: string;
  phone: string;
  services: string; // se guarda como un string separado por comas
  rating: bigint;
  isEnabled: boolean;
  wallet: string; // address
  status: ApprovalStatus;
}

const TalleresPage = () => {
  const { data } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getWorkshops",
  });
  const workshopsData = data as Workshop[] | undefined;

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
            <div className="stat-value text-primary">{workshopsData?.length ?? 0}</div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-success">
              <CheckCircleIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Aprobados</div>
            <div className="stat-value text-success">
              {workshopsData?.filter(w => w.status === ApprovalStatus.APPROVED).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-warning">
              <ClockIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Pendientes</div>
            <div className="stat-value text-warning">
              {workshopsData?.filter(w => w.status === ApprovalStatus.PENDING).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-info">
              <CircleStackIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Activos</div>
            <div className="stat-value text-info">{workshopsData?.filter(w => w.isEnabled).length}</div>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {workshopsData?.map(workshop => (
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
                    <span className={`font-bold ${getRatingColor(Number(workshop.rating))}`}>{workshop.rating}%</span>
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
                    <div className={`badge ${getRatingBadge(Number(workshop.rating))} badge-lg`}>
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
