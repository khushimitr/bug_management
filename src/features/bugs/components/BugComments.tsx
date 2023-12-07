import { ApiResponse, BugType } from "@/global";
import { UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useReducer, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useBoolean } from "usehooks-ts";
import { EditorComponent } from "@/components";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Comment } from "@/features/bugs/components/Comment.tsx";
import { useAppSelector } from "@/hooks";
import { Button, Spinner } from "@nextui-org/react";
import {
  AddNewCommentActions,
  AddNewCommentReducer,
  AddNewCommentReducerInitialState
} from "@/features/bugs/reducer/AddNewCommentReducer.ts";
import { useAddNewComment } from "@/features";
import { queryClient } from "@/lib";
import draftToHtml from "draftjs-to-html";

type BugCommentsProps = {
  Bug: UseQueryResult<ApiResponse<BugType>, unknown>
}

const BugComments = ({ Bug }: BugCommentsProps) => {

  const user = useAppSelector(state => state.user.entities);

  const [descriptionState, setDescriptionState] = useState("");
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [contentState] = useState(EditorState.createEmpty());
  const shouldEditorReset = useBoolean(false);

  const editorRef = useDetectClickOutside({
    onTriggered: () => {
      setIsEditorActive(false);
    }
  });
  const [isEditorHovered, setIsEditorHovered] = useState(false);
  const [addNewCommentState, addNewCommentDispatcher] = useReducer(AddNewCommentReducer, AddNewCommentReducerInitialState);

  useEffect(() => {
    addNewCommentDispatcher(AddNewCommentActions.setAddNewCommentSetState({
      content: descriptionState,
      commenter: { id: user?.id || -1 },
      referredBug: { id: Bug?.data?.data?.id || -1 },
      referredProject: { id: Bug?.data?.data?.project.id || -1 }
    }));
  }, [Bug]);

  const addNewComment = useAddNewComment({
    config: {
      onSuccess: () => {
        queryClient.refetchQueries(["bug/", Bug?.data?.data?.project.id, Bug?.data?.data?.id]);
        shouldEditorReset.setTrue();
      }
    }
  });

  const syncEditorState = (value: string) => {
    addNewCommentDispatcher(AddNewCommentActions.setAddNewCommentContent(value));
    setDescriptionState(value);
  };

  const handleClear = () => {
    shouldEditorReset.setTrue();
  };

  const handleCommentSubmit = () => {
    addNewComment.mutate(addNewCommentState);
  };

  if (!user) {
    return <Spinner/>;
  }

  return (
    <div className={"p-4"}>
      <div className={"p-2 mb-4"}>
        <Comment user={user}>
          <div
            ref={editorRef}
            data-hover={!isEditorActive && isEditorHovered}
            data-focus={isEditorActive}
            onMouseEnter={() => setIsEditorHovered(true)}
            onMouseLeave={() => setIsEditorHovered(false)}
            className={"group flex flex-col data-[has-helper=true]:pb-4 w-full mb-2"}>
            <div
              className={`relative w-full tap-highlight-transparent flex-row items-center shadow-sm p-1 gap-3 border-medium border-default-200 group-data-[hover=true]:border-default-400 group-data-[focus=true]:border-foreground h-unit-10 min-h-unit-10 rounded-medium !h-auto transition-background !duration-150 transition-colors motion-reduce:transition-none`}>
              <EditorComponent
                contentState={contentState}
                isDisabled={false}
                setResetFalse={shouldEditorReset.setFalse}
                shouldReset={shouldEditorReset.value}
                stateChangeHandler={syncEditorState}
                setIsEditorActive={setIsEditorActive}/>
            </div>
          </div>
        </Comment>
        <div className={"flex flex-row gap-4 justify-end px-8"}>
          <Button
            onClick={handleClear}
            color={"danger"}
            variant={"flat"}
          >Clear</Button>
          <Button
            color={"primary"}
            variant={"flat"}
            onClick={handleCommentSubmit}
          >Comment</Button>
        </div>
      </div>
      <div className={"flex flex-col gap-4"}>
        {Bug.data?.data?.comments.map((comment) => (
          <Comment key={comment.id} user={comment.commenter}>
            <div
              className={"relative w-full tap-highlight-transparent flex-row items-center shadow-sm p-2 gap-3 border-medium border-default-200 group-data-[hover=true]:border-default-400 group-data-[focus=true]:border-foreground h-unit-10 min-h-unit-10 rounded-medium !h-auto transition-background !duration-150 transition-colors motion-reduce:transition-none"}
              dangerouslySetInnerHTML={{
                __html: draftToHtml(convertToRaw(convertFromRaw(JSON.parse(comment.content))))
              }}>
            </div>
          </Comment>
        ))}
      </div>
    </div>
  );
};
export default BugComments;
