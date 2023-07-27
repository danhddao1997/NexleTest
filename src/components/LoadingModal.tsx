import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {LoadingModalRefProps} from 'ts/interfaces';

const modalRef = createRef<LoadingModalRefProps>();

const ForwardedLoadingModal = forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      setVisible,
    };
  });

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </View>
    </Modal>
  );
});

const LoadingModal = () => {
  return <ForwardedLoadingModal ref={modalRef} />;
};

// Object.assign(LoadingModal, {
//   open: () => modalRef.current?.setVisible(true),
//   close: () => modalRef.current?.setVisible(false),
// });

export default Object.assign(LoadingModal, {
  open: () => modalRef.current?.setVisible(true),
  close: () => modalRef.current?.setVisible(false),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
