import {
  Alert,
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {SignUpFormValues} from 'ts/interfaces';
import {PRIMARY_COLOR} from 'utils/constants';
import VectorImage from 'react-native-vector-image';
import assets from 'assets';
import OldEnoughField from './OldEnoughField';
import PasswordField from './PasswordField';
import {ObjectSchema, bool, object, string} from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from 'rtk/slices';
import {signUpThunk} from 'rtk/thunks/signUp';
import CText from 'components/CText';

// @ts-ignore
const validationSchema: ObjectSchema<SignUpFormValues> = object({
  email: string().required('Email is required').email('Email is not valid'),
  password: string()
    .required('Password is required')
    .min(6, 'Too short')
    .max(18, 'Too long'),
  oldEnough: bool().oneOf([true], 'Not old enough'),
});

const initialValues = {
  email: '',
  password: '',
  oldEnough: false,
};

const Form = () => {
  const [showFieldTitle, setShowFieldTitle] = useState(false);
  const [fieldsOffsetY, setFieldsOffsetY] = useState(0);
  const passwordBottomYRef = useRef<number>(-1);

  const dispatch = useAppDispatch();

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: {isValid},
  } = useForm<SignUpFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onUpdateOldEnough = useCallback(() => {
    setValue('oldEnough', !getValues('oldEnough'), {
      shouldValidate: true,
    });
  }, [getValues, setValue]);

  const onUpdatePasswordFieldBottom = useCallback((value: number) => {
    if (passwordBottomYRef.current === -1) {
      passwordBottomYRef.current = value;
    }
  }, []);

  const onSubmit: SubmitHandler<SignUpFormValues> = useCallback(
    async data => {
      const {email, password} = data;
      try {
        await dispatch(signUpThunk({email, password})).unwrap();
      } catch (errorMsg) {
        Alert.alert('Warning', errorMsg as string);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const showKBListener = Keyboard.addListener('keyboardDidShow', e => {
      setShowFieldTitle(true);
      if (Platform.OS === 'ios') {
        setFieldsOffsetY(
          Math.min(
            Dimensions.get('screen').height -
              passwordBottomYRef.current -
              e.endCoordinates.height -
              32,
            0,
          ),
        );
      }
    });
    const hideKBListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowFieldTitle(false);
      setFieldsOffsetY(0);
    });

    return () => {
      showKBListener.remove();
      hideKBListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            transform: [{translateY: fieldsOffsetY}],
          }}>
          <CText style={styles.title}>Let's get you started!</CText>
          <Controller
            control={control}
            name={'email'}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <CText style={styles.fieldTitle}>
                  {showFieldTitle ? 'Your email' : ''}
                </CText>
                <TextInput
                  testID="form-email"
                  placeholder={showFieldTitle ? '' : 'Your email'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={'#FFFFFF80'}
                  style={styles.textInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name={'password'}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => {
              return (
                <View>
                  <CText style={styles.fieldTitle}>
                    {showFieldTitle ? 'Your password' : ''}
                  </CText>
                  <PasswordField
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error?.message}
                    onYLayout={onUpdatePasswordFieldBottom}
                    showPlaceholder={!showFieldTitle}
                  />
                </View>
              );
            }}
          />
        </View>
        <Controller
          control={control}
          name={'oldEnough'}
          render={({field: {value}}) => (
            <OldEnoughField value={value} setValue={onUpdateOldEnough} />
          )}
        />
        <CText style={styles.tosText}>
          By clicking Sign Up, you are indicating that you have read and agree
          to the <CText style={styles.buttonText}>Terms of service</CText>
          {' and '}
          <CText style={styles.buttonText}>Privacy Policy</CText>
        </CText>
      </View>

      <View style={styles.bottom}>
        <CText style={styles.signUp}>Sign Up</CText>
        <TouchableOpacity
          style={[styles.next_button, !isValid && styles.disabled]}
          testID="form-button"
          disabled={!isValid}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}>
          <VectorImage
            source={assets.icons.arrow_forward}
            tintColor={'#fff'}
            style={styles.next_icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    minHeight: '55%',
  },
  textInput: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: 12,
    color: '#fff',
    marginBottom: 32,
  },
  tosText: {
    color: '#ffffff80',
    fontSize: 12,
    marginTop: 24,
  },
  buttonText: {
    color: PRIMARY_COLOR,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUp: {
    fontSize: 16,
    color: '#fff',
  },
  next_button: {
    width: 54,
    aspectRatio: 1,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next_icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 32,
  },
  fieldTitle: {
    color: '#ffffff80',
  },
  disabled: {
    opacity: 0.6,
  },
});
