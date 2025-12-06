const pool = require('../config/database');

const migrateDatabase = async () => {
    try {
        console.log('Running database migrations...');

        const result = await pool.query(
            `SELECT EXISTS(
        SELECT 1 FROM information_schema.tables WHERE table_name = 'users'
      )`
        );

        if (result.rows[0].exists) {
            console.log('Database is already up to date!');
        } else {
            console.log('No tables found. Run: npm run db:setup');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1);
    }
};

migrateDatabase();
