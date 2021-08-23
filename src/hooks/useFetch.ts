import axios from "axios";
import { useEffect } from "react";

const useFetch = (url: string) => {
    useEffect(() => {
        // const abortCont = new AbortController();
        axios
          .get(url)
          .then(function (res) {
            console.log(res.data.slice(1, 100));
            return res.data.json();
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {});
    
        return () => {
          console.log('clean up');
        };
      }, [url]);
}

export default useFetch;