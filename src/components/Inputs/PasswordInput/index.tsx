import {CommonInput} from '@components/Inputs/CommonInput';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';

interface PasswordInputProps {
  name: string;
  placeholder?: string;
}

export const PasswordInput = ({
  name,
  placeholder = 'Password',
}: PasswordInputProps) => {
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
      isFocused={isFocused}
      onBlur={onBlur}
      onFocus={onFocus}
      secureTextEntry={true}
      keyboardType={'default'}
      autoComplete={'password'}
      textContentType={'password'}
      isError={!!error}
    />
  );
};
