import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/users/userSlice'
import eleveReducer from './Slices/users/eleveSlice'
import parentReducer from './Slices/users/parentSlice'
import professeurReducer from './Slices/users/professeurSlice'
import ecoleReducer from './Slices/ecoles/ecoleSlice'
import coursReducer from './Slices/ecoles/coursSlice'
import classeReducer from './Slices/ecoles/classeSlice'

export const Store = configureStore({
  reducer: {
   users: userReducer,
   eleves : eleveReducer,
   parents: parentReducer,
   professeurs : professeurReducer,
   ecoles : ecoleReducer,
   classes : classeReducer,
   cours : coursReducer
   
  
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;