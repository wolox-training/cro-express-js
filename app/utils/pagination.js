exports.pagination = (queryPage, queryLimit) => {
  const pageAsNumber = Number.parseInt(queryPage);
  const limitAsNumber = Number.parseInt(queryLimit);

  let page = 0;
  let limit = 10;

  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  if (!Number.isNaN(limitAsNumber) && limitAsNumber > 1 && limitAsNumber < 10) {
    limit = limitAsNumber;
  }

  return { page, limit };
};
