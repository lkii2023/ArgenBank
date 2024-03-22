import React, { useState } from "react";

function EditForm({ firstName, lastName, initialUsername, onSave, onCancel }) {
  const [newUsername, setNewUsername] = useState("");

  const handleSaveFormClick = () => {
    onSave(newUsername);
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveFormClick();
      }}
    >
      <h1 className="title-edit">Edit user info</h1>
      <div className="edit">
        <label htmlFor="userName">User name : </label>
        <input
          type="text"
          id="userName"
          placeholder={initialUsername}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          autoComplete="userName"
          required
          className="input-style"
        />
      </div>
      <div className="edit">
        <label htmlFor="firstName">First name : </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          readOnly
          className="input-style"
        />
      </div>
      <div className="edit">
        <label htmlFor="lastName">Last name : </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          readOnly
          className="input-style"
        />
      </div>
      <button
        type="submit"
        className="action-button"
      >
        Save
      </button>
      <button
        type="button"
        className="action-button"
        onClick={handleCancelClick}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditForm;
