import { Router, Request, Response } from 'express';
// Here is import different routers
import { CustomerRouter } from './customer.router';

const router: Router = Router();

router.use('/customers', CustomerRouter);

router.get('/', async (req: Request, res: Response) => {
    return res.json({
        message:"Welcome to the index page"
    });
});

export const IndexRouter: Router = router;