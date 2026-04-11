import React, { useState, useCallback } from "react";

type FormData = {
  email: string;
  score: number | "";
};

function UpdateScore() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    score: ""
  });

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "number"
            ? value === "" ? "" : Number(value)
            : value
      }));
    },
    []
  );

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await fetch("http://localhost:5000/users/update-score", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          score: formData.score
        })
      });

      const data = await res.json();
      console.log("Update success:", data);
    },
    [formData]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
        />
      </div>

      <div>
        <label>Score</label>
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleOnChange}
        />
      </div>

      <button type="submit">Update Score</button>
    </form>
  );
}

export default UpdateScore;