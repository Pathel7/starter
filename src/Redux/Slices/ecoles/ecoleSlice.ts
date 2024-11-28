import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; // Remplacez par l'instance Firestore correctement configurée
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Ecole } from '@/Models/ecoleType';

// Création de l'adaptateur
const ecoleAdapter = createEntityAdapter<Ecole>();

// État initial généré par l'adaptateur
const initialState = ecoleAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

// Thunks pour les opérations Firestore

// Fetch all schools
export const fetchEcoles = createAsyncThunk('ecoles/fetchEcoles', async (_, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'ecoles'));
    const ecoles: Ecole[] = [];
    querySnapshot.forEach((doc) => {
      ecoles.push({ id: doc.id, ...doc.data() } as Ecole);
    });
    return ecoles;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add a new school
export const addEcole = createAsyncThunk('ecoles/addEcole', async (newEcole: Omit<Ecole, 'id'>, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, 'ecoles'), newEcole);
    return { id: docRef.id, ...newEcole };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update an existing school
export const updateEcole = createAsyncThunk('ecoles/updateEcole', async (updatedEcole: Ecole, thunkAPI) => {
  try {
    const docRef = doc(db, 'ecoles', updatedEcole.id);
    await updateDoc(docRef, { nom: updatedEcole.nom, adresse: updatedEcole.adresse });
    return updatedEcole;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete a school
export const deleteEcole = createAsyncThunk('ecoles/deleteEcole', async (id: string, thunkAPI) => {
  try {
    const docRef = doc(db, 'ecoles', id);
    await deleteDoc(docRef);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Création du slice
const ecoleSlice = createSlice({
  name: 'ecoles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchEcoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEcoles.fulfilled, (state, action: PayloadAction<Ecole[]>) => {
        state.loading = false;
        ecoleAdapter.setAll(state, action.payload);
      })
      .addCase(fetchEcoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add
      .addCase(addEcole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEcole.fulfilled, (state, action: PayloadAction<Ecole>) => {
        state.loading = false;
        ecoleAdapter.addOne(state, action.payload);
      })
      .addCase(addEcole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateEcole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEcole.fulfilled, (state, action: PayloadAction<Ecole>) => {
        state.loading = false;
        ecoleAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateEcole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteEcole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEcole.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        ecoleAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteEcole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Sélecteurs générés par l'adaptateur
export const ecoleSelectors = ecoleAdapter.getSelectors((state: RootState) => state.ecoles);

// Export du reducer
export default ecoleSlice.reducer;
