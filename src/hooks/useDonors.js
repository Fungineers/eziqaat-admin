import { useState } from "react";
import { useApi } from "src/api";

const useDonors = () => {
  const api = useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setData([]);
    setError(null);
    api
      .getDonors()
      .then((res) => {
        const { donors } = res.data;
        setData(donors.map((o) => ({ ...o, name: `${o.firstName} ${o.lastName}` })));
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    data,
    error,
    loading,
    fetch,
  };
};

export default useDonors;
