import { Router, Request, Response } from 'express';
// Here is import different routers
import { RestaurantRouter } from './restaurant.router';
import { MenuRouter } from './menu.router';
import { MenuItemRouter } from './menuitems.router';

const router: Router = Router();


router.use('/restaurants', RestaurantRouter);
router.use('/menus', MenuRouter);
router.use('/menuitems', MenuItemRouter);

router.get('/', async (req: Request, res: Response) => {
    return res.json({
        message:"Welcome to the index page"
    });
});

export const IndexRouter: Router = router;