import Dropzone from 'react-dropzone';
import { useEffect, useState } from "react";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { MyS3Client } from "@/lib/S3Client.ts";

type FileUploadComponentProps = {
  classNames: {
    wrapper: string,
    input: string,
    inner: string
  }
  setAllImageLinks: ((values: string[] | undefined) => void) | undefined
  content?: string
}

export const FileUploadComponent = ({ content, classNames, setAllImageLinks }: FileUploadComponentProps) => {

  const [allAcceptedFiles, setAllAcceptedFiles] = useState<File[]>();
  const [allLinks, setAllLinks] = useState<string[]>();

  useEffect(() => {
    if (setAllImageLinks)
      setAllImageLinks(allLinks);
  }, [allLinks]);

  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        console.log(acceptedFiles);
        setAllAcceptedFiles(acceptedFiles);
        const links: string[] = [];
        for (const file of acceptedFiles) {
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
          links.push(link);
        }
        setAllLinks(links);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <>
          <div
            className={"border-2" + classNames.wrapper}
            {...getRootProps()}>
            <input {...getInputProps()} className={classNames.input}/>
            <p className={classNames.inner}>{content ? content : "Upload New Picture"}</p>
          </div>
        </>
      )}
    </Dropzone>
  );
};
