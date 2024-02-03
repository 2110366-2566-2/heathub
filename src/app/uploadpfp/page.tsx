"use client";

import { UploadButton } from "@/components/ui/upload";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";

export default function UploadProfileImage() {
  api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data) {
        redirect("/signin");
      }
    },
    onError(_err) {
      redirect("/signin");
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="profileUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
