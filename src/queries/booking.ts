const addBooking = `
INSERT INTO
    Bookings (uid, cid, sid, pickup_address, status)
VALUES 
    ($1, $2, $3, $4, 'pending')
RETURNING
    *
;`;

const cancel = `
UPDATE 
    Bookings
SET 
    status = 'canceled'
WHERE 
    bid = $1;
`;

const myBookings = `SELECT * FROM Bookings WHERE uid = $1;`
const carBookings = `SELECT * FROM Bookings WHERE cid = $1;`

const getBookings = `
SELECT 
    b.*
FROM 
    Bookings b
JOIN 
    Slots s ON b.sid = s.sid
WHERE 
    s.slot_date = BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '1 day' 
;`

export default { addBooking, myBookings, cancel, carBookings, getBookings }
