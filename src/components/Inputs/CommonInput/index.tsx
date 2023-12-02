import {COLORS} from '@constants/colors';
import {isAndroid, rem} from '@utils/rn-units';
import {font} from '@utils/styles';
import React from 'react';
import {ControllerRenderProps, FieldValues} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

export type CommonInputProps = TextInputProps & {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  isFocused: boolean;
  isError?: boolean;
  isEditable?: boolean;
  value?: string;
  inputStyle?: StyleProp<ViewStyle>;
  onBlur: () => void;
  onFocus: () => void;
};

export const CommonInput = ({
  field,
  placeholder,
  isFocused,
  isError,
  value,
  onBlur,
  onFocus,
  isEditable,
  inputStyle = {},
  ...textInputProps
}: CommonInputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[
          inputStyle,
          styles.input,
          isFocused && styles.focusedInput,
          isError && styles.errorInput,
          isEditable === false && styles.isEditableInput,
        ]}
        editable={isEditable}
        autoCorrect={false}
        spellCheck={false}
        autoComplete={'off'}
        autoCapitalize={'none'}
        cursorColor={COLORS.black}
        selectionColor={COLORS.black}
        keyboardType={isAndroid ? 'visible-password' : 'default'}
        placeholder={placeholder}
        placeholderTextColor={COLORS.black}
        value={value ? value : field.value}
        onChangeText={field.onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 1,
    borderRadius: rem(5),
    backgroundColor: COLORS.black,
  },
  input: {
    padding: rem(14),
    borderRadius: rem(5),
    backgroundColor: COLORS.white,
    ...font(14, 20, 'regular', 'black'),
    color: COLORS.black,
  },
  focusedInput: {
    borderColor: COLORS.lightPurple,
  },
  errorInput: {
    borderColor: COLORS.black,
  },
  isEditableInput: {
    backgroundColor: COLORS.black,
    color: COLORS.black,
  },
});
