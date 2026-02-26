import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addHabit,
  toggleHabit,
  deleteHabit,
} from "../features/habits/habitsSlice";
import { fetchRandomQuote } from "../features/quotes/quotesSlice";
import Weather from "../components/Weather";

const Dashboard = () => {
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch();

  const habits = useSelector((state) => state.habits); //récupérer la liste des habitudes.

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      dispatch(addHabit(inputText));
      setInputText("");
    }
  };

  const { data: quoteData, status: quoteStatus } = useSelector(
    (state) => state.quotes,
  );

  useEffect(() => {
    if (quoteStatus === "idle") dispatch(fetchRandomQuote());
  }, [quoteStatus, dispatch]);

  return (
    <div
      className="page"
      style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
    >
      <div
        className="container dashboard"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <h1 className="dashboard-title">LifeOS Dashboard</h1>

        {/* --- WEATHER COMPONENT --- */}
        <Weather />
        {/* --- QUOTE SECTION --- */}
        <section className="quote-section">
          {quoteStatus === "loading" && (
            <p className="quote-loading">Loading inspirational quote...</p>
          )}

          {quoteStatus === "succeeded" && quoteData && (
            <p className="quote-text">
              "{quoteData.quote}" — <strong>{quoteData.author}</strong>
            </p>
          )}
        </section>

        {/* --- HABITS SECTION --- */}
        <section>
          <h2>My Habits</h2>
          {/*Au submit, envoyez l'action addHabit avec le texte saisi. */}
          <form className="habit-form" onSubmit={handleAddHabit}>
            {/*Gérez la saisie avec un useState local*/}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Your Habit..."
              className="habit-input"
            />

            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          {/*Affichez la liste avec .map(). */}
          <ul className="habits-list">
            {habits.map((habit) => (
              <li key={habit.id} className="habit-item">
                {/*Rendez le texte cliquable pour déclencher dispatch(toggleHabit(id)).*/}
                <button
                  onClick={() => dispatch(toggleHabit(habit.id))}
                  className={`habit-text ${habit.completed ? "completed" : ""}`}
                >
                  {habit.text}
                </button>
                {/*Ajoutez un bouton "Supprimer" sur chaque élément qui déclenche dispatch(deleteHabit(id)). */}
                <button
                  onClick={() => dispatch(deleteHabit(habit.id))}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
