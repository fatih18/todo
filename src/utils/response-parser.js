export default (operation, resolveBy) => {
  return operation.then(
    (response) => {
      return resolveBy(response);
    },
    (error) => Promise.reject(error)
  );
};
