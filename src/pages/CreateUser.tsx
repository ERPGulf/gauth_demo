import React, { useState } from "react";
import axios from "axios";
const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    password: "",
    email: "",
    role: "",
    qid: "",
    mobile_no: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const url =
      "https://io.claudion.com/api/method/claudion_io.portal.subscription.g_create_user";
    const headers = {
      Authorization: "Bearer uYNRh2ZBnAomdFXzLA6xavr5omZXEa",
      Cookie:
        "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=;",
    };
    try {
      const response = await axios.post(url, formData, {
        headers,
      });
      setSuccess("User created successfully!");
      console.log("Response:", response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-xl font-bold text-center mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["full_name", "password", "email", "role", "qid", "mobile_no"].map(
          (field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {field.replace("_", " ").toUpperCase()}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Create User"}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-sm font-medium">{error}</div>
      )}
      {success && (
        <div className="mt-4 text-green-600 text-sm font-medium">{success}</div>
      )}
    </div>
  );
};
export default CreateUserForm;