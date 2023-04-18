export const fetchUsers = async (searchTerm) => {
  const searchParam = searchTerm
    ? `?query=${encodeURIComponent(searchTerm)}`
    : "";
  const response = await fetch(`/users${searchParam}`);
  const data = await response.json();
  return data;
};
