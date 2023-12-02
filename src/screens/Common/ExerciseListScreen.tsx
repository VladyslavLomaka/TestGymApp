import {ExerciseList} from '@components/ExerciseList/ExerciseList';
import {COLORS} from '@constants/colors';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import {isAndroid, rem} from '@utils/rn-units';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

export const ExerciseListScreen = () => {
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    dispatch(ExercisesActions.GET_EXERCISES_LIST.START.create());
  }, [dispatch]);

  return (
    <SafeAreaView
      style={[styles.container, isAndroid && {paddingTop: rem(top + 12)}]}>
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
