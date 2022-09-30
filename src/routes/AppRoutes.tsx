import { Routes, Route, Navigate } from "react-router-dom";
import map from "lodash/map";
import get from "lodash/get";
import { IRoute } from "types";
import routes, { paths } from "./routes";
import PageLayout from "components/layout/PageLayout"; // contains header that does navigation back to main page

const AppRoutes = () => {
  return (
    <PageLayout>
      <Routes>
        {map(routes, (route: IRoute) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
        {/* Redirects to home page on every route that does not match all routes that exist */}
        <Route
          path="*"
          element={<Navigate to={get(paths, "PROFILE")} replace />}
        />
      </Routes>
    </PageLayout>
  );
};

export default AppRoutes;
