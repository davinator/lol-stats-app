import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import lolApi from "./libs/lolApi";
import App from "./App";

jest.mock("./libs/lolApi");

describe("App", () => {
  test("Fetches and renders stats properly", async () => {
    jest.spyOn(lolApi, "getMatches").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => [
          generateSummonerData("m1", true, 10, 2, 0, "6.5", "Master Yii"),
          generateSummonerData("m2", true, 3, 1, 15, "18", "Tresh"),
          generateSummonerData("m3", false, 3, 8, 1, "0.5", "Jinx"),
        ],
      } as Response)
    );

    render(<App />);
    const txtField = screen.getByTestId("summoner-txt-field");
    userEvent.type(txtField, "BrandMain123{enter}");

    expect(await screen.findByText(/Master Yii/)).toBeInTheDocument();
    expect(await screen.findByText(/Tresh/)).toBeInTheDocument();
    expect(await screen.findByText(/Jinx/)).toBeInTheDocument();
  });

  test("Fetches and renders the error message when an error occours", async () => {
    jest.spyOn(lolApi, "getMatches").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({
          message: "Server was shutdown",
        }),
      } as Response)
    );

    render(<App />);
    const txtField = screen.getByTestId("summoner-txt-field");
    userEvent.type(txtField, "qwertyasdfgh{enter}");
    expect(await screen.findByText(/Server was shutdown/)).toBeInTheDocument();
    expect(screen.queryByText(/Match result/)).not.toBeInTheDocument();
  });
});

function generateSummonerData(
  matchId: string,
  win: boolean,
  kills: number,
  deaths: number,
  assists: number,
  kda: string,
  championName: string
) {
  return {
    metadata: {
      matchId,
    },
    info: {
      summoner: {
        win,
        championName,
        kills,
        deaths,
        assists,
        challenges: {
          kda,
        },
      },
    },
  };
}
