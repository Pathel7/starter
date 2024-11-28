import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Parent } from '@/Models/userType';


// Adaptateur pour Parent
const parentAdapter = createEntityAdapter<Parent>();

const initialParentState = parentAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

// Thunks pour Firestore
export const fetchParents = createAsyncThunk('parents/fetchParents', async (_, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'parents'));
    const parents: Parent[] = [];
    querySnapshot.forEach((doc) => {
      parents.push({ id: doc.id, ...doc.data() } as Parent);
    });
    return parents;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addParent = createAsyncThunk('parents/addParent', async (newParent: Omit<Parent, 'id'>, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, 'parents'), newParent);
    return { id: docRef.id, ...newParent };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateParent = createAsyncThunk('parents/updateParent', async (updatedParent: Parent, thunkAPI) => {
  try {
    const docRef = doc(db, 'parents', updatedParent.id);
    await updateDoc(docRef, {
      nom: updatedParent.nom,
      postnom: updatedParent.postnom,
      prenom: updatedParent.prenom,
      numero: updatedParent.numero,
      email: updatedParent.email,
      adresse: updatedParent.adresse,
      password: updatedParent.password,
      ecole_id: updatedParent.ecole_id,
    });
    return updatedParent;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteParent = createAsyncThunk('parents/deleteParent', async (id: string, thunkAPI) => {
  try {
    const docRef = doc(db, 'parents', id);
    await deleteDoc(docRef);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Slice pour Parent
const parentSlice = createSlice({
  name: 'parents',
  initialState: initialParentState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParents.fulfilled, (state, action: PayloadAction<Parent[]>) => {
        state.loading = false;
        parentAdapter.setAll(state, action.payload);
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addParent.fulfilled, (state, action: PayloadAction<Parent>) => {
        parentAdapter.addOne(state, action.payload);
      })
      .addCase(updateParent.fulfilled, (state, action: PayloadAction<Parent>) => {
        parentAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteParent.fulfilled, (state, action: PayloadAction<string>) => {
        parentAdapter.removeOne(state, action.payload);
      });
  },
});

export const parentSelectors = parentAdapter.getSelectors((state: RootState) => state.parents);
export default parentSlice.reducer;
