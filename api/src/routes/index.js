import authRoute from './auth';
import userRoute from './user';


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to Refinery Dashboard Backend API');
    });
    console.log("called o");
    app.use('/auth', authRoute);
    app.use('/users', userRoute);
};