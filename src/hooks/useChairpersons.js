import { useState } from "react";
import { useApi } from "src/api";

const useChairpersons = () => {
  const api = useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unassigning, setUnassigning] = useState(null);

  const fetch = () => {
    setLoading(true);
    setData([]);
    setError(null);
    api
      .getChairpersons()
      .then((res) => {
        const { chairpersons } = res.data;
        setData(chairpersons.map((c) => ({ ...c, name: `${c.firstName} ${c.lastName}` })));
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getIndex = (id) => data.findIndex((item) => item.id === id);

  const unassign = (areaId) => {
    setUnassigning(areaId);

    if (areaId) {
      api
        .unassignAreaFromChairperson({ areaId })
        .then(() => {
          fetch();
        })
        .catch((err) => {})
        .finally(() => {
          setUnassigning(null);
        });
    }
  };

  return {
    data,
    error,
    loading,
    unassigning,
    fetch,
    unassign,
  };
};

export default useChairpersons;
