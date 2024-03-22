import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUsernameSuccess } from "../../redux/actions/user.actions";
import { loadUserInformation } from "../../redux/actions/user.actions";
import Accounts from "../../components/account/account";
import EditForm from "../../components/editForm/editForm";
import "../../styles/pages/profil.css";

function Profile() {
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const userName = useSelector((state) => state.user.userName);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const tokenRef = useRef();

  useEffect(() => {
    if (tokenRef.current !== token) {
      dispatch(loadUserInformation(token));
      tokenRef.current = token;
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (newUsername) => {
    dispatch(updateUsernameSuccess(newUsername, token));
    setIsEditing(false);
    setSuccessMessage("The username has been successfully modified!");
    navigate("/profil");
  };

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          {isEditing ? (
            <EditForm
              initialUsername={userName}
              firstName={firstName}
              lastName={lastName}
              onSave={handleSaveClick}
              onCancel={() => setIsEditing(false)}
              placeholder={userName}
            />
          ) : (
            <>
              <h1>
                Welcome back
                <br />
                {firstName && lastName && (
                  <>
                    {firstName} {lastName}!
                  </>
                )}
              </h1>
              <button
                className="edit-button"
                onClick={handleEditClick}
              >
                Edit Name
              </button>
            </>
          )}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Accounts
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Accounts
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Accounts
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    </div>
  );
}

export default Profile;
