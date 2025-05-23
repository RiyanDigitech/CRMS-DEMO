// src/components/modules/marketing/file-uploader.tsx

import React from "react";
import { Upload } from "antd";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";
import { notification } from "antd";

const { Dragger } = Upload;

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "video/mp4",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const handleBeforeUpload = (file: File) => {
  if (!allowedMimeTypes.includes(file.type)) {
    notification.error({
      message: "File type not allowed",
      description:
        "Some files are invalid. Allowed file types: JPG, PNG, PDF, Excel, MP4",
      placement: "topRight",
    });
    console.error("File type not allowed");
    return Upload.LIST_IGNORE;
  }
  if (file.size > MAX_FILE_SIZE) {
    notification.error({
      message: "File size exceeds the 10MB limit",
      description: "Some files are invalid. Maximum file size allowed is 10MB",
      placement: "topRight",
    });
    console.error("File size exceeds the 10MB limit");
    return Upload.LIST_IGNORE;
  }
  return true;
};
interface FileUploaderProps {
  /**
   * The combined file list (existing + new).
   */
  fileList: UploadFile[];
  /**
   * Fired whenever user adds/removes files
   * in the Dragger UI.
   */
  onFileListChange: (updatedFileList: UploadFile[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileList,
  onFileListChange,
}) => {
  // We'll build a props object for Dragger
  const props: UploadProps = {
    name: "file",
    multiple: true,
    beforeUpload: handleBeforeUpload,
    // We handle the request ourselves, so just call onSuccess immediately:
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess?.("done");
      }, 0);
    },
    // The current fileList
    fileList: fileList,
    // Handle changes in the Dragger
    onChange(info) {
      // 'info.fileList' has the updated array of UploadFile
      onFileListChange(info.fileList);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: {
      showRemoveIcon: true,
      showPreviewIcon: false,
      showDownloadIcon: false,
    },
  };

  return (
    <Dragger {...props}>
      <div className="h-7"></div>
      <div className="relative inline-block">
        <img src="/File.svg" alt="File Icon" className="w-16 h-16" />
        <img
          src="/Arrow_up.svg"
          alt="Upload Icon"
          className="absolute w-4 h-4 bottom-[1px] right-1"
        />
      </div>
      <p className="text-[12px] mt-2">
        Drag and drop file here or{" "}
        <span className="font-bold underline">Choose File</span>
      </p>
      <div className="h-7"></div>
    </Dragger>
  );
};

export default FileUploader;
