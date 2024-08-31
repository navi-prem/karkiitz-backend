const deleteUser = "DELETE FROM Users WHERE uid = $1;"
const getUser = "SELECT uname, email, phone_number, address FROM Users WHERE uid = $1;"
const addUser = `
INSERT INTO
    Users (uname, email, phone_number, password, address)
VALUES 
    ($1, $2, $3, $4, $5)
RETURNING
    *;
`;
const updateUser = `
UPDATE 
    Users
SET 
    uname = $2, phone_number = $3, address = $4
WHERE 
    uid = $1;
`

export default { deleteUser, getUser, addUser, updateUser }
