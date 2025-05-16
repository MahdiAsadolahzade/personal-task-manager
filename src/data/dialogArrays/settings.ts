
import AutoComplete from "@/components/inputs/AutoComplete";
import TextArea from "@/components/inputs/TextArea";
import TextField from "@/components/inputs/TextField";
import { TFieldArray } from "@/types/dialog.type";

export const getRequestsArray = (): TFieldArray[] => {
  const subjects = [
    { id: "1", name: "Report Bug" ,src:'/icons/bug-report.svg' },
    { id: "2", name: "Contact Support",src:'/icons/contact.svg' },
    { id: "3", name: "Feature Request",src:'/icons/feature.svg' },
    { id: "4", name: "General Inquiry",src:'/icons/general.svg' },
  ];

  return [
    { name: "name", label: "Your Name", Component: TextField },

    {
      name: "subject",
      label: "Subject",
      Component: AutoComplete,
      suggestions: subjects,
    },
    {
      name: "description",
      label: "Description",
      Component: TextArea,
      type: "text",
    },
  ];
};
