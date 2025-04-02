
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="container my-10 max-w-screen-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Join TemplaMarT</h1>
        <p className="mt-2 text-muted-foreground">
          Create an account to purchase templates or become a seller
        </p>
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
