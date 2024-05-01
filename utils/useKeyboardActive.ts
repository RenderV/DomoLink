import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardIsActive = () => {
  const [keyboardIsActive, setKeyboardIsActive] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardIsActive;
};

export default useKeyboardIsActive;