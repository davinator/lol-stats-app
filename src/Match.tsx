import "./Match.css";

const Match = ({ className, data }: any) => {
  const summoner = data.info.summoner;
  const result = summoner.win ? "Victory" : "Loss";

  return (
    <ul className={`Match ${result}`}>
      <li>Champion: {summoner.championName}</li>
      <li>Match result: {result}</li>
      <li>
        KDA: {summoner.kills} / {summoner.deaths} / {summoner.assists} (
        {summoner.challenges.kda})
      </li>
    </ul>
  );
};
export default Match;
