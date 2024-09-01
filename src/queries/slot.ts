const createSlots = `SELECT create_slots($1);`;

const markAsBooked = `
UPDATE 
    Slots
SET 
    status = 'booked'
WHERE
    sid = $1 AND status = 'available'
RETURNING
    *;
`;

const deleteSlot = "DELETE FROM Slots WHERE sid = $1;"
const deleteSlots = `DELETE FROM Slots
            WHERE slot_date = $1;`

const getSlots = `
SELECT 
    * 
FROM 
    Slots 
WHERE 
    slot_date 
BETWEEN 
    CURRENT_DATE AND CURRENT_DATE + INTERVAL '1 day'
AND 
    status = 'available';
`

export default { markAsBooked, deleteSlot, createSlots, deleteSlots, getSlots }
