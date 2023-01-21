const SERVER_URL = "http://127.0.0.1:8000";

const createEntity = async ({ name, entity }) => {
  const result = await fetch(`${SERVER_URL}/${name}s`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entity),
  });

  return result.ok;
};

const updateEntityById = async ({ name, id, entity }) => {
  const result = await fetch(`${SERVER_URL}/${name}s/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entity),
  });

  return result.ok;
};

const deleteEntityById = async ({ name, id }) => {
  const result = await fetch(`${SERVER_URL}/${name}s/${id}`, {
    method: "DELETE",
  });

  return result.ok;
};

const getEntityById = async ({ name, id }) => {
  const result = await fetch(`${SERVER_URL}/${name}s/${id}`);

  if (result.ok) return result.json();
  else throw new Error(`Cannot get ${name}s`);
};

const getEntities = async ({ name }) => {
  const result = await fetch(`${SERVER_URL}/${name}s`);

  if (result.ok) return result.json();
  else throw new Error(`Cannot get ${name}s`);
};

export {
  createEntity,
  updateEntityById,
  deleteEntityById,
  getEntityById,
  getEntities,
};
