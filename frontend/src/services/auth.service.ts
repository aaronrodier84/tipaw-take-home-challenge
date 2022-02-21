import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "/auth/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname: string, lastname: string, phone: string, email: string, password: string, acceptTerms: boolean) {
    console.log(API_URL);
    return axios.post(API_URL + "/auth/register", {
      firstname,
      lastname,
      phone,
      email,
      password,
      acceptTerms
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
