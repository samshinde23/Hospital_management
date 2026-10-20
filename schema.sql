-- Hospital Management System Database Schema & Initial Data for Neon PostgreSQL

-- 1. Patient Registration Table
CREATE TABLE IF NOT EXISTS patient_register (
    id SERIAL PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

-- 2. Doctor Details Table
CREATE TABLE IF NOT EXISTS doctor_details (
    id SERIAL PRIMARY KEY,
    doctor_name VARCHAR(100) NOT NULL,
    specialist VARCHAR(100) NOT NULL,
    available VARCHAR(50) DEFAULT 'Cabin'
);

-- 3. Patient Details / Clinical Records Table
CREATE TABLE IF NOT EXISTS patient_details (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    age INT,
    address VARCHAR(255),
    health_issue VARCHAR(255),
    doctor VARCHAR(100)
);

-- 4. Operation Theatre (OT) Details Table
CREATE TABLE IF NOT EXISTS ot_details (
    ot_details_pkey SERIAL PRIMARY KEY,
    ot_name VARCHAR(50) NOT NULL UNIQUE
);

-- 5. Surgery Details / Post Operation Table
CREATE TABLE IF NOT EXISTS surgery_details (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    done_by VARCHAR(100) NOT NULL,
    available VARCHAR(50) NOT NULL,
    anasthesia VARCHAR(100) NOT NULL,
    nurse VARCHAR(100),
    date DATE NOT NULL
);

-- =======================================================
-- INITIAL SEED DATA (Doctors & OTs)
-- =======================================================

-- Insert Operation Theatres
INSERT INTO ot_details (ot_name) VALUES
    ('OT1'),
    ('OT2'),
    ('OT3')
ON CONFLICT (ot_name) DO NOTHING;

-- Insert Sample Doctors
INSERT INTO doctor_details (doctor_name, specialist, available) VALUES
    ('Dr. Ramesh Patel', 'Cardiology & Heart Surgery', 'Cabin'),
    ('Dr. Ananya Sharma', 'Neurology & Neuro Surgery', 'Cabin'),
    ('Dr. Vikram Rao', 'Orthopedics & Joint Replacement', 'Cabin'),
    ('Dr. Sneha Kulkarni', 'General & Laparoscopic Surgery', 'Cabin'),
    ('Dr. Priya Deshmukh', 'Pediatrics & Child Care', 'Cabin')
ON CONFLICT DO NOTHING;

-- Insert Sample Patient Records
INSERT INTO patient_details (patient_name, age, address, health_issue, doctor) VALUES
    ('Rahul Verma', 34, 'Pune, Maharashtra', 'Chest discomfort and shortness of breath', 'Dr. Ramesh Patel'),
    ('Sunita Gaikwad', 48, 'Mumbai, Maharashtra', 'Knee osteoarthritis', 'Dr. Vikram Rao'),
    ('Amit Shinde', 29, 'Nashik, Maharashtra', 'Appendicitis acute abdominal pain', 'Dr. Sneha Kulkarni')
ON CONFLICT DO NOTHING;
