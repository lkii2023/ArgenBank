import {
  updateUserProfile,
  loginSuccess,
  updateUsername,
} from "../reducers/userReducer";

const apiProfil = "http://localhost:3001/api/v1/user/profile";
const apiLogin = "http://localhost:3001/api/v1/user/login";

export const LOGOUT = "LOGOUT";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await fetch(apiLogin, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Incorrect username or password.");
    }

    const data = await response.json();

    dispatch(loginSuccess(data.body.token));
    navigate("/Profil");

    return data.body.token;
  } catch (error) {
    return false;
  }
};

export const loadUserInformation = (token) => async (dispatch) => {
  try {
    const profileResponse = await fetch(apiProfil, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error("Error retrieving profile details.");
    }

    const profileData = await profileResponse.json();
    dispatch(updateUserProfile(profileData.body));
  } catch (error) {
    console.error("Error loading user information :", error);
  }
};

export const updateUsernameSuccess =
  (newUsername, token) => async (dispatch) => {
    try {
      const response = await fetch(apiProfil, {
        method: "PUT",
        body: JSON.stringify({ userName: newUsername }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error updating username");
      }

      dispatch(updateUsername(newUsername));
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

export const logout = (navigate) => (dispatch) => {
  dispatch(logout());
  navigate("/");
};
