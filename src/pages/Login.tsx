
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="container my-10 max-w-screen-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome Back to TemplaMarT</h1>
        <p className="mt-2 text-muted-foreground">
          Login to access your account, manage your templates, or download your purchases
        </p>
      </div>
      <LoginForm />
      {/* <div className="mt-6 text-center">
        <div className="text-sm text-muted-foreground">
          Need an admin account?{" "}
          <Link to="/admin/login" className="text-primary hover:underline">
            Admin Login
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
