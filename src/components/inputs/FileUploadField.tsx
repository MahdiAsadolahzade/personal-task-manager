"use client";
import { FC, useRef, useId, useState, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { convertFileToBase64 } from "@/lib/upload/convertFileToBase64";
import { RxCross2 } from "react-icons/rx";
import type { FileUploadProps } from "@/types/inputs.type";

const FileUpload: FC<FileUploadProps> = ({
  control,
  name,
  label,
  errors,
  accept = "*", // default to all types
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
    const watchedValue = useWatch({ name, control });



  return (
    <div className="w-full">
      <label htmlFor={inputId} className="label">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const handleFileChange = async (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const base64 = await convertFileToBase64(file);
            onChange(base64);
            setFilePreview(file.type.startsWith("image/") ? base64 : null);
            setFileName(file.name);
            e.target.value = ""; // reset file input
          };

          const triggerFileInput = () => fileInputRef.current?.click();

          const handleRemove = () => {
            setFilePreview(null);
            setFileName("");
            onChange(null);
          };

          useEffect(() => {
            if (!watchedValue) {
              setFileName("");
              setFilePreview(null);
              onChange(null);
            }
          }, [watchedValue]);

          return (
            <>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {value ? "Replace File" : "Upload File"}
                </button>
                {value && (
                  <div className="flex items-center gap-2">
                    {filePreview && (
                      <img
                        src={filePreview}
                        alt="preview"
                        className="w-10 h-10 rounded border"
                      />
                    )}
                    <span className="text-sm truncate max-w-[150px]">{fileName}</span>
                    <RxCross2
                      onClick={handleRemove}
                      className="text-red-500 cursor-pointer text-xl"
                    />
                  </div>
                )}
                <input
                  id={inputId}
                  type="file"
                  accept={accept}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {errors && errors[name] && (
                <p className="mt-1 text-sm text-error">
                  {errors[name]?.message as string}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default FileUpload;
