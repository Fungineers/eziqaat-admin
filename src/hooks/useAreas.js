import { useState } from "react";
import { useApi } from "src/api";

const useAreas = () => {
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
      .getAllAreas()
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

  const unassign = (idx) => {
    setUnassigning(idx);
    console.log(data[idx]);
    const { id: areaId } = data[idx];
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

  const enable = (idx) => {
    setEnabling(idx);
    console.log(data[idx]);
    const { id: areaId } = data[idx];
    if (areaId) {
      api
        .enableArea({ areaId })
        .then(() => {
          fetch();
        })
        .catch((err) => {})
        .finally(() => {
          setEnabling(null);
        });
    }
  };

  const disable = (idx) => {
    setDisabling(idx);
    console.log(data[idx]);
    const { id: areaId } = data[idx];
    if (areaId) {
      api
        .disableArea({ areaId })
        .then(() => {
          fetch();
        })
        .catch((err) => {})
        .finally(() => {
          setDisabling(null);
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

export default useAreas;
