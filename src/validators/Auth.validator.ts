import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

const REGISTER_VALIDATE = [
  check('firstName').notEmpty(),
  check('email').notEmpty(),
  check('lastName').notEmpty(),
  check('userName').notEmpty(),
  check('password').notEmpty(),
  check('passwordConfirmation')
  .notEmpty()
  .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() })
    }

    return next();
  }
];

const LOGIN_VALIDATE = [
  check('userName').notEmpty(),
  check('password').notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() })
    }
    return next();
  }
];

export {
  REGISTER_VALIDATE,
  LOGIN_VALIDATE
};