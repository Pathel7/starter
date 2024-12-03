import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { User } from '@/Models/userType';
import bcrypt from 'bcryptjs';
  // Adaptateur pour User
  const userAdapter = createEntityAdapter<User>();
  
  const initialUserState = userAdapter.getInitialState({
    loading: false,
    error: null as string | null,
  });
  
  // Thunks pour Firestore
  export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as User);
      });
      return users;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  export const addUser = createAsyncThunk(
    'users/addUser',
    async (newUser: Omit<User, 'id'>, thunkAPI) => {
      try {
        // Chiffrer le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
  
        // Remplacer le mot de passe par le mot de passe chiffré
        const userWithHashedPassword = { ...newUser, password: hashedPassword };
  
        // Ajouter l'utilisateur à la base de données
        const docRef = await addDoc(collection(db, 'users'), userWithHashedPassword);
  
        return { id: docRef.id, ...userWithHashedPassword };
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser: User, thunkAPI) => {
    try {
      const docRef = doc(db, 'users', updatedUser.id);
      await updateDoc(docRef, {
        nom: updatedUser.nom,
        postnom: updatedUser.postnom,
        prenom: updatedUser.prenom,
        numero: updatedUser.numero,
        email: updatedUser.email,
        adresse: updatedUser.adresse,
        password: updatedUser.password,
        ecole_id: updatedUser.ecole_id,
        role: updatedUser.role,
      });
      return updatedUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string, thunkAPI) => {
    try {
      const docRef = doc(db, 'users', id);
      await deleteDoc(docRef);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  // Slice pour User
  const userSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          userAdapter.setAll(state, action.payload);
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
          userAdapter.addOne(state, action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
          userAdapter.upsertOne(state, action.payload);
        })
        .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
          userAdapter.removeOne(state, action.payload);
        });
    },
  });
  
  export const userSelectors = userAdapter.getSelectors((state: RootState) => state.users);
  export default userSlice.reducer;
  