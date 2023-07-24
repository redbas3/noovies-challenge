import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import Price from "../components/Price";
import { useQuery, useQueryClient } from "react-query";
import { apis } from "../api";
import Loader from "../components/Loader";
import { FlatList } from "react-native";
import NewsRow from "../components/NewsRow";

const HSeparator = styled.View`
  height: 1px;
  width: 96%;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 auto;
`;

export default function News() {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(["news"], apis.news);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries(["news"]);
    setRefreshing(false);
  };

  let news = [];
  if (data) {
    news = data.hits;
  }

  return isLoading ? (
    <Loader />
  ) : news ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={news}
      keyExtractor={(item) => item.objectID + ""}
      renderItem={({ item }) => (
        <NewsRow
          title={item.title}
          url={item.url}
          points={item.points}
          num_comments={item.num_comments}
        />
      )}
    />
  ) : null;
}
