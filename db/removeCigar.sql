delete from blackmarket
  where cigarid = $1
  returning *;
