// src/components/dialog/Dialog.tsx
"use client";
import { useDialogStore } from "@/stores/dialog.store";
import { dialogHeaderIcon } from "@/constants/dialog/dialogData";
import { TiDelete } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

export const Dialog = () => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const { isOpen, content, closeDialog } = useDialogStore();
  const currentIcon = dialogHeaderIcon[content?.kind || "Custom"];

  const onSubmit = (data: any) => {

    let finalData =
      content?.kind === "Add"
        ? { ...data, id: uuid() }
        : content?.kind === "Edit"
        ? data
        : data?.id;
    content?.actions?.[content?.kind]?.(finalData);
    console.log(finalData);
    closeDialog();
  };

  useEffect(() => {
    if (isOpen) {
      if (content?.kind === "Add") {
        console.log('add values reseted');
        
        reset({});
      } else {
        console.log('edit/delete values reseted');
        reset(content?.defaultValues || {}, { keepValues: false });
      }
    }
  }, [isOpen, reset,content?.actions, content?.defaultValues, content?.kind]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-muted/80 bg-opacity-50">
      <div className="bg-background rounded-lg p-6  shadow-lg  w-full md:w-2/3 lg:w-2/3 xl:w-1/4 2xl:w-1/2 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex justify-between items-center">
            <div className="flex items-center justify-center space-x-1">
              {<currentIcon.Icon className={`text-2xl ${currentIcon.color}`} />}
              <h2 className="text-xl font-semibold ">{content?.title}</h2>
            </div>

            <div className="btn btn-ghost p-0">
              <TiDelete
                className="text-3xl text-muted "
                onClick={closeDialog}
              />
            </div>
          </div>
          <hr className="text-muted" />
          <div className=" content mb-4">
            {!!content?.message && (
              <div>
                <p>{content?.message}</p>
              </div>
            )}
            {!!content?.array &&
              content.array?.map((item, index) => (
                <item.Component
                  name={item.name}
                  label={item?.label}
                  type={item?.type}
                  register={register}
                  errors={errors}
                  control={control}
                  suggestions ={item?.suggestions}
                 
                  key={`${item.name}/${index}`}
                />
              ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={closeDialog} className="btn btn-secondary ">
              Close
            </button>

            <button type="submit" className="btn btn-primary">
              {content?.kind}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
