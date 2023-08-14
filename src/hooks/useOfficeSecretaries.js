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

  const enable = (id) => {
    if (id) {
      api
        .enableArea({ id })
        .then(() => {
          fetch();
        })
        .catch((err) => {})
        .finally(() => {
          setEnabling(null);
        });
    }
  };

  const disable = (id) => {
    setDisabling(id);
    if (id) {
      api
        .disableArea({ id })
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
    enabling,
    disabling,
    fetch,
    unassign,
    enable,
    disable,
  };
};

export default useAreas;
