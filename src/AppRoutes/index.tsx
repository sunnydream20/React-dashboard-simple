import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Drawer from "../Components/Drawer/Drawer";

export default function AllRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  return <Drawer />;
}
