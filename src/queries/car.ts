const deleteCar = "DELETE FROM Cars WHERE cid = $1;"
const getCar = "SELECT * FROM Cars WHERE cid = $1;"
const addCar = `
INSERT INTO 
    Cars (uid, make, model, year, license_plate)
VALUES 
    ($1, $2, $3, $4, $5);
`;
const getCars = `SELECT * FROM Cars WHERE uid = $1;`

export default { deleteCar, getCar, addCar, getCars }
