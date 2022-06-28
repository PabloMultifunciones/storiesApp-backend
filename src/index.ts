import app from './app';
import database from './database';

database();
const PORT = app.get('PORT');
const server = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api`);
});

export default { app, server };
