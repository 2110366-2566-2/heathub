"use client";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/components/ui/upload";
import { faArrowUpFromBracket, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Image from "next/image";

export default function Verify({onCloseHandler}:{onCloseHandler:Function}) {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "verifiedUploader",
    {
      onClientUploadComplete: () => {
        onCloseHandler();
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys({ image: { maxFileSize: "4MB" } })
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    const file = files[0];
    if (!file||files.length === 0) {
      return;
    }
    const url = URL.createObjectURL(file);
    setUrl(url);
  }, [files]);
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="h3 font-bold text-high">Identical Verification</div>
        <div className="h6 text-medium">
          Your ID Card photo will use to compare with your profile photo.
        </div>
      </div>
      <div
        className=" flex h-[129px] w-full rounded-xl border-2 border-dashed border-primary-500 hover:cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className="text-secondary-500"
            size={"2x"}
          />
          <div className="h6 text-medium hover:text-secondary-300">
            Upload ID Card
          </div>
        </div>
      </div>
      {url && (
        <Image
          src={url}
          width={200}
          height={200}
          className="rounded-lg object-cover"
          alt="New Profile Image"
        />
      )}
      <div className="flex flex-row gap-1">
        <FontAwesomeIcon icon={faCircleInfo} size={"1x"} className="text-medium"/>
        <span className="small text-medium">
          Your uploaded ID card photo is used solely for verification and will
          be promptly deleted after the process for your privacy.
        </span>
      </div>
      <div className="flex flex-row gap-3 justify-end">
        <Button
          variant="secondaryOutline"
          className="border-medium text-medium"
          onClick={() => {
            onCloseHandler();
          }}
        >
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => startUpload(files)}>
          Submit
        </Button>
      </div>
    </div>
  );
}

{
  /* <UploadDropzone
config={{
  appendOnPaste: false,
}}
endpoint="verifiedUploader"
appearance={{
  allowedContent: "hidden",
  //   button: "hidden",
}}
onBeforeUploadBegin={(files) => {
  // Do something before upload begins
  console.log("Uploading");
  return files;
}}

onClientUploadComplete={(res) => {
  // Do something with the response
  console.log("Files: ", res);
  alert("Upload Completed yeah");
  if (res.length > 0) {
    const file = res[0];
    if (file?.url) {
      setUrl(file.url);
    }
  }
}}
content={{
  uploadIcon: (
    <FontAwesomeIcon
      icon={faArrowUpFromBracket}
      className="text-secondary-500"
      size="2x"
    />
  ),
  label: (
    <div className="h6 text-medium hover:text-secondary-300">
      Upload ID Card
    </div>
  ),
}}
/> */
}
