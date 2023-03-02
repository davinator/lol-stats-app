import React, { useState } from "react";
import lolApi from "./libs/lolApi";
import Match from "./Match";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [matches, setMatches] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    let matches: Response | null = null;
    try {
      matches = await lolApi.getMatches(name);
    } catch {
      setErrorMessage("Couldn't load the data. Please try again soon.");
      setIsLoading(false);
      return;
    }

    if (!matches.ok) {
      setIsLoading(false);
      setErrorMessage((await matches.json()).message);
      return;
    }
    const result = await matches.json();
    setMatches(result);
    setIsLoading(false);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setErrorMessage("");
  };

  return (
    <div className="App">
      <header className="header">
        <h2>LOL Stats App</h2>
      </header>
      <section className="body">
        {errorMessage && <div className="error">{errorMessage}</div>}
        {isLoading ? (
          <div className="body-loading">Loading...</div>
        ) : (
          <>
            <form className="body-form" onSubmit={handleSubmit}>
              <div className="body-form-field-group">
                <label htmlFor="Summoner" className="body-form-summoner-label">
                  Type your summoner name and hit enter.
                </label>
                <input
                  id="Summoner"
                  data-testid="summoner-txt-field"
                  className="body-form-summoner-field"
                  type="text"
                  name="summoner"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </form>
            {matches && (
              <div className="results">
                {matches.map((match: any) => (
                  <Match key={match.metadata.matchId} data={match} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default App;
