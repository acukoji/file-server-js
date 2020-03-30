import { app } from "./src/app";

const PORT = process.env.PORT || '3000';
// for development, choosing 3000 to be the default port if no PORT chosen
console.log('server starting....');
const server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
    console.log('server started.');  
});

process.on('SIGINT', () => {
    server.close(() => {
      console.log('Process terminated')
    });
});

export default server;