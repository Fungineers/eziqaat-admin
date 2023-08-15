import { useState } from "react";
import { useApi } from "src/api";

const useDonations = () => {
  const api = useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setData([]);
    setError(null);
    api
      .getAllDonations()
      .then((res) => {
        const { donations } = res.data;
        setData(
          donations.reduce(
            (prev, curr) => {
              return { ...prev, [curr.status]: [...prev[curr.status], curr] };
            },
            {
              REQUESTED: [],
              PENDING: [],
              ACCEPTED: [],
              COLLECTED: [],
            }
          )
        );
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

export default useDonations;
