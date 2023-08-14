import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, console.log);

const login = ({ credential, password }) => {
  return api.post("/auth/login", {
    credential,
    password,
    platform: "WEB",
  });
};

const me = () => {
  return api.get("/auth/me");
};

const changePhone = ({ phone }) => {
  return api.put("/user/phone", { phone });
};

const requestOtp = () => {
  return api.get("/user/email/otp");
};

const changeEmail = ({ email }) => {
  return api.put("/user/email", { email });
};

const verifyEmail = ({ otp }) => {
  return api.post("/user/email/verify", { emailOtp: otp });
};

const changePassword = ({ currentPassword, newPassword }) => {
  return api.put("/user/password", {
    currentPassword,
    newPassword,
  });
};

const resetPassword = ({ credential }) => {
  return api.put("/user/password/reset", {
    credential,
  });
};

const createUser = ({ firstName, lastName, email, phone, cnic, role }) => {
  return api.post("/user", {
    firstName,
    lastName,
    email,
    phone,
    cnic,
    role,
  });
};

const getOfficeSecretaries = (s = "") => {
  return api.get(`/office-secretary`, { params: { s } });
};

const getOfficeSecretaryById = (id) => {
  return api.get(`/office-secretary/${id}`);
};

const getChairpersons = (s = "") => {
  return api.get("/chairperson", { params: { s } });
};

const getChairpersonById = (id) => {
  return api.get(`/chairperson/${id}`);
};

const getAllAreas = () => {
  return api.get("/area/all");
};

const createArea = () => {
  return api.post("/area");
};

const enableArea = ({ id }) => {
  return api.post(`/area/${id}/enable`);
};

const disableArea = ({ id }) => {
  return api.post(`/area/${id}/disable`);
};

const assignAreaToChairperson = ({ areaId, chairpersonId }) => {
  return api.patch(`/area/${areaId}/assign/${chairpersonId}`);
};

const unassignAreaFromChairperson = ({ areaId }) => {
  return api.patch(`/area/${areaId}/unassign`);
};

export const useApi = () => {
  return {
    login,
    me,
    changePhone,
    requestOtp,
    changeEmail,
    verifyEmail,
    changePassword,
    resetPassword,
    createUser,
    getOfficeSecretaries,
    getOfficeSecretaryById,
    getChairpersons,
    getChairpersonById,
    getAllAreas,
    createArea,
    assignAreaToChairperson,
    unassignAreaFromChairperson,
    enableArea,
    disableArea,
  };
};
