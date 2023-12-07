import { Button, Checkbox, Divider, Input, Link } from "@nextui-org/react";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "@/lib";
import { useAppDispatch } from "@/hooks";
import { addUser } from "@/store";
import { ImGithub } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useBoolean } from "usehooks-ts";


type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const login = useLogin();
  const isUserLoginLoading = useBoolean(false);
  const isDemoUserLoginLoading = useBoolean(false);
  const handleLogin = async () => {
    isUserLoginLoading.setTrue();
    const res = await login.mutateAsync({ username: email, password: password });
    if (res.success) {
      isUserLoginLoading.setFalse();
      dispatch(addUser(res.data));
      onSuccess();
    } else {
      isUserLoginLoading.setFalse();
      setIsError(true);
    }
  };
  const handleDemoLogin = async () => {
    isDemoUserLoginLoading.setTrue();
    const res = await login.mutateAsync({ username: "kk@gmail.com", password: "12345" });
    if (res.success) {
      isDemoUserLoginLoading.setFalse();
      dispatch(addUser(res.data));
      onSuccess();
    } else {
      isDemoUserLoginLoading.setFalse();
      setIsError(true);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      {/*<div className={"font-medium"}>*/}
      {/*  <div className={"mb-4"}>*/}
      {/*    Sign in with Open account*/}
      {/*  </div>*/}
      {/*  <div className={"flex flex-row justify-between gap-2"}>*/}
      {/*    <Button*/}
      {/*      color={"default"}*/}
      {/*      variant={"ghost"}*/}
      {/*      fullWidth={true}*/}
      {/*    >*/}
      {/*      <FcGoogle size={"22"}/>*/}
      {/*      Google*/}
      {/*    </Button>*/}

      {/*    <Button*/}
      {/*      color={"default"}*/}
      {/*      variant={"ghost"}*/}
      {/*      fullWidth={true}*/}
      {/*    >*/}
      {/*      <ImGithub size={"22"}/>*/}
      {/*      Github*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Divider className="my-8"/>
      <div className={""}>
        Continue with email address
      </div>
      <form className={"flex flex-col mt-4"}>
        <Input
          autoComplete={"true"}
          isClearable
          type="email"
          label="Email"
          variant="bordered"
          validationState={isError ? "invalid" : "valid"}
          onClear={() => console.log("input cleared")}
          onValueChange={(email) => {
            setEmail(email);
            setIsError(false);
          }}
          className="mb-8"
        />

        <Input
          autoComplete={"true"}
          fullWidth={true}
          label="Password"
          variant="bordered"
          validationState={isError ? "invalid" : "valid"}
          onValueChange={(pass) => {
            setPassword(pass);
            setIsError(false);
          }}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
              ) : (
                <HiOutlineEye className="text-2xl text-default-400 pointer-events-none"/>
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="mb-4"
        />
        <div className={"w-full flex flex-row justify-between gap-12 mb-12"}>
          <Checkbox size="sm">Remember Me</Checkbox>
          <Link size={"sm"}>Password Recovery</Link>
        </div>
        <div className={"flex flex-col gap-2"}>
          <Button
            fullWidth={true}
            color={"primary"}
            onClick={handleLogin}
            isLoading={isUserLoginLoading.value}
          >LOGIN
          </Button>
          <Button
            fullWidth={true}
            color={"default"}
            onClick={handleDemoLogin}
            isLoading={isDemoUserLoginLoading.value}
          >DEMO LOGIN
          </Button>
        </div>
      </form>
      <div className={"mt-4"}>
        <span>Don’t have an account? </span>
        <NavLink to={"../register"} className={"text-primary"}>
          Sign up
        </NavLink>
      </div>
    </>
  )
    ;
};
