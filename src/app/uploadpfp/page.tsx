"use client";

import { UploadDropzone } from "@/components/ui/upload";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useState } from "react";

import Image from "next/image";

export default function UploadProfileImage() {
  const [newUrl, setNewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) {
        redirect("/signin");
      }
    },
  });
  const confirm = api.profile.confirmNewProfileImage.useMutation();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Using</h2>
      <UploadDropzone
        endpoint="profileUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          if (res.length > 0) {
            const file = res[0];
            if (file?.url) {
              setNewUrl(file.url);
            }
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
      />
      {newUrl ? (
        <Image
          src={newUrl}
          width={200}
          height={200}
          className="rounded-lg object-cover"
          alt="New Profile Image"
        />
      ) : (
        <div className="h-[200px] w-[200px] bg-slate-300"></div>
      )}
      <button
        onClick={() => {
          setIsSubmitting(true);
          confirm.mutate(undefined, {
            onSuccess: () => {
              setIsSubmitting(false);
              alert("Profile Image Updated!");
              setNewUrl(null);
            },
            onError: (error) => {
              setIsSubmitting(false);
              if (error instanceof Error) {
                alert(`ERROR! ${error.message}`);
              }
            },
          });
        }}
        disabled={!newUrl || isSubmitting}
        className="rounded-lg bg-slate-800 p-4 text-white disabled:cursor-not-allowed disabled:bg-slate-300 "
      >
        {isSubmitting ? "Loading..." : "Confirm"}
      </button>
    </main>
  );
}
