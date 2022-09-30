import { IRoute } from "types/index";

// Pages
import Profile from "pages/Profile";

export const paths = {
    HOME: "/home",
    PROFILE: "/profile",
}

const routes: IRoute[] = [
    // {
    //     path: paths.HOME,
    //     component: <h1>This is the main page</h1>
    // },
    {
        path: paths.PROFILE,
        component: <Profile/>
    }
];

export default routes;