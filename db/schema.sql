-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE Users (
    uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    password TEXT NOT NULL,
    address TEXT NOT NULL
);

-- Cars Table
CREATE TABLE Cars (
    cid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid UUID REFERENCES Users(uid) ON DELETE CASCADE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    license_plate VARCHAR(15) NOT NULL
);

-- Slots Table
CREATE TABLE Slots (
    sid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slot_date DATE NOT NULL,
    hour TIME NOT NULL,
    status VARCHAR(20) CHECK (status IN ('available', 'booked')) NOT NULL,
    UNIQUE (slot_date, hour)
);

-- Bookings Table
CREATE TABLE Bookings (
    bid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid UUID REFERENCES Users(uid) ON DELETE CASCADE,
    cid UUID REFERENCES Cars(cid) ON DELETE CASCADE,
    sid UUID REFERENCES Slots(sid) ON DELETE CASCADE,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pickup_address TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'canceled')) NOT NULL
);

CREATE OR REPLACE FUNCTION create_slots(sdate DATE)
RETURNS VOID AS $$
DECLARE
    start_hour TIME := '09:00:00';
    end_hour TIME := '22:00:00';
    slot_time TIME;
BEGIN
    slot_time := start_hour;
    WHILE slot_time <= end_hour LOOP
        INSERT INTO Slots (slot_date, hour, status)
        VALUES (sdate, slot_time, 'available')
        ON CONFLICT (slot_date, hour) DO NOTHING;
        slot_time := slot_time + INTERVAL '30 minutes';
    END LOOP;
END;
$$ LANGUAGE plpgsql;
