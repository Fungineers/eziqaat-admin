import { useState } from "react";
import { useApi } from "src/api";

const useOfficeSecretaries = () => {
  const api = useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unassigning, setUnassigning] = useState(null);
  const [enabling, setEnabling] = useState(false);
  const [disabling, setDisabling] = useState(false);

  const fetch = () => {
    setLoading(true);
    setData([]);
    setError(null);
    api
      .getOfficeSecretaries()
      .then((res) => {
        const { officeSecretaries } = res.data;
        setData(officeSecretaries.map((o) => ({ ...o, name: `${o.firstName} ${o.lastName}` })));
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

export default useOfficeSecretaries;
