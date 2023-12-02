import {Input} from '@components/Inputs/Input';
import {COLORS} from '@constants/colors';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import SearchIcon from '@svg/SearchIcon';
import {rem} from '@utils/rn-units';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';

export interface SearchQuery {
  searchQuery: string;
}

export const SearchBar = () => {
  const dispatch = useDispatch();

  const methods = useForm<SearchQuery>({
    mode: 'onBlur',
    defaultValues: {
      searchQuery: '',
    },
  });

  const handleSubmitPress = () => {
    console.log('Sending request');
    const inputValue = methods.getValues().searchQuery;
    dispatch(ExercisesActions.FILTER_EXERCISES.START.create(inputValue));
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <View style={styles.searchSection}>
          <View style={styles.inputWrapper}>
            <Input name="searchQuery" placeholder="Search" />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.touchableIcon}
            onPress={methods.handleSubmit(handleSubmitPress)}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(15),
    marginBottom: rem(15),
  },
  searchSection: {
    gap: rem(6),
    flexDirection: 'row',
    backgroundColor: COLORS.lightPurple,
  },
  inputWrapper: {
    flex: 1,
    alignSelf: 'center',
  },
  touchableIcon: {
    backgroundColor: 'white',
    borderRadius: rem(5),
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
