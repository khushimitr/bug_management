import { PropsWithChildren } from "react";
import { UserType } from "@/global";
import { Avatar } from "@nextui-org/react";
import { HiOutlineUser } from "react-icons/hi2";

type CommentProps = PropsWithChildren<{
  user: UserType
}>;

export const Comment = ({ children, user }: CommentProps) => {
  return (
    <div className={"flex flex-row items-start gap-4"}>
      <div>
        <Avatar isBordered={true} radius={"full"} src={user.profileUrl} fallback={<HiOutlineUser size={"22"}/>}/>
      </div>
      <div className={"basis-[90%]"}>
        {children}
      </div>
    </div>
  );
};
