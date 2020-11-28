// user.js

import React, { useState, useEffect } from "react";

export default function User(props) {
  const [user, setUser] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch("https://motif.knittedforyou.com/download/download_json.php?f=" + id);
   console.log("response from User", response, "id: ", id); 
    setUser(await Object.entries(response.json));
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) {
    return "loading...";
  }

  return (
    <details>
      <summary>{user}</summary>
      <strong>{user}</strong> years old
      <br />
      lives in {user}
    </details>
  );
}