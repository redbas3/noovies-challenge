import styled from "styled-components/native";

const Text = styled.Text`
  margin-top: 8px;
  font-size: 12px;
  color: ${(props) => (props.plus === 1 ? "green" : "red")};
`;

export const makeImgPath = (symbol) => {
  return `https://coinicons-api.vercel.app//api/icon/${symbol.toLowerCase()}`;
};

export const makeChangeString = (change) => {
  if (!change) {
    return "";
  }

  const plus = change.toString().includes("-");

  return (
    <Text plus={plus ? 1 : 0}>
      {plus ? "▲ " : "▼ "}
      {change}%
    </Text>
  );
};
