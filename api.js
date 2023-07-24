export const apis = {
  coins: () =>
    fetch("https://api.coinpaprika.com/v1/coins").then((res) => res.json()),
  prices: () =>
    fetch("https://api.coinpaprika.com/v1/tickers").then((res) => res.json()),
  news: () =>
    fetch(
      "https://hn.algolia.com/api/v1/search_by_date?query=cryptocurrency&tags=story&numericFilters=points>20"
    ).then((res) => res.json()),
  coinDetail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(`https://api.coinpaprika.com/v1/coins/${id}`).then((res) =>
      res.json()
    );
  },
};
