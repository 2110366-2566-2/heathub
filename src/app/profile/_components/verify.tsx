"use client";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/components/ui/upload";
import {
  faArrowUpFromBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Image from "next/image";
import { DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function Verify({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(-1);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { toast } = useToast();
  const router = useRouter();
  const { startUpload, permittedFileInfo } = useUploadThing(
    "verifiedUploader",
    {
      onClientUploadComplete: () => {
        setProgress(-1);
        toast({
          title: "Upload Complete",
          description: "Your ID card has been uploaded successfully",
          duration: 3000,
          variant: "success",
        });
        router.refresh();
        onClose();
      },
      onUploadError: () => {
        toast({
          title: "Upload Failed",
          description: "Your ID card failed to upload",
          duration: 3000,
          variant: "error",
        });
      },
      onUploadProgress: (progress) => {
        setProgress(progress);
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
    if (!file || files.length === 0) {
      return;
    }
    const url = URL.createObjectURL(file);
    setUrl(url);
  }, [files]);

  function disableButton() {
    const submitButton = document.getElementById("submit-button");
    const cancelButton = document.getElementById("cancel-button");
    if (submitButton && cancelButton) {
      submitButton.setAttribute("disabled", "true");
      cancelButton.setAttribute("disabled", "true");
    }
  }

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
            size={"lg"}
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
          className="self-center rounded-lg object-cover"
          alt="ID Card"
        />
      )}
      {progress >= 0 && <Progress value={progress} />}
      <div className="flex flex-row gap-1">
        <FontAwesomeIcon
          icon={faCircleInfo}
          size={"1x"}
          className="text-medium"
        />
        <span className="small text-medium">
          Your uploaded ID card photo is used solely for verification and will
          be promptly deleted after the process for your privacy.
        </span>
      </div>
      <div className="flex flex-row justify-end gap-3">
        <Button
          id="cancel-button"
          variant="secondaryOutline"
          className="border-medium text-medium disabled:border-neutral-300 disabled:text-neutral-300"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          id="submit-button"
          variant="secondary"
          onClick={async () => {
            if (files.length === 0) {
              toast({
                title: "No file selected",
                description: "Please select a file to upload",
                variant: "error",
              });
              return;
            }
            disableButton();
            await startUpload(files);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
