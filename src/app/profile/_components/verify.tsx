"use client";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/components/ui/upload";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Image from "next/image";

export default function Verify() {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "verifiedUploader",
    {
      onClientUploadComplete: () => {
        alert("uploaded successfully!");
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
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    setUrl(url);
  }, [files]);
  return (
    <div>
      <div
        className=" flex h-32 w-full rounded-xl border-2 border-dashed border-medium hover:cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className="text-secondary-500"
            size="2x"
          />
          <div className="h6 text-medium hover:text-secondary-300">
            Upload ID Card
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Button variant="outline" className="border-medium text-medium">
          Back to Profile
        </Button>
        <Button variant="secondary" onClick={() => startUpload(files)}>
          Submit
        </Button>
      </div>
      {url ? (
        <Image
          src={url}
          width={200}
          height={200}
          className="rounded-lg object-cover"
          alt="New Profile Image"
        />
      ) : (
        <div className="h-[200px] w-[200px] bg-slate-300"></div>
      )}
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
