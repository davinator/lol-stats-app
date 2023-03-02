const apiBaseUrl = process.env.REACT_APP_LOL_API_URL || "http://localhost:3001";

class LolApi {
  request = async (
    endpoint: string,
    query?: Record<string, string>,
    method: string = "GET"
  ): Promise<Response> => {
    const url = query ? `${endpoint}?${new URLSearchParams(query)}` : endpoint;
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  getMatches = async (name: string) => {
    console.error("DA FUQ MAN");
    return this.request(`${apiBaseUrl}/summoner/matches`, {
      name,
    });
  };
}

const lolApi = new LolApi();
export default lolApi;
