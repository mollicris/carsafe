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
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

enum ApprovalStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

interface Concessionaire {
  id: bigint;
  name: string;
  country: string;
  city: string;
  addressDetail: string;
  phone: string;
  email: string;
  nit: string;
  certifications: string;
  isEnabled: boolean;
  wallet: string;
  status: ApprovalStatus;
}

const ConcesionariosPage = () => {
  // Read concessionaires from smart contract
  const {
    data: concessionairesData,
    isLoading,
    error,
  } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getConcessionaires",
  });

  // Convert the contract data to our interface format
  const concessionaires: Concessionaire[] = concessionairesData
    ? concessionairesData.map((c: any) => ({
        id: c.id,
        name: c.name,
        country: c.country,
        city: c.city,
        addressDetail: c.addressDetail,
        phone: c.phone,
        email: c.email,
        nit: c.nit,
        certifications: c.certifications,
        isEnabled: c.isEnabled,
        wallet: c.wallet,
        status: c.status,
      }))
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Cargando concesionarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>Error al cargar los concesionarios: {error.message}</span>
        </div>
      </div>
    );
  }

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
            <div className="stat-value text-primary">{concessionaires.length}</div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-success">
              <CheckCircleIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Aprobados</div>
            <div className="stat-value text-success">
              {concessionaires.filter(c => c.status === ApprovalStatus.APPROVED).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-warning">
              <ClockIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Pendientes</div>
            <div className="stat-value text-warning">
              {concessionaires.filter(c => c.status === ApprovalStatus.PENDING).length}
            </div>
          </div>

          <div className="stat bg-base-100">
            <div className="stat-figure text-info">
              <CircleStackIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Activos</div>
            <div className="stat-value text-info">{concessionaires.filter(c => c.isEnabled).length}</div>
          </div>
        </div>

        {/* Concessionaires Grid */}
        {concessionaires.length === 0 ? (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="h-24 w-24 text-base-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-base-content mb-2">No hay concesionarios registrados</h3>
            <p className="text-base-content/70 mb-6">Sé el primero en registrarte como concesionario</p>
            <Link href="/concesionarios/postular" className="btn btn-primary btn-lg">
              ➕ Registrarme como Concesionario
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {concessionaires.map(concessionaire => (
              <div
                key={concessionaire.id.toString()}
                className="card bg-base-100 shadow-2xl border border-base-300 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="card-header bg-primary text-primary-content p-4 rounded-t-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{concessionaire.name}</h3>
                      <p className="text-sm text-primary-content/80">ID: {concessionaire.id.toString()}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {concessionaire.status === ApprovalStatus.APPROVED && (
                        <div className="badge badge-success badge-sm">Aprobado</div>
                      )}
                      {concessionaire.status === ApprovalStatus.PENDING && (
                        <div className="badge badge-warning badge-sm">Pendiente</div>
                      )}
                      {concessionaire.status === ApprovalStatus.REJECTED && (
                        <div className="badge badge-error badge-sm">Rechazado</div>
                      )}
                      {concessionaire.isEnabled && <div className="badge badge-info badge-sm">Activo</div>}
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
                  {concessionaire.certifications && (
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
                  )}

                  {/* Wallet */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCardIcon className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">Wallet</span>
                    </div>
                    <div className="pl-6">
                      <Address address={concessionaire.wallet} />
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
        )}

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
