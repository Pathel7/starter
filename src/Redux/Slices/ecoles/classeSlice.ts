import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Interface pour Classe
export interface Classe {
  id: string;
  promotion: string;
  section: string;
  ecole_id: string;
}

// Adaptateur pour Classe
const classeAdapter = createEntityAdapter<Classe>();

const initialClasseState = classeAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

// Thunks pour Firestore
export const fetchClasses = createAsyncThunk('classes/fetchClasses', async (_, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'classes'));
    const classes: Classe[] = [];
    querySnapshot.forEach((doc) => {
      classes.push({ id: doc.id, ...doc.data() } as Classe);
    });
    return classes;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addClasse = createAsyncThunk('classes/addClasse', async (newClasse: Omit<Classe, 'id'>, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, 'classes'), newClasse);
    return { id: docRef.id, ...newClasse };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateClasse = createAsyncThunk('classes/updateClasse', async (updatedClasse: Classe, thunkAPI) => {
  try {
    const docRef = doc(db, 'classes', updatedClasse.id);
    await updateDoc(docRef, { promotion: updatedClasse.promotion, section: updatedClasse.section, ecole_id: updatedClasse.ecole_id });
    return updatedClasse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteClasse = createAsyncThunk('classes/deleteClasse', async (id: string, thunkAPI) => {
  try {
    const docRef = doc(db, 'classes', id);
    await deleteDoc(docRef);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Slice pour Classe
const classeSlice = createSlice({
  name: 'classes',
  initialState: initialClasseState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<Classe[]>) => {
        state.loading = false;
        classeAdapter.setAll(state, action.payload);
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addClasse.fulfilled, (state, action: PayloadAction<Classe>) => {
        classeAdapter.addOne(state, action.payload);
      })
      .addCase(updateClasse.fulfilled, (state, action: PayloadAction<Classe>) => {
        classeAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteClasse.fulfilled, (state, action: PayloadAction<string>) => {
        classeAdapter.removeOne(state, action.payload);
      });
  },
});

export const classeSelectors = classeAdapter.getSelectors((state: RootState) => state.classes);
export default classeSlice.reducer;
