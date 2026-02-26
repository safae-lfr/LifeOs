import { createSlice } from "@reduxjs/toolkit";
//2.État Initial
const initialState = [
  { id: 1, text: "Sport", completed: false },
  { id: 2, text: "Coding", completed: false },
  { id: 3, text: "Shoping", completed: false },
];
//1.Création du Slice
export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // Ajouter une nouvelle habitude (générer un ID unique)
    addHabit: (state, action) => {
      const newHabit = {
        id: Date.now(), // Génération d'un ID unique
        text: action.payload,
        completed: false,
      };
      state.push(newHabit); // Immer
    },
    // Changer l'état completed (true/false) via l'ID
    toggleHabit: (state, action) => {
      const habit = state.find((h) => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    // Supprimer via l'ID
    deleteHabit: (state, action) => {
      return state.filter((habit) => habit.id !== action.payload);
    },
  },
});

export const { addHabit, toggleHabit, deleteHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
