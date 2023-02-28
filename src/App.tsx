import React, { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [matches, setMatches] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("it works");
    }, 1000);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  return (
    <div className="App">
      <header className="header">LOL Stats App</header>
      <section className="body">
        {isLoading ? (
          <div className="body-loading">Loading...</div>
        ) : (
          <form className="body-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="summoner"
              value={name}
              onChange={handleNameChange}
            />
          </form>
        )}
      </section>
    </div>
  );
}

export default App;
