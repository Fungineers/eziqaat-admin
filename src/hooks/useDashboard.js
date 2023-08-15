import { useState } from "react";
import { useApi } from "src/api";

const useDashboard = () => {
  const api = useApi();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setData(null);
    setError(null);
    api
      .getAdminStats()
      .then((res) => {
        setData(res.data);
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

export default useDashboard;
