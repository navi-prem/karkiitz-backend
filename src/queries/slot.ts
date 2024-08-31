const createSlots = `
            DO $$
            DECLARE
                start_hour TIME := '09:00:00';
                end_hour TIME := '22:00:00';
                slot_time TIME;
                slot_date DATE := $1;
            BEGIN
                slot_time := start_hour;
                WHILE slot_time <= end_hour LOOP
                    INSERT INTO Slots (slot_date, hour, status)
                    VALUES (slot_date, slot_time, 'available')
                    ON CONFLICT (slot_date, hour) DO NOTHING;
                    slot_time := slot_time + INTERVAL '1 hour';
                END LOOP;
            END $$;
        `;

const markAsBooked = `
UPDATE 
    Slots
SET 
    status = 'booked'
WHERE
    sid = $1;
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
