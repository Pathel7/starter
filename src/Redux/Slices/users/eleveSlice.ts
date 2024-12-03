import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Eleve } from '@/Models/userType';


// Adaptateur pour Eleve
const eleveAdapter = createEntityAdapter<Eleve>();

const initialEleveState = eleveAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

// Thunks pour Firestore
export const fetchEleves = createAsyncThunk('eleves/fetchEleves', async (_, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'eleves'));
    const eleves: Eleve[] = [];
    querySnapshot.forEach((doc) => {
      eleves.push({ id: doc.id, ...doc.data() } as Eleve);
    });
    return eleves;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addEleve = createAsyncThunk(
  'eleves/addEleve',
  async (newEleve: Omit<Eleve, 'id'>, thunkAPI) => {
    try {
      // Chiffrer le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newEleve.password, salt);

      // Remplacer le mot de passe par le mot de passe chiffré
      const eleveWithHashedPassword = { ...newEleve, password: hashedPassword };

      // Ajouter l'élève à la base de données
      const docRef = await addDoc(collection(db, 'eleves'), eleveWithHashedPassword);

      return { id: docRef.id, ...eleveWithHashedPassword };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateEleve = createAsyncThunk('eleves/updateEleve', async (updatedEleve: Eleve, thunkAPI) => {
  try {
    const docRef = doc(db, 'eleves', updatedEleve.id);
    await updateDoc(docRef, {
      nom: updatedEleve.nom,
      postnom: updatedEleve.postnom,
      prenom: updatedEleve.prenom,
      email: updatedEleve.email,
      adresse: updatedEleve.adresse,
      classe_id: updatedEleve.classe_id,
      ecole_id: updatedEleve.ecole_id,
      password: updatedEleve.password,
    });
    return updatedEleve;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteEleve = createAsyncThunk('eleves/deleteEleve', async (id: string, thunkAPI) => {
  try {
    const docRef = doc(db, 'eleves', id);
    await deleteDoc(docRef);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Slice pour Eleve
const eleveSlice = createSlice({
  name: 'eleves',
  initialState: initialEleveState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEleves.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEleves.fulfilled, (state, action: PayloadAction<Eleve[]>) => {
        state.loading = false;
        eleveAdapter.setAll(state, action.payload);
      })
      .addCase(fetchEleves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addEleve.fulfilled, (state, action: PayloadAction<Eleve>) => {
        eleveAdapter.addOne(state, action.payload);
      })
      .addCase(updateEleve.fulfilled, (state, action: PayloadAction<Eleve>) => {
        eleveAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteEleve.fulfilled, (state, action: PayloadAction<string>) => {
        eleveAdapter.removeOne(state, action.payload);
      });
  },
});

export const eleveSelectors = eleveAdapter.getSelectors((state: RootState) => state.eleves);
export default eleveSlice.reducer;
