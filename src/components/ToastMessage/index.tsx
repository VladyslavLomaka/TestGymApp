import {COLORS} from '@constants/colors';
import {ToastAction} from '@store/modules/Toast/actions';
import {toastSelector} from '@store/modules/Toast/selectors';
import {Cloud} from '@svg/Cloud';
import {rem} from '@utils/rn-units';
import {font} from '@utils/styles';
import {AnimatePresence, MotiView} from 'moti';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const TOAST_TRANSLATE = 80;
const TOAST_TIMEOUT = 3000;

export const ToastMessage = () => {
  const toastData = useSelector(toastSelector);

  const visible = useSharedValue(false);
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    visible.value = false;
    dispatch(
      ToastAction.SHOW_TOAST.START.create({
        show: false,
        title: undefined,
        subtitle: undefined,
      }),
    );
  }, [dispatch, visible]);

  useEffect(() => {
    if (toastData.show) {
      visible.value = true;
    }
    const timeout = setTimeout(onPress, TOAST_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [dispatch, onPress, toastData, visible]);

  const toastPosition = useMemo(
    () => (toastData.position === 'top' ? {top} : {bottom: bottom + 10}),
    [bottom, toastData.position, top],
  );

  const translateDir =
    toastData.position === 'top' ? -TOAST_TRANSLATE : TOAST_TRANSLATE;

  const motiStyle = useMemo(
    () =>
      toastData.type === 'error'
        ? [styles.toastErrorContainer, {paddingTop: rem(top + 10)}]
        : [styles.toastContainer, toastPosition],
    [toastData.type, toastPosition, top],
  );

  return (
    <AnimatePresence>
      {toastData.show && (
        <MotiView
          from={{opacity: 0, translateY: translateDir}}
          animate={{opacity: 1, translateY: 0}}
          exit={{opacity: 0, translateY: translateDir}}
          transition={{type: 'timing', duration: 300}}
          style={motiStyle}>
          <Pressable
            onPress={onPress}
            style={[
              styles.toastPressable,
              toastData.type === 'error' && styles.errorWrapper,
            ]}>
            {toastData.title && (
              <Text style={styles.toastTextTitle}>{toastData.title}</Text>
            )}

            {toastData.subtitle && toastData.subtitle === 'No internet' ? (
              <>
                <Cloud />
                <Text style={styles.toastText}>{toastData.subtitle}</Text>
              </>
            ) : toastData.subtitle ? (
              <Text style={styles.toastText}>{toastData.subtitle}</Text>
            ) : null}
          </Pressable>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    position: 'absolute',
    zIndex: 5,
    backgroundColor: COLORS.toastSuccess,
  },
  toastErrorContainer: {
    width: '100%',
    zIndex: 5,
    alignSelf: 'center',
    padding: rem(10),
    backgroundColor: COLORS.red,
    top: 0,
    position: 'absolute',
  },
  errorWrapper: {
    flexDirection: 'row',
    gap: rem(8),
  },
  toastPressable: {
    paddingHorizontal: rem(14),
    paddingVertical: rem(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastTextTitle: {
    ...font(13, 20, 'bold', 'white'),
  },
  toastText: {
    ...font(13, 20, 'regular', 'white'),
  },
});
