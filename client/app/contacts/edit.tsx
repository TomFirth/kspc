import { useState } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { styles } from '@/styles/styles';

// display editable username
// save

const ShareScreen = () => {
  const { uuid } = useLocalSearchParams();

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Editing UUID: {uuid}</Text>
    </View>
  )
}

export default ShareScreen;