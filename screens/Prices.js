import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import Price from "../components/Price";
import { useQuery, useQueryClient } from "react-query";
import { apis } from "../api";
import Loader from "../components/Loader";
import { FlatList } from "react-native";

const HSeparator = styled.View`
  height: 1px;
  width: 96%;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 auto;
`;

export default function Prices() {
  const queryClient = useQueryClient();
  const { isLoading, data: tickers } = useQuery(["prices"], apis.prices);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries(["prices"]);
    setRefreshing(false);
  };

  let cleanedTickers = [];
  if (tickers) {
    cleanedTickers = tickers.filter(
      (ticker) => ticker.circulating_supply !== 0
    );
  }
  return isLoading ? (
    <Loader />
  ) : cleanedTickers ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={tickers}
      ItemSeparatorComponent={HSeparator}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <Price
          symbol={item.symbol}
          name={item.name}
          price={item.quotes.USD.price.toFixed(2)}
          change={item.quotes.USD.volume_24h_change_24h}
        />
      )}
    />
  ) : null;
}
