import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MyS3Client } from "@/lib/S3Client.ts";
import { PutObjectCommand } from "@aws-sdk/client-s3";

type EditorComponentProps = {
  contentState: EditorState,
  isDisabled: boolean,
  shouldReset: boolean,
  setResetFalse: () => void,
  stateChangeHandler: (value: string) => void,
  setIsEditorActive: Dispatch<SetStateAction<boolean>>
}

export const EditorComponent = ({
                                  contentState,
                                  isDisabled,
                                  setResetFalse,
                                  shouldReset,
                                  stateChangeHandler,
                                  setIsEditorActive
                                }: EditorComponentProps) => {

  const [editorState, setEditorState] = useState(contentState);

  useEffect(() => {
    stateChangeHandler(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }, []);

  useEffect(() => {
    if (shouldReset) {
      setResetFalse();
      setEditorState(EditorState.createEmpty());
    }
  }, [shouldReset]);


  return (
    <>
      <Editor
        toolbarHidden={isDisabled}
        readOnly={isDisabled}
        editorState={editorState}
        onEditorStateChange={(state) => {
          setEditorState(state);
          stateChangeHandler(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
        }}
        onFocus={() => {
          setIsEditorActive(true);
        }}
        toolbar={{
          inline: {
            bold: { className: `aria-selected:bg-primary` }
          },
          image: {
            isDropdown: true,
            uploadEnabled: true,
            urlEnabled: true,
            className: 'demo-option-custom',
            popupClassName: 'demo-popup-custom',
            previewImage: true,
            defaultSize: {
              height: '300',
              width: '400',
            },
            uploadCallback: async (file: File) => {
              const uri = URL.createObjectURL(file);
              const fileName = uri.substring(27) + `${file.lastModified}` + `${file.size}`;
              await MyS3Client.send(new PutObjectCommand({
                Bucket: `${import.meta.env.VITE_AWS_BUCKET_NAME}`,
                Key: fileName,
                Body: file,
                ACL: "public-read",
                ContentType: file.type
              }));
              const link = `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
              return Promise.resolve({ data: { link } });
            }
          }
        }}
      />
    </>
  );
};
