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
    const matches = await lolApi.getMatches(name);

    if (!matches.ok) {
      setIsLoading(true);
      setErrorMessage((await matches.json()).message);
      return;
    }
    const result = await matches.json();
    setMatches(result);
    console.log(result);
    setIsLoading(false);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  return (
    <div className="App">
      <header className="header">LOL Stats App</header>
      <section className="body">
        {errorMessage && <section className="error">errorMessage</section>}
        {isLoading ? (
          <div className="body-loading">Loading...</div>
        ) : (
          <>
            <form className="body-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="summoner"
                value={name}
                onChange={handleNameChange}
              />
            </form>
            {matches &&
              matches.map((match: any) => <Match matchData={match} />)}
          </>
        )}
      </section>
    </div>
  );
}

export default App;
