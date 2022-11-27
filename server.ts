import './src/config/mongoose-config';
import app from './src/app';



const server = app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});

server.on('error', (error) => {
    console.log(`Server error: ${error}`);
});