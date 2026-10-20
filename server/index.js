import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import pkg from 'pg';

const { Pool } = pkg;

// Support both DATABASE_URL (provided by Neon on Vercel) and individual PG* variables
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: parseInt(process.env.PGPORT, 10) || 5432,
      ssl:
        process.env.PGHOST && process.env.PGHOST !== 'localhost'
          ? { rejectUnauthorized: false }
          : false,
    };

const pool = new Pool(poolConfig);

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Express Router to handle routes under both '/' and '/api'
const router = express.Router();

// Endpoint to handle user registration with bcrypt password hashing
router.post('/Register', async (req, res) => {
    try {
        const { FirstName, email, password, phone } = req.body || {};

        if (
            typeof FirstName !== 'string' || !FirstName.trim() ||
            typeof email !== 'string' || !email.trim() ||
            typeof password !== 'string' || !password ||
            typeof phone !== 'string' || !phone
        ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters.' });
        }
        if (Buffer.byteLength(password, 'utf8') > 72) {
            return res.status(400).json({ error: 'Password must be no more than 72 UTF-8 bytes.' });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: 'Phone number must be exactly 10 digits.' });
        }

        // bcrypt generates a fresh random salt for each password.
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO patient_register (FirstName, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING id, FirstName, email, phone',
            [FirstName, email, hashedPassword, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }
        console.error('Database error:', err.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Endpoint to handle user login with secure bcrypt comparison
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await pool.query('SELECT * FROM patient_register WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Verify bcrypt hashes. Upgrade an old plaintext password after a valid login.
        const isBcryptHash = /^\$2[aby]\$\d{2}\$/.test(user.password);
        let isMatch = false;

        if (isBcryptHash) {
            isMatch = await bcrypt.compare(password, user.password);
        } else if (user.password === password) {
            isMatch = true;
            const upgradedHash = await bcrypt.hash(password, 10);
            await pool.query(
                'UPDATE patient_register SET password = $1 WHERE id = $2 AND password = $3',
                [upgradedHash, user.id, user.password]
            );
        }

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Return user profile without leaking the password hash
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Admin Login Endpoint
router.post("/AdminLogin", async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).json({ error: "Missing username or password" });
        }

        const { username, password } = req.body;

        if (username === "admin" && password === "admin") {
            return res.status(200).json({ message: "Admin login successful" });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Admin login error:", err.message);
        res.status(500).json({ error: "Failed to login" });
    }
});

router.post('/UpdateAvailable', async (req, res) => {
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

router.post('/SurgeryForm', async (req, res) => {
    try {
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
        res.status(500).json({ error: 'Failed to register surgery' });
    }
});

router.get('/RegisteredUser', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, FirstName, email, phone FROM patient_register');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching registered users:', err.message);
        res.status(500).json({ error: 'Failed to fetch registered users' });
    }
});

router.get('/DoctorDetails', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM doctor_details');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching doctors:', err.message);
        res.status(500).json({ error: 'Failed to fetch doctor details' });
    }
});

router.get('/PatientDetails', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patient_details');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching patients:', err.message);
        res.status(500).json({ error: 'Failed to fetch patient details' });
    }
});

router.get('/DocAvailable', async (req, res) => {
    try {
        const result = await pool.query("SELECT doctor_name FROM doctor_details WHERE NOT available = 'Leave'");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching available doctors:', err.message);
        res.status(500).json({ error: 'Failed to fetch info' });
    }
});

router.get('/PostOperation', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM surgery_details');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching surgery details:', err.message);
        res.status(500).json({ error: 'Failed to fetch surgery details' });
    }
});

router.get('/OTavailable', async (req, res) => {
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

router.get('/SurgicalDetails', async (req, res) => {
    try {
        const result = await pool.query("SELECT doctor_name FROM doctor_details WHERE NOT available = 'Leave'");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching surgical details:', err.message);
        res.status(500).json({ error: 'Failed to fetch info' });
    }
});

// Health check / welcome route
router.get('/', (req, res) => {
    res.json({ message: "Hospital Management Backend API is active" });
});

// Mount router on both '/' and '/api' for complete Vercel compatibility
app.use(router);
app.use('/api', router);

const PORT = process.env.PORT || 5002;
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
