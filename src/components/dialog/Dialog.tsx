// src/components/dialog/Dialog.tsx
"use client";
import { useDialogStore } from "@/stores/dialog.store";
import { dialogHeaderIcon } from "@/constants/dialog/dialogData";
import { TiDelete } from "react-icons/ti";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDynamicForm } from "@/lib/dynamicUseForm";
import { motion } from "framer-motion";
import Icon from "../utils/Icon";

export const Dialog = () => {
  const { isOpen, content, closeDialog } = useDialogStore();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    unregister,
  } = useDynamicForm(content?.schema);

  const dialogLogic = {
    saveButton: content?.kind !== "Info",
    buttonTitle:
      content?.kind === "Custom"
        ? !!content.customConfig
          ? content.customConfig.buttonTitle
          : content.kind
        : content?.kind,
    headerIcon:
      content?.kind === "Custom"
        ? {
            Icon: content?.customConfig?.headerIcon,
            color: content?.customConfig?.headerIconColor,
          }
        : dialogHeaderIcon[content?.kind || "Custom"],
  };

  const currentIcon = dialogLogic?.headerIcon;

  const onSubmit = (data: any) => {
    const finalData =
      content?.kind === "Add"
        ? { ...data, id: uuid() }
        : content?.kind === "Edit" || content?.kind === "Custom"
          ? data
          : data?.id;
    console.log(finalData);

    content?.actions?.[content?.kind]?.(finalData);

    closeDialog();
  };

  useEffect(() => {
    if (isOpen) {
      if (content?.kind === "Add") {
        reset({}, { keepValues: false, keepDirtyValues: false });
      } else {
        console.log(content?.defaultValues);
        
        reset(content?.defaultValues || {}, { keepValues: false });
      }
    } else {
      reset({}, { keepValues: false, keepDirtyValues: false });
    }
  }, [isOpen, content?.defaultValues, content?.kind, content, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-muted/80 ">
      <div className="bg-background rounded-lg p-6  shadow-lg  w-full md:w-2/3 lg:w-2/3  max-h-[90vh] h-fit ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex justify-between items-center">
            <div className="flex items-center justify-center space-x-1">
              <Icon
                alt="icon"
                className={`w-6 h-6 ${currentIcon.color}`}
                src={currentIcon?.Icon}
              />
              <h2 className="text-xl font-semibold ">{content?.title}</h2>
            </div>

            <motion.div
              className="btn btn-ghost p-0"
              initial={{ opacity: 0, scale: 0.8, color: "var(--color-muted)" }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ color: "var(--color-error)" }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <TiDelete className="text-3xl " onClick={closeDialog} />
            </motion.div>
          </div>
          <hr className="text-muted" />
          <div className=" content mb-4">
            {!!content?.message && (
              <div className="text-wrap">
                <p>{content?.message}</p>
              </div>
            )}
            {!!content?.array && (
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-2  max-h-[70vh] overflow-auto p-1`}
              >
                {content.array?.map((item, index) => {
                  if (!item.show || item.show(watch))
                    return (
                      <item.Component
                        name={item.name}
                        label={item?.label}
                        type={item?.type}
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        unregister={unregister}
                        getValues={getValues}
                        errors={errors}
                        control={control}
                        suggestions={item?.suggestions}
                        suggestionKey={item?.suggestionKey}
                        kind={content?.kind}
                        key={`${item.name}/${index}`}
                      />
                    );
                })}
              </div>
            )}

            {content?.CustomComponent && (
              <content.CustomComponent {...content?.customContnet} />
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={closeDialog} className="btn btn-secondary ">
              Close
            </button>

            {dialogLogic.saveButton && (
              <button type="submit" className="btn btn-primary">
                {dialogLogic?.buttonTitle}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
