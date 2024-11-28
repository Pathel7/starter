import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Cours } from '@/Models/ecoleType';
  
  // Adaptateur pour Cours
  const coursAdapter = createEntityAdapter<Cours>();
  
  const initialCoursState = coursAdapter.getInitialState({
    loading: false,
    error: null as string | null,
  });
  
  // Thunks pour Firestore
  export const fetchCours = createAsyncThunk('cours/fetchCours', async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cours'));
      const cours: Cours[] = [];
      querySnapshot.forEach((doc) => {
        cours.push({ id: doc.id, ...doc.data() } as Cours);
      });
      return cours;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  export const addCours = createAsyncThunk('cours/addCours', async (newCours: Omit<Cours, 'id'>, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, 'cours'), newCours);
      return { id: docRef.id, ...newCours };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  export const updateCours = createAsyncThunk('cours/updateCours', async (updatedCours: Cours, thunkAPI) => {
    try {
      const docRef = doc(db, 'cours', updatedCours.id);
      await updateDoc(docRef, {
        intitule: updatedCours.intitule,
        ponderation: updatedCours.ponderation,
        classe_id: updatedCours.classe_id,
        ecole_id: updatedCours.ecole_id,
        professeur_id: updatedCours.professeur_id,
      });
      return updatedCours;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  export const deleteCours = createAsyncThunk('cours/deleteCours', async (id: string, thunkAPI) => {
    try {
      const docRef = doc(db, 'cours', id);
      await deleteDoc(docRef);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  // Slice pour Cours
  const coursSlice = createSlice({
    name: 'cours',
    initialState: initialCoursState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCours.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchCours.fulfilled, (state, action: PayloadAction<Cours[]>) => {
          state.loading = false;
          coursAdapter.setAll(state, action.payload);
        })
        .addCase(fetchCours.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(addCours.fulfilled, (state, action: PayloadAction<Cours>) => {
          coursAdapter.addOne(state, action.payload);
        })
        .addCase(updateCours.fulfilled, (state, action: PayloadAction<Cours>) => {
          coursAdapter.upsertOne(state, action.payload);
        })
        .addCase(deleteCours.fulfilled, (state, action: PayloadAction<string>) => {
          coursAdapter.removeOne(state, action.payload);
        });
    },
  });
  
  export const coursSelectors = coursAdapter.getSelectors((state: RootState) => state.cours);
  export default coursSlice.reducer;
  