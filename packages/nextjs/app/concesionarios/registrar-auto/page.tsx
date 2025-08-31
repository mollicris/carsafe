"use client";

import { FormEventHandler, useState } from "react";
import FieldSet from "~~/components/concessionaire/FieldSet";
import YearInput from "~~/components/concessionaire/YearInput";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface FormData {
  id: bigint;
  isEnabled: boolean;
  plate: string;
  model: string;
  brand: string;
  vin: string;
  year: bigint;
  mileage: bigint;
  currentOwner: string;
  isSold: boolean;
  contact: string;
  price: bigint;
  fixes: Fix[];
}

interface Fix {
  id: bigint;
  workshopId: bigint;
  description: string;
  date: bigint;
  cost: bigint;
}

const Page = () => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  const [formData, setFormData] = useState<FormData>({
    id: BigInt(0),
    isEnabled: true,
    plate: "",
    model: "",
    brand: "",
    vin: "",
    year: BigInt(0),
    mileage: BigInt(0),
    currentOwner: "0x0000000000000000000000000000000000000000",
    isSold: false,
    contact: "",
    price: BigInt(0),
    fixes: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      await writeYourContractAsync({
        functionName: "registerVehicle",
        args: [formData],
      });
    } catch (e) {
      console.error("Error buying image:", e);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Registro Vehículo</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna Izquierda */}
              <div className="space-y-4">
                <FieldSet
                  legend="Placa"
                  type="text"
                  placeholder="Ingresar numero de placa"
                  required={true}
                  name="plate"
                  value={formData.plate}
                  onChange={handleChange}
                />
                <FieldSet
                  legend="Bin"
                  type="text"
                  placeholder="Ingresar Bin"
                  required={true}
                  name="vin"
                  value={formData.vin}
                  onChange={handleChange}
                />
                <FieldSet
                  legend="Modelo"
                  type="text"
                  placeholder="Ingresar modelo"
                  required={true}
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
              {/* Columna Derecha */}
              <div className="space-y-4">
                <YearInput
                  legend="Año de fabricación"
                  value={Number(formData.year)}
                  onChange={year => setFormData({ ...formData, year: BigInt(year) })}
                  label="Año de fabricación"
                  minYear={2000}
                  maxYear={new Date().getFullYear()}
                  required
                />
                <FieldSet
                  legend="Kilometraje"
                  type="text"
                  placeholder="Ingresar kilometraje"
                  required={true}
                  name="mileage"
                  value={formData.mileage.toString()}
                  onChange={handleChange}
                />
                <FieldSet
                  legend="Marca"
                  type="text"
                  placeholder="Ingresar Marca"
                  required={true}
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button type="submit" className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
