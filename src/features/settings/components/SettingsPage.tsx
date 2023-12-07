import { Button, Image, Input, Switch } from "@nextui-org/react";
import { useUser } from "@/lib";
import { FileUploadComponent } from "@/components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

export const SettingsPage = () => {

  const path = useLocation();
  const user = useUser();
  const [imageLink, setImageLink] = useState<string[]>([]);
  const setAllImageLinks = (values: string[] | undefined) => {
    setImageLink(values ? values : []);
  };
  return (
    <div className={"relative flex flex-row gap-8"}>
      <aside className={"basis-2/4 block"}>
        <div className={"sticky top-0 left-0 flex flex-col gap-4"}>
          <NavHashLink
            smooth={true}
            to={"#settings/profile"}
            className={`block px-2 py-3 hover:bg-default-100 rounded-lg ${path.hash === "#settings/profile" ? "hover:bg-default bg-default" : ""}`}
          >
            Profile
          </NavHashLink>
          <NavHashLink
            smooth={true}
            to={"#settings/login"}
            className={`block px-2 py-3 hover:bg-default-100 rounded-lg ${path.hash === "#settings/login" ? "hover:bg-default bg-default" : ""}`}
          >
            login
          </NavHashLink>
          <NavHashLink
            smooth={true}
            to={"#settings/notification"}
            className={`block px-2 py-3 hover:bg-default-100 rounded-lg ${path.hash === "#settings/notification" ? "hover:bg-default bg-default" : ""}`}
          >
            Notifications
          </NavHashLink>
        </div>
      </aside>

      <div className={"flex flex-col w-full gap-10"}>

        <div className={"flex flex-col justify-start gap-4"}>
          <div id={"settings/profile"} className={"flex flex-row items-center gap-2"}>
            <div className={"inline-block rounded-lg h-10 w-5 bg-primary-200"}></div>
            <div className={"text-2xl font-medium inline-block"}>Profile Information</div>
          </div>
          <div className={"w-full flex flex-col justify-start gap-8"}>
            <div className={"flex flex-row flex-wrap items-center gap-4"}>
              <Image
                radius={"full"}
                src={user.data?.data?.profileUrl}
                height={72}
                width={72}
              />
              <FileUploadComponent
                classNames={
                  {
                    wrapper: "border-none shrink-0",
                    input: "",
                    inner: "bg-primary transition-all active:bg-primary-600 active:scale-95 text-primary-foreground rounded-xl py-4 px-5"
                  }
                }
                content={"+ Upload New "}
                setAllImageLinks={setAllImageLinks}
              />
              <div className={"h-10 border"}></div>
              <div className={"flex-1"}>
                <Input
                  variant={"bordered"}
                  fullWidth={true}
                  placeholder={"Enter Random String Token"}
                  label={"New Avatar"}
                />
              </div>
            </div>
            <div className={"w-full flex flex-row items-start gap-2"}>
              <div className={"basis-1/2"}>
                <Input
                  label={"First Name"}
                  variant={"bordered"}
                />
              </div>
              <div className={"basis-1/2"}>
                <Input
                  label={"Last Name"}
                  variant={"bordered"}
                />
              </div>
            </div>
            <Input
              label={"Username"}
              variant={"bordered"}
            />
            <Input
              label={"email"}
              variant={"bordered"}
            />
          </div>
        </div>

        <div className={"h-[1px] w-full border-t-1"}></div>

        <div className={"flex flex-col justify-start gap-4"}>
          <div id={"settings/login"} className={"flex flex-row items-center gap-2"}>
            <div className={"inline-block rounded-lg h-10 w-5 bg-secondary-200"}></div>
            <div className={"text-2xl font-medium inline-block"}>Login</div>
          </div>
          <div className={"w-full flex flex-col justify-start gap-8"}>
            <Input
              label={"Old Password"}
              variant={"bordered"}
            />
            <div className={"flex flex-row items-center gap-2"}>
              <Input
                label={"New Password"}
                variant={"bordered"}
              />
              <Input
                label={"Confirm Password"}
                variant={"bordered"}
              />
            </div>
            <div>
              <Button
                color={"primary"}
              >Update Password</Button>
            </div>
          </div>
        </div>

        <div className={"h-[1px] w-full border-t-1"}></div>

        <div className={"flex flex-col justify-start gap-4"}>
          <div id={"settings/notification"} className={"flex flex-row items-center gap-2"}>
            <div className={"inline-block rounded-lg h-10 w-5 bg-warning-200"}></div>
            <div className={"text-2xl font-medium inline-block"}>Notifications</div>
          </div>
          <div className={"w-full flex flex-col justify-start gap-8"}>
            <div className={"flex flex-row flex-wrap items-center justify-between"}>
              <div>Bug updates and Project announcements</div>
              <Switch defaultSelected={true}/>
            </div>
            <div className={"flex flex-row flex-wrap items-center justify-between"}>
              <div>Company Newsletter</div>
              <Switch defaultSelected={false}/>
            </div>
            <div className={"flex flex-row flex-wrap items-center justify-between"}>
              <div>Comments</div>
              <Switch defaultSelected={true}/>
            </div>
            <div className={"flex flex-row flex-wrap items-center justify-between"}>
              <div>Purchases</div>
              <Switch defaultSelected={false}/>
            </div>
          </div>
        </div>
        <div className={"h-[1px] w-full border-t-1"}></div>
        <div className={"py-10"}>
          <Button
            color={"primary"}
          >Save</Button>
        </div>
      </div>
    </div>
  );
};
