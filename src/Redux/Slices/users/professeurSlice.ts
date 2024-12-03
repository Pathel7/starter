import { Professeur } from "@/Models/userType";
import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';


  // Adaptateur pour Professeur
  const professeurAdapter = createEntityAdapter<Professeur>();
  
  const initialProfesseurState = professeurAdapter.getInitialState({
    loading: false,
    error: null as string | null,
  });
  
  // Thunks pour Firestore
  export const fetchProfesseurs = createAsyncThunk('professeurs/fetchProfesseurs', async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'professeurs'));
      const professeurs: Professeur[] = [];
      querySnapshot.forEach((doc) => {
        professeurs.push({ id: doc.id, ...doc.data() } as Professeur);
      });
      return professeurs;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  export const addProfesseur = createAsyncThunk(
    'professeurs/addProfesseur',
    async (newProfesseur: Omit<Professeur, 'id'>, thunkAPI) => {
      try {
        // Chiffrer le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newProfesseur.password, salt);
  
        // Remplacer le mot de passe par le mot de passe chiffré
        const professeurWithHashedPassword = { ...newProfesseur, password: hashedPassword };
  
        // Ajouter le professeur à la base de données
        const docRef = await addDoc(collection(db, 'professeurs'), professeurWithHashedPassword);
  
        return { id: docRef.id, ...professeurWithHashedPassword };
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const updateProfesseur = createAsyncThunk('professeurs/updateProfesseur', async (updatedProfesseur: Professeur, thunkAPI) => {
    try {
      const docRef = doc(db, 'professeurs', updatedProfesseur.id);
      await updateDoc(docRef, {
        nom: updatedProfesseur.nom,
        postnom: updatedProfesseur.postnom,
        prenom: updatedProfesseur.prenom,
        ecole_id: updatedProfesseur.ecole_id,
        adresse: updatedProfesseur.adresse,
        email: updatedProfesseur.email,
        password: updatedProfesseur.password,
      });
      return updatedProfesseur;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  export const deleteProfesseur = createAsyncThunk('professeurs/deleteProfesseur', async (id: string, thunkAPI) => {
    try {
      const docRef = doc(db, 'professeurs', id);
      await deleteDoc(docRef);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  // Slice pour Professeur
  const professeurSlice = createSlice({
    name: 'professeurs',
    initialState: initialProfesseurState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProfesseurs.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProfesseurs.fulfilled, (state, action: PayloadAction<Professeur[]>) => {
          state.loading = false;
          professeurAdapter.setAll(state, action.payload);
        })
        .addCase(fetchProfesseurs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(addProfesseur.fulfilled, (state, action: PayloadAction<Professeur>) => {
          professeurAdapter.addOne(state, action.payload);
        })
        .addCase(updateProfesseur.fulfilled, (state, action: PayloadAction<Professeur>) => {
          professeurAdapter.upsertOne(state, action.payload);
        })
        .addCase(deleteProfesseur.fulfilled, (state, action: PayloadAction<string>) => {
          professeurAdapter.removeOne(state, action.payload);
        });
    },
  });
  
  export const professeurSelectors = professeurAdapter.getSelectors((state: RootState) => state.professeurs);
  export default professeurSlice.reducer;
  