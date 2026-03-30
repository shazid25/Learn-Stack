"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import useConstructUrl from "@/hooks/use-construct-url";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface iAppProps {
  value?: string;
  onChange?: (value: string) => void;
  fileTypeAccepted: "image" | "video";
}

export function Uploader({ value, onChange, fileTypeAccepted }: iAppProps) {
  const fileUrl = useConstructUrl(value || "");
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: fileTypeAccepted,
    key: value,
    objectUrl: value ? fileUrl : undefined,
  });

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({ ...prev, uploading: true, progress: 0, error: false }));

      try {
        // 1. Get Presigned URL
        const presignedResponse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: fileTypeAccepted === "image",
          }),
        });

        if (!presignedResponse.ok) {
          const errorData = await presignedResponse.json();
          throw new Error(errorData.error || "Failed to get upload URL");
        }

        const { presignedUrl, key } = await presignedResponse.json();

        // 2. Upload to S3 via XHR
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setFileState((prev) => ({ ...prev, progress: percent }));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              setFileState((prev) => ({ ...prev, uploading: false, key }));
              onChange?.(key);
              toast.success("Upload successful");
              resolve();
            } else {
              reject(new Error(`S3 Error: ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network error during S3 upload. Check CORS."));
          
          xhr.open("PUT", presignedUrl);
          // CRITICAL: Must match the contentType sent to the API route exactly
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        console.error("Upload Error:", error);
        toast.error(errorMessage);
        setFileState((prev) => ({ ...prev, uploading: false, error: true }));
      }
    },
    [fileTypeAccepted, onChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState((prev) => ({
          ...prev,
          file,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
        }));

        uploadFile(file);
      }
    },
    [fileState.objectUrl, uploadFile]
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.key) return;
    try {
      setFileState((prev) => ({ ...prev, isDeleting: true }));
      const res = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: fileState.key }),
      });

      if (!res.ok) throw new Error("Delete failed");

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");
      setFileState({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: fileTypeAccepted,
        id: null,
        isDeleting: false,
        key: undefined,
      });
      toast.success("File removed");
    } catch {
      toast.error("Error removing file");
      setFileState((prev) => ({ ...prev, isDeleting: false }));
    }
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypeAccepted === "video" ? { "video/*": [] } : { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: fileTypeAccepted === "image" ? 5 * 1024 * 1024 : 500 * 1024 * 1024,
    onDropRejected: (rejections) => {
      rejections.forEach((r) => toast.error(r.errors[0].message));
    },
    disabled: fileState.uploading || (!!fileState.key && !fileState.error),
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-all w-full h-64",
        isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary",
        (fileState.uploading || !!fileState.key) && "cursor-default"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />
        {fileState.uploading ? (
          <RenderUploadingState file={fileState.file!} progress={fileState.progress} />
        ) : fileState.error ? (
          <RenderErrorState />
        ) : fileState.objectUrl ? (
          <RenderUploadedState
            handleRemoveFile={handleRemoveFile}
            previewUrl={fileState.objectUrl}
            isDeleting={fileState.isDeleting}
            fileType={fileState.fileType}
          />
        ) : (
          <RenderEmptyState isDragActive={isDragActive} />
        )}
      </CardContent>
    </Card>
  );
}
