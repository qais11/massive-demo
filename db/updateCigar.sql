update blackmarket
  set price = $1
  where cigarid = $2
  returning *;
