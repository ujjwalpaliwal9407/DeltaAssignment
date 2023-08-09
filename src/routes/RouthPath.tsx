import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Paths } from "./path";
import NotFound from "../components/notFound/NotFound";
import SignUpSection from "../pages/signUpSection/SignUpSection";
import SignInSection from "../pages/signInSection/SignInSection";
import HomeSection from "../pages/homeSection/HomeSection";
import Layout from "../components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../logic/redux/store/hooks";
import { setLoggedDetail, setLoggedIn } from "../logic/redux/action/action";
import MemberSection from "../pages/memberSection/MemberSection";

export interface RouteDefinition {
  element: any;
  routes?: RouteDefinition[];
  path: string;
  protected?: boolean;
  redirect?: any;
  title?: string;
  requires?: any;
  pathType?: number;
}

const NotFoundRoute: RouteDefinition = {
  path: "*",
  element: NotFound,
  protected: false,
  title: "",
};

export const routes: RouteDefinition[] = [
  {
    path: Paths.signUp,
    element: SignUpSection,
    protected: false,
    title: "Sign Up",
  },
  {
    path: Paths.signIn,
    element: SignInSection,
    protected: false,
    title: "Sign In",
  },
  {
    path: Paths.home,
    element: HomeSection,
    protected: false,
    title: "Home",
  },
  {
    path: Paths.addMember,
    element: MemberSection,
    protected: true,
    title: "Member",
  },
].concat(NotFoundRoute as any);

const RoutePath = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  function getRouteRenderWithAuth(isLoggedIn: boolean, route: RouteDefinition) {
    const RouteComponent = route.requires
      ? route.requires(route.element)
      : route.element;

    if (!isLoggedIn && !route.protected) {
      return { element: <RouteComponent /> };
    } else if (!isLoggedIn && route.protected) {
      return { element: <Navigate to={Paths.signIn} /> };
    } else if (isLoggedIn === route.protected) {
      return { element: <RouteComponent /> };
    } else if (isLoggedIn && route.path === "*") {
      return { element: <RouteComponent /> };
    } else if (isLoggedIn) {
      return { element: <RouteComponent /> };
    }
  }

  const mapRoutes = (route: RouteDefinition, i: number) => {
    const render = getRouteRenderWithAuth(isLoggedIn, route);
    return <Route key={i} path={route.path} {...render} />;
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
    if (currentUser.length !== 0) {
      dispatch(setLoggedIn(true));
      dispatch(
        setLoggedDetail([
          {
            userName: currentUser?.userName,
            email: currentUser?.email,
          },
        ])
      );
    }
  }, []);

  return (
    <Layout>
      <Routes>{routes.map(mapRoutes)}</Routes>
    </Layout>
  );
};
export default RoutePath;
