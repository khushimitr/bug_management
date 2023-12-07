import { useNavigate } from "react-router-dom";

import { Layout, LoginForm } from "@/features";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Sign In">
      <LoginForm
        onSuccess={() => {
          navigate("/app");
        }}
      />
    </Layout>
  );
};
