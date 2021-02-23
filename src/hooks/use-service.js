import {useState, useEffect, useCallback} from 'react';

const useService = (url) => {
  const [status, setStatus] = useState('none');
  const [data, setData] = useState([]);
  const fetchData = useCallback(async () => {
    setStatus('loading');
    const response = await fetch(url, {
      headers: {'cache-control': 'no-cache', 'x-apikey': '2f7e88e97916729bfaeb27df4fc0cdf2ea640 '},
    });
    const dt = await response.json();

    setData(dt);
    setStatus('loaded');
  }, [url]);

  useEffect(() => {
    if (!url) return;

    fetchData();
  }, [url, fetchData]);

  return {status, data};
};

export default useService;
