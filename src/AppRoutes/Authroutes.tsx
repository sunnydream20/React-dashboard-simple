import { Route, Routes } from "react-router-dom";
import SignIn from "../Components/Auth/SignIn";
import SignupForm from "../Components/Auth/Signup";
import ForgotPassword from "../Components/Auth/ForgotPassword";

const AuthRoutes = () => {
   return (
      <Routes>
         <Route path="/signin" element={<SignIn />} />
         <Route path="/signup" element={<SignupForm />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
   );
};

export default AuthRoutes;
