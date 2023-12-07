import { NavLink, useParams } from "react-router-dom";
import { ContentLayout } from "@/components";
import { useBoolean, useCopyToClipboard } from "usehooks-ts";
import { Button, Spinner, Switch } from "@nextui-org/react";
import { HiOutlineCheck, HiOutlineLink, HiOutlinePencil, HiOutlineXMark } from "react-icons/hi2";
import { Suspense, useState } from "react";
import { BugComponent } from "@/features/bugs/components/BugComponent.tsx";
import { AddNewBugInitialStateType, usePatchBug } from "@/features";
import { queryClient } from "@/lib";

export const Bug = () => {
  const { projectName: _projectName, bugKey } = useParams();
  const projectName = _projectName?.replaceAll('-', ' ');
  const [value, copy] = useCopyToClipboard();
  const [linkCopied, setLinkCopied] = useState(false);
  const isAuthor = useBoolean(false);
  const isEditable = useBoolean(false);
  const isBugUpdating = useBoolean(false);

  const [tempState, setTempState] = useState<AddNewBugInitialStateType>();

  const updateBug = usePatchBug({
    config: {
      onSuccess: () => {
        isBugUpdating.setFalse();
        queryClient.refetchQueries(["bug/", tempState?.project.id, tempState?.id]);
        queryClient.refetchQueries(["bug", tempState?.project.id]);
      }
    }
  });
  const handleBugUpdate = () => {
    console.log(tempState);
    isBugUpdating.setTrue();
    if (tempState) {
      updateBug.mutate(tempState);
    }
  };

  return (
    <ContentLayout title={bugKey || ""}>
      <div className={"flex flex-row flex-wrap justify-between"}>
        <div className="text-sm ds-breadcrumbs">
          <ul>
            <li><NavLink to={"/app"}><span>App</span></NavLink></li>
            <li>
              <span>Bugs</span>
            </li>
            <li><NavLink to={`/app/bugs/${_projectName}`}><span>{projectName}</span></NavLink></li>
            <li>{bugKey}</li>
          </ul>
        </div>
        <div className={"flex flex-row gap-4"}>
          <Button
            size={"sm"}
            variant={"flat"}
            color={"primary"}
            isLoading={linkCopied}
            startContent={value ? <HiOutlineCheck size={"22"}/> : <HiOutlineLink size={"22"}/>}
            onClick={() => {
              setLinkCopied(true);
              setTimeout(() => setLinkCopied(false), 500);
              setTimeout(() =>
                  copy(`${import.meta.env.VITE_APP_URL}/app/bugs/${_projectName}/${bugKey}`)
                , 500);
              setTimeout(() => copy(""), 10000);
            }}
          >
            {value ? "Link Copied" : "Copy link"}
          </Button>
          {isAuthor.value && <Button
              size={"sm"}
              variant={"flat"}
              color={"danger"}
              startContent={<HiOutlineXMark size={"22"}/>}
          >
              Delete
          </Button>}
          {isAuthor.value && isEditable.value && <Button
              size={"sm"}
              variant={"flat"}
              color={"secondary"}
              onClick={() => handleBugUpdate()}
              isLoading={isBugUpdating.value}
              startContent={<HiOutlinePencil size={"22"}/>}
          >
              Update
          </Button>}
          {
            isAuthor && <Switch isSelected={isEditable.value} onValueChange={() => isEditable.toggle()}>Edit</Switch>
          }
        </div>
      </div>
      <div className={"pt-4 "}>
        <Suspense fallback={<div className={"flex  w-full justify-center item-center"}>
          <Spinner size={"lg"}/>
        </div>}>
          <BugComponent setTempState={setTempState} isAuthor={isAuthor} isEditable={isEditable}
                        projectName={projectName || ""}
                        bugKey={bugKey || "ZZZ0"}/>
        </Suspense>
      </div>

    </ContentLayout>
  );
};
