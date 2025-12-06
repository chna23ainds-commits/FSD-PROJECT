const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        console.log('Seeding database with test user...');

        const password = await bcrypt.hash('admin123', 10);

        const result = await pool.query(
            `INSERT INTO users (email, password_hash, name, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email`,
            ['test@test.com', password, 'Test User']
        );

        if (result.rows.length > 0) {
            console.log('Test user created:', result.rows[0]);
        } else {
            console.log('Test user already exists');
        }

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
