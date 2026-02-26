import { useSelector } from "react-redux";

export const Analytics = () => {
  // Récupérer les habitudes depuis le store
  const habits = useSelector((state) => state.habits);

  // Calculs
  const total = habits.length;
  const terminees = habits.filter((h) => h.completed).length;
  const nonTerminees = total - terminees;

  return (
    <div className="analytics-container">
      <h2 className="analytics-title"> Habit Analytics</h2>

      <div className="analytics-cards">
        <div className="analytics-card total">
          <h3>Total</h3>
          <p className="analytics-value">{total}</p>
        </div>

        <div className="analytics-card done">
          <h3>Completed</h3>
          <p className="analytics-value">{terminees}</p>
        </div>

        <div className="analytics-card pending">
          <h3>Pending</h3>
          <p className="analytics-value">{nonTerminees}</p>
        </div>
      </div>

      {total > 0 && (
        <p className="analytics-rate">
          Success Rate :{" "}
          <strong>{Math.round((terminees / total) * 100)}%</strong>
        </p>
      )}
    </div>
  );
};
