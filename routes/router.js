import Router from 'express';
import passport from 'passport';
import controller from '../controllers/controller.js';

const router = Router();

router.get("/", controller.homeGet);

router.get("/users", controller.usersGet);

router.post('/sign-up', controller.signUpPost);

router.post("/log-in", controller.logInPost);

router.get('/protected', passport.authenticate('jwt', { session: false }), controller.protectedGet);

router.post("/chat", controller.chatPost);

router.get("/user-chats/:userId", controller.userChatsGet);

router.post("/message", controller.messagePost);

export {
    router
};