import {CommonInput} from '@components/Inputs/CommonInput';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {StyleProp, ViewStyle} from 'react-native';

interface InputProps {
  name: string;
  value?: string | undefined;
  placeholder: string;
  isShowErrorBorder?: boolean;
  isEditable?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
}

export const Input = ({
  name,
  placeholder,
  value,
  isShowErrorBorder = false,
  isEditable = true,
  inputStyle = {},
}: InputProps) => {
  const {field, fieldState} = useController({name});
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const error = fieldState.error;
  const onFocus = () => setIsFocused(true);

  const onBlur = () => {
    field.onBlur();
    setIsFocused(false);
  };

  return (
    <CommonInput
      field={field}
      placeholder={placeholder}
      value={value}
      isFocused={isFocused}
      inputStyle={inputStyle}
      onBlur={onBlur}
      onFocus={onFocus}
      autoCorrect={true}
      autoComplete={'email'}
      autoCapitalize={'none'}
      keyboardType={'email-address'}
      textContentType={'emailAddress'}
      isError={isShowErrorBorder && !!error}
      caretHidden={false}
      isEditable={isEditable}
    />
  );
};
