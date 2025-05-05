import AxiosInstance from "./index";

const registerUser = async (data) => {
  return await AxiosInstance.post("/user/signup", data, {
    headers: {
      "Content-Type": "multipart/formData",
    },
  });
};

const _loginUser = async (data) => {
  return await AxiosInstance.post("/user/login", data, {
    headers: {
      "Contain-Type": "multipart/formData",
    },
  });
}

export { registerUser, _loginUser };