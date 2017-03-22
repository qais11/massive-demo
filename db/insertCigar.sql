INSERT INTO blackmarket
(name , country , rating , price)
VALUES
($1,$2,$3,$4)
returning *;
