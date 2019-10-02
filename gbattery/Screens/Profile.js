import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ScrollView
} from 'react-native';

export default class Profile extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.user}>
          <Text>HI dan</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    flex: 1,
    height: 200,
    backgroundColor: 'grey'
  }
});
