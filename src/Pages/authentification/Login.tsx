import { TYPE_ADMIN, TYPE_ELEVE, TYPE_PARENT, TYPE_PROFESSEUR } from "@/utils/constants";
import React, { useState } from "react";

interface FormData {
  typeUser: string;
  numero: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    typeUser: "",
    numero: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connection</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type d'utilisateur */}
          <div>
            <label htmlFor="typeUser" className="block text-sm font-medium text-gray-700">
              Type d'utilisateur
            </label>
            <select
              id="typeUser"
              name="typeUser"
              value={formData.typeUser}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionnez</option>
              <option value={TYPE_ADMIN}>{TYPE_ADMIN}</option>
              <option value={TYPE_ADMIN}>{TYPE_PROFESSEUR}</option>
              <option value={TYPE_ADMIN}>{TYPE_PARENT}</option>
              <option value={TYPE_ADMIN}>{TYPE_ELEVE}</option>
             
            </select>
          </div>

          {/* Numéro */}
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
              Numéro
            </label>
            <input
              id="numero"
              name="numero"
              type="text"
              value={formData.numero}
              onChange={handleInputChange}
              placeholder="Entrez votre numéro"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Entrez votre mot de passe"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
