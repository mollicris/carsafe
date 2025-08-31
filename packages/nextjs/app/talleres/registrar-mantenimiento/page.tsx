"use client";

import { FormEventHandler, useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface FormData {
  id: bigint;
  name: string;
  country: string;
  city: string;
  addressDetail: string;
  phone: string;
  services: string;
  rating: bigint;
  isEnabled: boolean;
  wallet: string;
  status: ApprovalStatus;
}
enum ApprovalStatus {
  PENDING,
  APPROVED,
  REJECTED,
}

const Page = () => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({
    contractName: "YourContract",
  });
  const [formData, setFormData] = useState<FormData>({
    id: BigInt(0),
    name: "",
    country: "",
    city: "",
    addressDetail: "",
    phone: "",
    services: "",
    rating: BigInt(0),
    isEnabled: false,
    wallet: "0x0000000000000000000000000000000000000000",
    status: ApprovalStatus.PENDING,
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      await writeYourContractAsync({
        functionName: "registerWorkshop",
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
          <h2 className="card-title text-2xl mb-6">Registro Mantenimiento</h2>
          {/* El fomulario debe estar al centro en una sola columna */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="form-control w-full">
                <legend className="fieldset-legend">Tipo de Mantenimiento</legend>
                <select
                  className="select select-bordered w-full"
                  value={Number(formData.id)}
                  onChange={e => setFormData({ ...formData, id: BigInt(parseInt(e.target.value)) })}
                >
                  <option value={0}>Seleccione un tipo</option>
                  <option value={1}>Preventivo</option>
                  <option value={2}>Correctivo</option>
                  <option value={3}>Otro</option>
                </select>
              </div>
              <div className="form-control w-full">
                <legend className="fieldset-legend">Tipo de Mantenimiento</legend>
                <textarea
                  className="textarea-bordered w-full rounded-md"
                  rows={4}
                  placeholder="Describa el problema mecánico"
                  value={formData.services}
                  onChange={e => setFormData({ ...formData, services: e.target.value })}
                  required
                  style={{
                    borderRadius: "4px",
                    minHeight: "150px",
                  }}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button type="submit" className="btn btn-primary px-6 py-2 text-lg font-semibold">
                Enviar Reporte
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
