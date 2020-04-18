import { Router, Request, Response } from 'express';
// Here is import different routers
import { OrderRouter } from './order.router';
import { OrderItemRouter } from './orderitems.router';

const router: Router = Router();

router.use('/orders', OrderRouter);
router.use('/orderitems', OrderItemRouter);

router.get('/', async (req: Request, res: Response) => {
    return res.json({
        message:"Welcome to the index page"
    });
});

export const IndexRouter: Router = router;