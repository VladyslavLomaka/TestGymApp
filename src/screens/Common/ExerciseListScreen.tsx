import {ExerciseList} from '@components/ExerciseList/ExerciseList';
import {COLORS} from '@constants/colors';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

export const ExerciseListScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ExercisesActions.GET_EXERCISES_LIST.START.create());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ExerciseList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightPurple,
    flex: 1,
  },
});
