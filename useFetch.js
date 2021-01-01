import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //para probar la utilidad de useRef
        // setTimeout(() => {
        //   if (isMounted.current) {
        //     setState({ loading: false, error: null, data });
        //   }
        // }, 3000);
        if (isMounted.current) {
          setState({ loading: false, error: null, data });
        }
      });
  }, [url]);

  return state;
};
