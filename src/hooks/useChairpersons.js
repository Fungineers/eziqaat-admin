import { useState } from "react";
import { toast } from "react-toastify";
import { useApi } from "src/api";

const useChairpersons = () => {
  const api = useApi();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unassigning, setUnassigning] = useState(null);
  const [assigning, setAssigning] = useState(false);

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

  const unassign = (areaId) => {
    setUnassigning(areaId);

    if (areaId) {
      api
        .unassignAreaFromChairperson({ areaId })
        .then(() => {
          fetch();
          toast("Successfully unassigned area", { type: "success" });
        })
        .catch((err) => {
          const message = err?.response?.data?.message;
          toast(message, { type: "error" });
        })
        .finally(() => {
          setUnassigning(null);
        });
    }
  };

  const assign = (areaId, chairpersonId) => {
    setAssigning(true);
    api
      .assignAreaToChairperson({ chairpersonId, areaId })
      .then(() => {
        toast("Successfully assigned area", { type: "success" });
        fetch();
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast(message, { type: "error" });
      })
      .finally(() => {
        setAssigning(false);
      });
  };

  return {
    data,
    error,
    loading,
    assigning,
    unassigning,
    assign,
    fetch,
    unassign,
  };
};

export default useChairpersons;
