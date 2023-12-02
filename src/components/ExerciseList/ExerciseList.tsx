import {ExerciseInstance} from '@api/exercises/getExercisesList';
import {AnimatedSpinner} from '@components/AnimatedSpinner';
import {SearchBar} from '@components/SearchBar/SearchBar';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import {retrieveFilteredExercises} from '@store/modules/Exercises/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {NoImage} from '@svg/NoImage';
import {rem} from '@utils/rn-units';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

export const ExerciseList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const isListLoading = useSelector(
    isLoadingSelector.bind(null, ExercisesActions.GET_EXERCISES_LIST),
  );

  const filteredExercises = useSelector(retrieveFilteredExercises);

  const onExercisePress = (id: number) => {
    Keyboard.dismiss();
    navigation.navigate('Exercise', {id});
  };

  const renderItem = useCallback(({item}: {item: ExerciseInstance}) => {
    const muscle = item.muscles.length ? item.muscles[0].name_en : 'No Data';

    const equipment = item.equipment.length
      ? item.equipment[0].name
      : 'No Data';

    const image = item.images.length ? (
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{uri: item.images[0].image}}
      />
    ) : (
      <NoImage />
    );

    return (
      <Pressable
        style={styles.pressable}
        onPress={() => onExercisePress(item.exercise_base_id)}>
        <View style={styles.cardWrapper}>
          <View>
            <Text style={styles.cardHeaderText}>{item.name}</Text>
          </View>
          <View style={styles.cardImageWrapper}>{image}</View>
          <View style={styles.cardDetailsWrapper}>
            <Text
              style={styles.singleDetail}>{`Muscle group:\n${muscle}`}</Text>
            <Text style={styles.singleDetail}>
              {`Equipment:\n${equipment}`}
            </Text>
          </View>
        </View>
      </Pressable>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyList = (
    <View style={styles.emptyList}>
      <AnimatedSpinner />
    </View>
  );
  const keyExtractor = useCallback((item: ExerciseInstance) => item.uuid, []);
  return (
    <FlatList
      data={filteredExercises}
      renderItem={renderItem}
      onMomentumScrollBegin={Keyboard.dismiss}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'never'}
      ListHeaderComponent={<SearchBar />}
      ListEmptyComponent={isListLoading ? emptyList : null}
      ListHeaderComponentStyle={styles.listHeader}
      contentContainerStyle={styles.content}
      stickyHeaderIndices={[0]}
    />
  );
};

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    flex: 1,
    padding: 5,
    paddingHorizontal: rem(15),
  },
  cardWrapper: {
    padding: rem(10),
    backgroundColor: COLORS.softPurple,
    borderRadius: 15,
    height: 250,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 9.11,

    elevation: 14,
  },
  listHeader: {
    backgroundColor: COLORS.lightPurple,
  },
  content: {
    gap: 10,
  },
  cardHeaderText: {
    ...font(20, 22, 'medium', 'black'),
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardImageWrapper: {
    marginVertical: rem(10),
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetailsWrapper: {
    flexDirection: 'row',
    paddingTop: rem(10),
    borderTopWidth: 2,
    borderTopColor: COLORS.lightPurple,
  },
  singleDetail: {
    textAlign: 'center',
    flex: 1,
  },
});
