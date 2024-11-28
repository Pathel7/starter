import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { RootState } from '../../store'; // Remplacez par le chemin de votre store
import { db } from '../../../configuration/firebase'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Types d'utilisateurs
export type UserType = 'User' | 'Parent' | 'Eleve' | 'Professeur';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loggingUser: {
    id: string;
    nom: string;
    postnom: string;
    prenom: string;
    role?: string; // Pour User uniquement
    type: UserType;
  } | null;
  loading: boolean;
  error: string | null;
  passwordUpdateLoading: boolean;
  passwordUpdateError: string | null;
  passwordUpdateSuccess: boolean;
}

// Initial State
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loggingUser: null,
  loading: false,
  error: null,
  passwordUpdateLoading: false,
  passwordUpdateError: null,
  passwordUpdateSuccess: false,
};

// Thunks

export const login = createAsyncThunk(
  'auth/login',
  async (
    {
      numero,
      password,
      userType,
    }: { numero: string; password: string; userType: UserType },
    thunkAPI
  ) => {
    try {
      const collectionName = userType.toLowerCase() + 's'; 
      const userCollection = collection(db, collectionName);
      const q = query(userCollection, where('numero', '==', numero));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Utilisateur non trouvé');
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        throw new Error('Mot de passe incorrect');
      }

      const token = jwt.sign(
        { id: userDoc.id, type: userType },
        process.env.JWT_SECRET || 'default_secret_key',
        { expiresIn: '1h' }
      );

      return {
        id: userDoc.id,
        nom: userData.nom,
        postnom: userData.postnom,
        prenom: userData.prenom,
        role: userData.role,
        type: userType,
        token,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  return;
});

// Changer le mot de passe
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    {
      userId,
      oldPassword,
      newPassword,
      userType,
    }: { userId: string; oldPassword: string; newPassword: string; userType: UserType },
    thunkAPI
  ) => {
    try {
      const collectionName = userType.toLowerCase() + 's'; 
      const userRef = doc(db, collectionName, userId);
      const userDoc = await getDocs(query(userRef));

      if (!userDoc.exists()) {
        throw new Error('Utilisateur introuvable');
      }

      const userData = userDoc.data();

      const isPasswordValid = await bcrypt.compare(oldPassword, userData.password);
      if (!isPasswordValid) {
        throw new Error('Ancien mot de passe incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await updateDoc(userRef, { password: hashedPassword });

      return 'Mot de passe modifié avec succès';
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthState['loggingUser'] & { token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.loggingUser = {
          id: action.payload.id,
          nom: action.payload.nom,
          postnom: action.payload.postnom,
          prenom: action.payload.prenom,
          role: action.payload.role,
          type: action.payload.type,
        };
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.loggingUser = null;
        state.error = null;
      })
      .addCase(changePassword.pending, (state) => {
        state.passwordUpdateLoading = true;
        state.passwordUpdateError = null;
        state.passwordUpdateSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordUpdateLoading = false;
        state.passwordUpdateSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordUpdateLoading = false;
        state.passwordUpdateError = action.payload as string;
      });
  },
});

// Sélecteurs
export const selectAuth = (state: RootState) => state.auth;

// Exporter le reducer
export default authSlice.reducer;
