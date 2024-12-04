import { User } from "@/Models/userType";
import { addUser } from "@/Redux/Slices/users/userSlice";
import { AppDispatch } from "@/Redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    nom: "",
    postnom: "",
    prenom: "",
    numero: "",
    email: "",
    adresse: "",
    password: "",
    ecole_id: "",
    role: "admin",
    firstConnection : false
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {    
    e.preventDefault();
    const resultAction = dispatch(addUser(formData));
    console.log('hello, here formData=>',formData)
    console.log("user created", resultAction);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
   <form
  onSubmit={handleSubmit}
  className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-4"
>
  <h1 className="text-2xl font-semibold text-gray-700 text-center">
    Créer un compte utilisateur
  </h1>

  {/* Ligne 1: Nom, Postnom et Prénom */}
  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
    <div className="flex-1">
      <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
        Nom
      </label>
      <input
        type="text"
        id="nom"
        name="nom"
        value={formData.nom}
        onChange={handleInputChange}
        placeholder=" nom"
        className="mt-1 h-[36px] p-2 w-full border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="flex-1">
      <label htmlFor="postnom" className="block text-sm font-medium text-gray-700">
        Postnom
      </label>
      <input
        type="text"
        id="postnom"
        name="postnom"
        value={formData.postnom}
        onChange={handleInputChange}
        placeholder=" postnom"
        className="mt-1 p-2 h-[36px] w-full border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="flex-1">
      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
        Prénom
      </label>
      <input
        type="text"
        id="prenom"
        name="prenom"
        value={formData.prenom}
        onChange={handleInputChange}
        placeholder=" prénom"
        className="mt-1 p-2  h-[36px] w-full border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  {/* Ligne 2: Numéro et Email */}
  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
    <div className="flex-1">
      <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
        Numéro
      </label>
      <input
        type="text"
        id="numero"
        name="numero"
        value={formData.numero}
        onChange={handleInputChange}
        placeholder=" numéro de téléphone"
        className="mt-1 p-2 h-[36px] w-full border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="flex-1">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder=" adresse email"
        className="mt-1 p-2 h-[36px] w-full border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  {/* Ligne 3: Adresse */}
  <div>
    <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
      Adresse
    </label>
    <input
      type="text"
      id="adresse"
      name="adresse"
      value={formData.adresse}
      onChange={handleInputChange}
      placeholder=" adresse"
      className="mt-1 h-[36px] w-full p-2 border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Ligne 4: École ID et Rôle */}
  <div className="flex-1">
    <label htmlFor="ecole_id" className="block text-sm font-medium text-gray-700">
      École (ID)
    </label>
    <select
      id="ecole_id"
      name="ecole_id"
      value={formData.ecole_id}
      onChange={handleInputChange}
      className="mt-1 h-[36px] w-full pl-2 border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Sélectionnez une école</option>
      <option value="thabiti">Thabiti</option>
      <option value="bobocolu">Bobocolu</option>
      <option value="saint-sacrement">Saint-Sacrement</option>
    </select>
  </div>
  {/* Ligne 5: Mot de passe */}
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
      Mot de passe
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      placeholder=" mot de passe"
      className="mt-1 p-2 h-[36px] w-full border-2 border-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Bouton de soumission */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Créer un compte
  </button>
</form>


    </div>
  );
};

export default Register;
