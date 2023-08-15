import { useState } from "react";
import { useApi } from "src/api";

const useUnassignedAreas = () => {
  const api = useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setData([]);
    setError(null);
    api
      .getUnassignedAreas()
      .then((res) => {
        const { areas } = res.data;
        setData(areas);
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

export default useUnassignedAreas;
