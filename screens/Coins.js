import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import Coin from "../components/Coin";
import { useQuery, useQueryClient } from "react-query";
import { apis } from "../api";
import Loader from "../components/Loader";

const ScrollView = styled.FlatList`
  margin-top: 20px;
`;

function Coins() {
  const queryClient = useQueryClient();
  const { isLoading, data: coins } = useQuery(["coins"], apis.coins);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries(["coins"]);
    setRefreshing(false);
  };

  let cleanedCoins = [];
  if (coins) {
    cleanedCoins = coins
      .filter((coin) => coin.rank !== 0)
      .filter((coin) => coin.is_active === true)
      .slice(0, 100);
  }

  return isLoading ? (
    <Loader />
  ) : cleanedCoins ? (
    <ScrollView
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={cleanedCoins}
      numColumns={3}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <Coin symbol={item.symbol} name={item.name} fullData={item} />
      )}
    />
  ) : null;
}

export default Coins;
