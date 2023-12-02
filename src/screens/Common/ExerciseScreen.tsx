import {AnimatedSpinner} from '@components/AnimatedSpinner';
import {BackHeader} from '@components/BackHeader/BackHeader';
import {COLORS} from '@constants/colors';
import {ExerciseScreenParams, MainStackParamList} from '@navigation/Main';
import {Route, useRoute} from '@react-navigation/native';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import {retrieveExerciseInfo} from '@store/modules/Exercises/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {MusclesPrimary} from '@svg/MusclesPrimary';
import {MusclesSecondary} from '@svg/MusclesSecondary';
import {NoImage} from '@svg/NoImage';
import {rem} from '@utils/rn-units';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const Exercise = () => {
  const {params} =
    useRoute<Route<keyof MainStackParamList, ExerciseScreenParams>>();

  const dispatch = useDispatch();

  const exercise = useSelector(retrieveExerciseInfo);
  const isLoading = useSelector(
    isLoadingSelector.bind(null, ExercisesActions.GET_EXERCISE_INFO),
  );

  const empty = (
    <View style={styles.empty}>
      <AnimatedSpinner />
    </View>
  );

  useEffect(() => {
    dispatch(ExercisesActions.GET_EXERCISE_INFO.START.create(params.id));
  }, [dispatch, params.id]);

  if (isLoading) {
    return empty;
  }

  const exerciseInstance = exercise?.exercises.find(
    item => item.language === 2,
  );
  const image = exercise?.images.length ? (
    <Image
      resizeMode="contain"
      style={styles.image}
      source={{uri: exercise?.images[0].image}}
    />
  ) : (
    <NoImage />
  );

  const removeTagsRegxp = /<\/?[^>]+(>|$)/gim;
  const description = exerciseInstance?.description
    ? exerciseInstance?.description.replace(removeTagsRegxp, '')
    : 'No Descriptions';

  const primaryMuscleName = exercise?.muscles.length
    ? exercise?.muscles[0].name
    : 'No info';
  const secondaryMuscleName = exercise?.muscles_secondary.length
    ? exercise?.muscles_secondary[0].name
    : 'No info';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bachHeaderWrapper}>
        <BackHeader />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.exerciseTitle}>
            {exerciseInstance?.name ?? 'Name Unavailable'}
          </Text>
          <View style={styles.cardImageWrapper}>{image}</View>
          <Text style={styles.involvedTitle}>Muscles involved:</Text>
          <View style={styles.groupedMuscles}>
            <View style={styles.singleMuscle}>
              <Text style={styles.muscleSubtitle}>Primary:</Text>
              <Text style={styles.muscleName}>{primaryMuscleName}</Text>
              <MusclesPrimary />
            </View>
            <View style={styles.singleMuscle}>
              <Text style={styles.muscleSubtitle}>Secondary:</Text>
              <Text style={styles.muscleName}>{secondaryMuscleName}</Text>

              <MusclesSecondary />
            </View>
          </View>
          <View style={styles.instructionsWrapper}>
            <Text style={styles.instructions}>Instructions</Text>
            <Text style={styles.instructionText}>{description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightPurple,
  },
  container: {
    backgroundColor: COLORS.lightPurple,
    flex: 1,
  },
  bachHeaderWrapper: {
    paddingHorizontal: rem(15),
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    marginTop: rem(15),
    padding: rem(30),
  },
  exerciseTitle: {
    textAlign: 'center',
    ...font(25, 30, 'medium', 'white'),
  },
  involvedTitle: {
    textAlign: 'center',
    marginTop: rem(15),
    ...font(20, 25, 'medium', 'white'),
  },
  groupedMuscles: {
    flexDirection: 'row',
    marginTop: rem(10),
  },
  singleMuscle: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: COLORS.lightWhite,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: rem(8),
  },
  muscleSubtitle: {
    ...font(18, 20, 'regular', 'white'),
  },
  muscleName: {
    ...font(16, 18, 'regular', 'white'),
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    ...font(18, 20, 'regular', 'white'),
  },
  instructionsWrapper: {
    gap: rem(15),
    marginTop: rem(15),
  },
  instructionText: {
    textAlign: 'center',
    color: COLORS.white,
  },
  cardImageWrapper: {
    padding: rem(25),
    borderRadius: 25,
    backgroundColor: 'white',
    marginVertical: rem(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  image: {
    width: '100%',
    height: 200,
  },
});
