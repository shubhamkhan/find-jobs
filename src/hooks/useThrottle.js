import { useCallback, useRef } from 'react';

const useThrottle = (callback, delay) => {
    const timer = useRef(null);
  
    return useCallback(
      (...args) => {
        if (!timer.current) {
          timer.current = setTimeout(() => {
            callback(...args);
            timer.current = null;
          }, delay);
        }
      },
      [callback, delay]
    );
};

export default useThrottle;