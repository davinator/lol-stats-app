import React, { ChangeEvent, FormEvent, useState } from "react";
// import "./Match.css";

const Match = ({ matchData }: any) => (
  <div className="Match">{JSON.stringify(matchData)}</div>
);
export default Match;
