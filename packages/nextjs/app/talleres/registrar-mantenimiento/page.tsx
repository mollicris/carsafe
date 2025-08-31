'use client';
import {useState,FormEventHandler} from 'react'

interface FormData {
  tipo: number;
  descripcion: string;
}

const page = () => {
 const [formData, setFormData] = useState<FormData>({
        tipo: 0,
        descripcion: ''
    });
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Aquí puedes enviar los datos a tu API
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
                        value={formData.tipo}
                        onChange={(e) => setFormData({...formData, tipo: parseInt(e.target.value)})}
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
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        required
                        style={{
                          borderRadius: '4px',
                           minHeight: '150px'
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
  )
}

export default page