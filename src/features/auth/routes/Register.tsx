import { useNavigate } from "react-router-dom";

import { Layout, RegisterForm } from "@/features";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Sign Up">
      <RegisterForm onSuccess={() => navigate("/auth/login")}/>
    </Layout>
  );
};
