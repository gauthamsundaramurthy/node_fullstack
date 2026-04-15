import { Router, Request, Response, NextFunction } from 'express';
import { loginController, logoutController } from '../../controllers/session/auth.controller';

const router = Router();

function alreadyLoggedIn(req: Request, res: Response, next: NextFunction) {
  if((req.session as any).user) { // make sure client sends cookies
    res.status(200).json({ // TODO update correct status code
      message: 'User already logged in'
    })
  }  else {
    next(); 
  }
}

router.post("/login", alreadyLoggedIn, loginController);

router.post("/logout", logoutController);

export default router;