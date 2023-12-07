import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input, Select, SelectItem,
} from "@nextui-org/react";
import React, { useReducer, useState } from "react";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { NavLink } from "react-router-dom";
import {
  RegisterFormReducer, setEmail,
  setFirstName,
  setIsMale,
  setLastName, setPassword, setPhone,
  setRole, setUserName
} from "@/features/auth/reducer/registerFormReducer.ts";
import { UserRole } from "@/utils";
import { useRegister } from "@/lib";

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [registerState, registerDispatcher] = useReducer(RegisterFormReducer, {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userName: "",
    isMale: false,
    role: ""
  });
  const [rePass, setRePass] = useState("");

  const register = useRegister();

  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validationState = React.useMemo(() => {
    if (registerState.email === "") return undefined;
    return validateEmail(registerState.email) ? "valid" : "invalid";
  }, [registerState.email]);
  const handleLogin = async () => {
    const res = await register.mutateAsync(registerState);
    if (res.success) {
      onSuccess();
    }
  };
  return (
    <>
      {/*<div className={"font-medium"}>*/}
      {/*  <div className={"mb-2"}>*/}
      {/*    Sign up with Open account*/}
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
      <Divider className="my-4"/>
      <div className={""}>
        Continue with email address
      </div>
      <form className={"flex flex-col mt-2"}>
        <div className={"flex flex-row gap-2"}>
          <Input
            autoComplete={"true"}
            isClearable
            type="text"
            label="Firstname"
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={(value) => {
              registerDispatcher(setFirstName(value));
            }}
            className="mb-4"
          />
          <Input
            autoComplete={"true"}
            isClearable
            type="text"
            label="Lastname"
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={(value) => {
              registerDispatcher(setLastName(value));
            }}
            className="mb-4"
          />
        </div>
        <div className={"flex flex-row gap-2"}>
          <Input
            autoComplete={"true"}
            isClearable
            type="text"
            label="Username"
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={(value) => {
              registerDispatcher(setUserName(value));
            }}
            className="mb-4"
          />
          <Input
            autoComplete={"true"}
            isClearable
            type="tel"
            label="phone"
            variant="bordered"
            onClear={() => console.log("input cleared")}
            onValueChange={(value) => {
              registerDispatcher(setPhone(value));
            }}
            className="mb-4"
          />
        </div>

        <Input
          autoComplete={"true"}
          isClearable
          type="email"
          label="Email"
          variant="bordered"
          validationState={validationState}
          onClear={() => console.log("input cleared")}
          onValueChange={(value) => {
            registerDispatcher(setEmail(value));
          }}
          className="mb-4"
        />

        <Input
          autoComplete={"true"}
          fullWidth={true}
          label="Password"
          variant="bordered"
          onValueChange={(value) => {
            registerDispatcher(setPassword(value));
          }}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility1}>
              {isVisible1 ? (
                <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
              ) : (
                <HiOutlineEye className="text-2xl text-default-400 pointer-events-none"/>
              )}
            </button>
          }
          type={isVisible1 ? "text" : "password"}
          className="mb-4"
        />

        <Input
          autoComplete={"true"}
          fullWidth={true}
          label="Retype Password"
          variant="bordered"
          validationState={(
            rePass === registerState.password
          ) ? "valid" : "invalid"}
          onValueChange={(value) => {
            setRePass(value);
          }}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
              {isVisible2 ? (
                <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
              ) : (
                <HiOutlineEye className="text-2xl text-default-400 pointer-events-none"/>
              )}
            </button>
          }
          type={isVisible2 ? "text" : "password"}
          className="mb-4"
        />
        <div className={"w-full flex flex-row justify-between gap-12 mb-4"}>
          {/*<Dropdown>*/}
          {/*  <DropdownTrigger>*/}
          {/*    <Button variant={"bordered"} className={"capitalize"}>*/}
          {/*      {registerState.isMale ? "Male" : "Female"}*/}
          {/*    </Button>*/}
          {/*  </DropdownTrigger>*/}
          {/*  <DropdownMenu*/}
          {/*    aria-label="Single selection example"*/}
          {/*    variant="flat"*/}
          {/*    disallowEmptySelection*/}
          {/*    selectionMode={"single"}*/}
          {/*    selectedKeys={"Male"}*/}
          {/*    onSelectionChange={(key) => {*/}
          {/*      registerDispatcher(setIsMale(key[Symbol.iterator]().next().value === "Male"));*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <DropdownItem key="Male">Male</DropdownItem>*/}
          {/*    <DropdownItem key="Female">Female</DropdownItem>*/}
          {/*  </DropdownMenu>*/}
          {/*</Dropdown>*/}

          <Select
            labelPlacement="outside"
            variant={"flat"}
            className={"capitalize"}
            defaultSelectedKeys={["Male"]}
            required={true}
            selectionMode={"single"}
            disallowEmptySelection={true}
            onSelectionChange={(key) => {
              registerDispatcher(setIsMale(key[Symbol.iterator]().next().value === "Male"));
            }}
          >
            <SelectItem key={"Male"} value={"Male"}>Male</SelectItem>
            <SelectItem key={"Female"} value={"Female"}>Female</SelectItem>
            <SelectItem key={"Other"} value={"Male"}>Other</SelectItem>
          </Select>


          {/*<Dropdown size={"lg"} className={"w-full"}>*/}
          {/*  <DropdownTrigger>*/}
          {/*    <Button variant={"bordered"} className={"capitalize"}>*/}
          {/*      {registerState.role.substring(5).replace('_', ' ').toLowerCase()}*/}
          {/*    </Button>*/}
          {/*  </DropdownTrigger>*/}
          {/*  <DropdownMenu*/}
          {/*    aria-label="Single selection Role"*/}
          {/*    variant="flat"*/}
          {/*    disallowEmptySelection*/}
          {/*    selectedKeys={[UserRole[1]]}*/}
          {/*    onSelectionChange={(key) => {*/}
          {/*      const id: number = key[Symbol.iterator]().next().value;*/}
          {/*      registerDispatcher(setRole(UserRole[id]));*/}
          {/*    }}*/}
          {/*    selectionMode={"single"}*/}
          {/*  >*/}
          {/*    <DropdownItem key={UserRole.ROLE_MANAGER}>Manager</DropdownItem>*/}
          {/*    <DropdownItem key={UserRole.ROLE_DEVELOPER}>Developer</DropdownItem>*/}
          {/*    <DropdownItem key={UserRole.ROLE_TESTER}>Tester</DropdownItem>*/}
          {/*    <DropdownItem key={UserRole.ROLE_PROJECT_LEAD}>Project Lead</DropdownItem>*/}
          {/*    <DropdownItem key={UserRole.ROLE_TEAM_LEAD}>Team Lead</DropdownItem>*/}
          {/*  </DropdownMenu>*/}
          {/*</Dropdown>*/}

          <Select
            labelPlacement="outside"
            variant={"flat"}
            className={"capitalize"}
            defaultSelectedKeys={["4"]}
            required={true}
            selectionMode={"single"}
            disallowEmptySelection={true}
            onSelectionChange={(key) => {
              console.log(key);
              const id: number = key[Symbol.iterator]().next().value;
              registerDispatcher(setRole(UserRole[id]));
            }}
          >
            <SelectItem key={UserRole.ROLE_MANAGER} value={UserRole.ROLE_MANAGER}>Manager</SelectItem>
            <SelectItem key={UserRole.ROLE_DEVELOPER} value={UserRole.ROLE_DEVELOPER}>Developer</SelectItem>
            <SelectItem key={UserRole.ROLE_TESTER} value={UserRole.ROLE_TESTER}>Tester</SelectItem>
            <SelectItem key={UserRole.ROLE_PROJECT_LEAD} value={UserRole.ROLE_PROJECT_LEAD}>Project Lead</SelectItem>
            <SelectItem key={UserRole.ROLE_TEAM_LEAD} value={UserRole.ROLE_TEAM_LEAD}>Team Lead</SelectItem>
          </Select>


        </div>


        <Button
          fullWidth={true}
          color={"primary"}
          onClick={handleLogin}
        >SIGN UP
        </Button>
      </form>
      <div className={"mt-4"}>
        <span>Don’t have an account? </span>
        <NavLink to={"../login"} className={"text-primary"}>
          Sign in
        </NavLink>
      </div>
    </>
  );
};
