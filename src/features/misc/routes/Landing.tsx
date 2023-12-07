import HomeImage from "@/assets/Images/homescreen.png";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib";

export const Landing = () => {
  const user = useUser();
  const navigate = useNavigate();
  return (
    <>
      <div className={"h-screen flex flex-row justify-center"}>
        <div className={"basis-1/2 ml-16 mt-32 flex flex-col gap-4 items-start"}>
          <div>
            <h1 className={"text-8xl"}>Bring All</h1>
            <h1 className={"text-8xl"}>Teams</h1>
            <h1 className={"text-8xl"}>Together</h1>
          </div>
          <h2 className={"text-lg mt-4"}> Unlock the power of seamless bug tracking across multiple teams and members
            with our feature-rich webapp. Streamline your workflow, enhance collaboration, and supercharge productivity
            as you take control of every bug, ensuring a smoother development process. Get ready to transform the way
            you handle issues and enjoy a more efficient and effective bug tracking experience.</h2>
          <Button radius={"full"} color={"primary"} size={"lg"} onClick={() => {
            if (user.data?.success) {
              navigate("/app/");
            } else {
              navigate("/auth/login");
            }
          }}>
            Try For Free
          </Button>
        </div>
        <div className={"basis-1/2 mt-6"}>
          <img className={"w-full h-full object-cover"} src={HomeImage} alt={"Home Image"}/>
        </div>
      </div>
    </>
  )
    ;
};
