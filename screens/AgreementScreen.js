import React from "react";

import { View, Text, StyleSheet, Button } from "react-native";

const AgreementScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>전체동의</Text>
      <Button title="확인" onPress={() => navigation.navigate("Flyer")} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AgreementScreen;
