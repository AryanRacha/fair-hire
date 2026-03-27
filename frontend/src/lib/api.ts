const API_BASE_URL = "http://localhost:5000/api";

function getAuthHeaders(includeContentType = true): HeadersInit {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {};
  
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export const api = {
  // --- Auth ---
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }
    return res.json();
  },

  register: async (userData: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Registration failed");
    }
    return res.json();
  },

  // --- Forms (Jobs) ---
  getForms: async () => {
    const res = await fetch(`${API_BASE_URL}/form`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  },

  getFormById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/form/${id}`, {
      // getFormById is usually public if candidates have to apply, or we might need just public data.
      // But the backend protect middleware might be on it. Let's send headers just in case.
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch job details");
    return res.json();
  },

  createForm: async (formData: any) => {
    const res = await fetch(`${API_BASE_URL}/form`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to create job");
    return res.json();
  },

  updateForm: async (id: string, formData: any) => {
    const res = await fetch(`${API_BASE_URL}/form/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to update job");
    return res.json();
  },

  deleteForm: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/form/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete job");
    return res.json();
  },

  // --- Candidates ---
  submitCandidate: async (formId: string, candidateFormData: FormData) => {
    const res = await fetch(`${API_BASE_URL}/form/${formId}/candidate`, {
      method: "POST",
      // Omit Content-Type so browser sets boundary for multipart/form-data
      headers: getAuthHeaders(false),
      body: candidateFormData,
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit application");
    }
    return res.json();
  },

  getCandidates: async (formId: string) => {
    const res = await fetch(`${API_BASE_URL}/form/${formId}/candidate`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch candidates");
    return res.json();
  },
};
