import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackIcon} from '@svg/BackIcon';
import {rem} from '@utils/rn-units';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const BackHeader = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onBackPressHandler = () => {
    navigation.navigate('MainTabs', {screen: 'Exercises'});
  };

  const onCancelPressHandler = () => {
    // TODO: Instead of navigate, cancel should be used for resetting navigation
    // state, but in our simple case its useless
    navigation.navigate('MainTabs', {screen: 'Exercises'});
  };
  return (
    <View style={styles.backHeaderContainer}>
      <TouchableOpacity onPress={onBackPressHandler} style={styles.backWrapper}>
        <BackIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCancelPressHandler}
        style={styles.cancelWrapper}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backWrapper: {
    flex: 1,
    borderRightWidth: 1,
    borderBlockColor: COLORS.softPurple,
  },
  cancelWrapper: {
    flex: 1,
    borderLeftWidth: 1,
    borderBlockColor: COLORS.softPurple,
  },
  backHeaderContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: rem(10),
    paddingHorizontal: rem(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cancelText: {
    textAlign: 'right',
    ...font(20, 40, 'medium', 'black'),
  },
});
