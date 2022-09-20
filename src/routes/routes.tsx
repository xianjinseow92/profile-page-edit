import { IRoute } from "types/index";

// Pages


export const paths = {
    HOME: "/home",
    NOT_FOUND: "/profile",
}

const routes: IRoute[] = [
    {
        path: paths.HOME,
        component: <h1>This is the main page</h1>
    },
];

export default routes;