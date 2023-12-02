import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExerciseListScreen} from '@screens/Common/ExerciseListScreen';
import {Exercise} from '@screens/Common/ExerciseScreen';
import HomeIcon from '@svg/HomeIcon';
import React from 'react';

import {screenOptions} from './options';

export interface ExerciseScreenParams {
  id: number;
}

export type MainTabsParamList = {
  Exercises: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Exercise: ExerciseScreenParams;
};

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainTabs = () => {
  return (
    <Tabs.Navigator screenOptions={{...screenOptions}}>
      <Tabs.Screen
        name="Exercises"
        component={ExerciseListScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
    </Tabs.Navigator>
  );
};

export function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Exercise" component={Exercise} />
    </MainStack.Navigator>
  );
}
