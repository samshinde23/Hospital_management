import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT, 10) || 5432,
});

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Endpoint to handle user registration
app.post('/Register', async (req, res) => {
    try {
        const { FirstName, email, password, phone } = req.body;

        // Validation
        if (!FirstName || !email || !password || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: 'Phone number must be exactly 10 digits.' });
        }

        // Insert into database
        const result = await pool.query(
            'INSERT INTO patient_register (FirstName, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
            [FirstName, email, password, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


// Endpoint to handle user login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request:', req.body);

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the user exists in the database
        const result = await pool.query('SELECT * FROM patient_register WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Failed to login' });
    }
});

const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ error: "User not logged in. Please log in first." });
    }
};


app.post('/UpdateAvailable', async (req, res) => {
    try {
        const { doctor_name, available } = req.body;

        if (!doctor_name || !available) {
            return res.status(400).json({ error: "Doctor name and availability are required." });
        }

        const result = await pool.query(
            "UPDATE doctor_details SET available = $1 WHERE doctor_name = $2 RETURNING *",
            [available, doctor_name]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor availability updated successfully", doctor: result.rows[0] });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: "Failed to update availability" });
    }
});


app.post('/SurgeryForm', async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { patient_name, done_by, available, anasthesia, nurse, date } = req.body;

        if (!available || !anasthesia || !date) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await pool.query(
            'INSERT INTO surgery_details (patient_name, done_by, available, anasthesia, nurse, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [patient_name, done_by, available, anasthesia, nurse, date]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.get('/RegisteredUser', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patient_register');
        console.log('Query result:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching registered users:', err.message);
        res.status(500).json({ error: 'Failed to fetch registered users' });
    }
});

// Admin Login Endpoint
app.post("/AdminLogin", async (req, res) => {
    try {
        console.log("Admin login request:", req.body);

        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).json({ error: "Missing username or password" });
        }

        const { username, password } = req.body;

        if (username === "admin" && password === "admin") {
            console.log("✅ Admin credentials matched");
            return res.status(200).json({ message: "Admin login successful" });
        } else {
            console.log("❌ Invalid credentials");
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Admin login error:", err.message);
        res.status(500).json({ error: "Failed to login" });
    }
});

app.get('/DoctorDetails', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM doctor_details');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching doctors:', err.message);
        res.status(500).json({ error: 'Failed to fetch doctor details' });
    }
});

app.get('/PatientDetails', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patient_details');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching doctors:', err.message);
        res.status(500).json({ error: 'Failed to fetch doctor details' });
    }
});

app.get('/DocAvailable', async (req, res) => {
    try {
        const result = await pool.query("SELECT doctor_name FROM doctor_details WHERE NOT available = 'Leave'");
        console.log('Query result:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching info:', err.message);
        res.status(500).json({ error: 'Failed to fetch info' });
    }
});

app.get('/PostOperation', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM surgery_details');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching doctors:', err.message);
        res.status(500).json({ error: 'Failed to fetch surgery details' });
    }
});

app.get('/OTavailable', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ot_name 
            FROM ot_details 
            WHERE ot_name NOT IN (
                SELECT DISTINCT available 
                FROM doctor_details 
                WHERE available IS NOT NULL AND available != ''
            )
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching available OTs:', err.message);
        res.status(500).json({ error: 'Failed to fetch available OTs' });
    }
});

app.get('/SurgicalDetails', async (req, res) => {
    try {
        const result = await pool.query("SELECT doctor_name FROM doctor_details WHERE NOT available = 'Leave'");
        console.log('Query result:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching info:', err.message);
        res.status(500).json({ error: 'Failed to fetch info' });
    }
});

const PORT = process.env.PORT || 5002;
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
