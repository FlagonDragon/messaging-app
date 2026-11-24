import Router from 'express';
import controller from '../controllers/controller.js';

const router = Router();

router.get("/", controller.homeGet);

router.post('/sign-up', controller.signUpPost);

router.post("/log-in", controller.logInPost);


export {
    router
};