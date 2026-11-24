import Router from 'express';
import passport from 'passport';
import controller from '../controllers/controller.js';

const router = Router();

router.get("/", controller.homeGet);

router.post('/sign-up', controller.signUpPost);

router.post("/log-in", controller.logInPost);

router.get('/protected', passport.authenticate('jwt', { session: false }), controller.protectedGet);


export {
    router
};