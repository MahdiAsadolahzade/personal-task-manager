'use client'
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

export function useDynamicForm<T extends FieldValues>(
  schema?: ZodSchema
): UseFormReturn<T> {
  return useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onTouched",
    shouldUnregister: true,
  });
}