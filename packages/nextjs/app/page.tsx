"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { ClockIcon, DocumentTextIcon, MagnifyingGlassIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const [licensePlate, setLicensePlate] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    // TODO: verify that plate exists
    router.push(`/vehiculos/${licensePlate}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-4xl">
            <h1 className="mb-5 text-6xl font-bold">CarSafe</h1>
            <p className="mb-8 text-xl">
              Transparencia total en cada kilómetro. Verifica el historial completo de cualquier vehículo con tecnología
              blockchain inmutable.
            </p>

            {/* License Plate Search */}
            {/* <div className="max-w-md mx-auto mb-8"> */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-primary-content/90 mb-2">
                  Consulta el historial de cualquier vehículo
                </h2>
              </div>
              <div className="join w-full shadow-lg">
                <input
                  type="text"
                  placeholder="Ingresa la placa (Ej: ABC-123)"
                  className="input input-bordered input-lg join-item flex-1 bg-white/95 text-gray-800 placeholder-gray-500 border-white/20 focus:border-white focus:bg-white"
                  value={licensePlate}
                  onChange={e => setLicensePlate(e.target.value.toUpperCase())}
                />
                <button
                  className="btn btn-accent btn-lg join-item px-8 text-white font-semibold hover:scale-105 transition-transform"
                  onClick={handleSearch}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">¿Por qué CarSafe?</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              La primera plataforma que conecta concesionarios, talleres y propietarios en un ecosistema transparente de
              confianza vehicular
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <ClockIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="card-title justify-center mb-2">Historial Completo</h3>
                <p>
                  Accede al historial completo de cualquier vehículo desde su compra inicial, incluyendo todas las
                  revisiones y mantenimientos realizados.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <ShieldCheckIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="card-title justify-center mb-2">Talleres Certificados</h3>
                <p>
                  Solo talleres autorizados y certificados pueden subir reportes de revisión, garantizando la veracidad
                  de la información.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <DocumentTextIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="card-title justify-center mb-2">Reportes Inmutables</h3>
                <p>
                  Todos los reportes quedan registrados permanentemente en blockchain, creando un registro inmutable y
                  transparente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
            <p className="text-lg text-base-content/70 max-w-xl mx-auto mb-12">
              Proceso simple y transparente en tres pasos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="steps steps-vertical lg:steps-horizontal w-full">
              <div className="step step-primary">
                <div className="lg:text-center">
                  <h3 className="font-bold text-xl mb-2">Busca por Placa</h3>
                  <p className="text-base-content/70">Ingresa el número de placa del vehículo que quieres consultar</p>
                </div>
              </div>
              <div className="step step-primary">
                <div className="lg:text-center">
                  <h3 className="font-bold text-xl mb-2">Consulta el Historial</h3>
                  <p className="text-base-content/70">Ve todos los reportes de mantenimiento y revisiones realizadas</p>
                </div>
              </div>
              <div className="step step-primary">
                <div className="lg:text-center">
                  <h3 className="font-bold text-xl mb-2">Verifica la Información</h3>
                  <p className="text-base-content/70">Toda la información está verificada por talleres certificados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Sections */}
      <div className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Únete al Ecosistema CarSafe</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Forma parte de la red de confianza vehicular más transparente
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Talleres */}
            <div className="card bg-base-100 text-base-content shadow-2xl">
              <div className="card-body text-center p-8">
                <div className="bg-secondary text-secondary-content rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8" />
                </div>
                <h3 className="card-title text-2xl justify-center mb-4">¿Eres un Taller Autorizado?</h3>
                <p className="text-base-content/70 mb-6">
                  Únete a nuestra red de talleres certificados y ayuda a crear el registro más confiable de historiales
                  vehiculares.
                </p>
                <Link href="/talleres" className="btn btn-secondary btn-lg">
                  Ver todos los Talleres
                </Link>
                <Link href="#" className="btn btn-secondary btn-lg btn-outline mt-2">
                  Registrarme como Taller
                </Link>
              </div>
            </div>

            {/* Concesionarios */}
            <div className="card bg-base-100 text-base-content shadow-2xl">
              <div className="card-body text-center p-8">
                <div className="bg-accent text-accent-content rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="h-8 w-8" />
                </div>
                <h3 className="card-title text-2xl justify-center mb-4">¿Eres un Concesionario?</h3>
                <p className="text-base-content/70 mb-6">
                  Registra nuevos vehículos en la blockchain desde el momento de la venta y ofrece transparencia total a
                  tus clientes.
                </p>
                <Link href="#" className="btn btn-accent btn-lg">
                  Ver todos los Concesionarios
                </Link>
                <Link href="#" className="btn btn-accent btn-lg btn-outline mt-2">
                  Registrarme como Concesionario
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
