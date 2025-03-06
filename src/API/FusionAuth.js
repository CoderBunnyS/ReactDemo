const BASE_URL = 'https://your-fusionauth-instance'; // Replace with your FusionAuth instance URL

/**
 * Fetches a list of users from FusionAuth.
 * @param {string} tenantId - The FusionAuth tenant ID.
 * @param {string} apiKey - The API key for authentication.
 * @param {object} [options] - Optional search parameters (e.g., queryString).
 * @returns {Promise<object>} - The response data containing users.
 * @throws {Error} - If the request fails or credentials are missing.
 */
export const fetchUsers = async (tenantId, apiKey, options = { queryString: '*' }) => {
  if (!tenantId || !apiKey) {
    throw new Error('Missing FusionAuth tenant ID or API key.');
  }

  const response = await fetch(`${BASE_URL}/api/user/search`, {
    method: 'POST',
    headers: {
      'Authorization': apiKey,
      'Content-Type': 'application/json',
      'X-FusionAuth-TenantId': tenantId,
    },
    body: JSON.stringify({ search: options }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

/**
 * Fetches details for a specific user.
 * @param {string} tenantId - The FusionAuth tenant ID.
 * @param {string} apiKey - The API key for authentication.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} - The user's details.
 * @throws {Error} - If the request fails or credentials are missing.
 */
export const fetchUserById = async (tenantId, apiKey, userId) => {
  if (!tenantId || !apiKey || !userId) {
    throw new Error('Missing required parameters: tenantId, apiKey, or userId.');
  }

  const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': apiKey,
      'Content-Type': 'application/json',
      'X-FusionAuth-TenantId': tenantId,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
};
