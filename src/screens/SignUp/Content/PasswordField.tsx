import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  ComponentProps,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {PASSWORD_STRENGTH_MAPPING, PRIMARY_COLOR} from 'utils/constants';
import VectorImage from 'react-native-vector-image';
import assets from 'assets';
import {getSecurityLevel} from 'utils/functions';
import CText from 'components/CText';

type TextInputProps = ComponentProps<typeof TextInput>;

interface Props
  extends Pick<TextInputProps, 'onBlur' | 'onChangeText' | 'value'> {
  error: string | undefined;
  onYLayout: (value: number) => void;
  showPlaceholder: boolean;
}

const PasswordField = memo(
  ({onBlur, onChangeText, value, error, onYLayout, showPlaceholder}: Props) => {
    const [secure, setSecure] = useState(true);
    const [isFocus, setIsFocused] = useState(false);

    const passwordViewRef = useRef<View>(null);

    const onToggleSecure = useCallback(() => {
      setSecure(prev => !prev);
    }, []);

    const _onFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const _onBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const isEmptyText = useMemo(() => !value, [value]);

    const securityLevel = useMemo(() => getSecurityLevel(value || ''), [value]);

    const passwordStrengthMapping = useMemo(() => {
      return PASSWORD_STRENGTH_MAPPING[securityLevel];
    }, [securityLevel]);

    const renderStrengthText = useMemo(() => {
      const color = error ? '#ffffff80' : passwordStrengthMapping.color;

      const text = isEmptyText ? '' : passwordStrengthMapping.text;

      return <CText style={{color}}>{error || text}</CText>;
    }, [
      passwordStrengthMapping.color,
      passwordStrengthMapping.text,
      isEmptyText,
      error,
    ]);

    const renderStrengthBar = useMemo(() => {
      if (isEmptyText || error || !isFocus) {
        return null;
      }
      return (
        <View
          style={[
            styles.strengthBar,
            {
              backgroundColor: passwordStrengthMapping.color,
              width: `${((securityLevel + 1) / 4) * 100}%`,
            },
          ]}
        />
      );
    }, [
      error,
      isEmptyText,
      isFocus,
      passwordStrengthMapping.color,
      securityLevel,
    ]);

    const borderBottomStyle = useMemo(() => {
      return {
        borderBottomColor: isFocus ? '#ffffff6B' : PRIMARY_COLOR,
      };
    }, [isFocus]);

    const onLayout = useCallback(() => {
      passwordViewRef.current?.measure((x, y, width, height, pageX, pageY) => {
        onYLayout(pageY + height);
      });
    }, [onYLayout]);

    return (
      <View ref={passwordViewRef} onLayout={onLayout}>
        <View>
          <View style={[styles.textFieldContainer, borderBottomStyle]}>
            <TextInput
              testID="form-password"
              placeholder={showPlaceholder ? 'Your password' : ''}
              onFocus={_onFocus}
              onBlur={_onBlur}
              onChangeText={onChangeText}
              value={value}
              placeholderTextColor={'#FFFFFF80'}
              secureTextEntry={secure}
              style={styles.textInput}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={onToggleSecure}>
              <VectorImage
                source={assets.icons[secure ? 'visibility' : 'visibility_off']}
                style={styles.icon}
                tintColor={'#ffffff80'}
              />
            </TouchableOpacity>
          </View>
          {renderStrengthBar}
        </View>
        <View style={styles.errorTextContainer}>{renderStrengthText}</View>
      </View>
    );
  },
);

export default PasswordField;

const styles = StyleSheet.create({
  textFieldContainer: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorTextContainer: {
    marginTop: 12,
    marginBottom: 4,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    color: '#fff',
    paddingVertical: 0,
  },
  icon: {width: 24, height: 24},
  errorText: {
    color: '#ffffff80',
  },
  strengthBar: {
    position: 'absolute',
    bottom: 0,
    height: 1,
  },
});
