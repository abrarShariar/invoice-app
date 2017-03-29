/*
*   all API routes are defined here
*/
import { Router, Request, Response } from 'express';
import { HomeController } from '../controllers/home.controller';

const router: Router = Router();
// instantiating controllers

/*
* API endpoints are defined here 
* all routes start with /api
*/
router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to API routes");
});

router.get('/home', (req: Request, res: Response) => {
    HomeController.getHome(req, res);
});

router.get('/home/person/all',(req:Request, res:Response) => {
    HomeController.getAllPerson(req,res);
});



export const ApiRoute: Router = router;
