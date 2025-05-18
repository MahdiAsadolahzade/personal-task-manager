"use client";
import { FC, useState, useEffect, useId } from "react";
import type {
  AutoCompleteProps,
  AutoCompleteOption,
} from "@/types/inputs.type";
import { Controller, useWatch } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Icon from "../utils/Icon";
import { shortenText } from "@/lib/utils/strings";
import { getNestedError } from "@/lib/utils/fieldErrors";

const AutoComplete: FC<AutoCompleteProps> = ({
  label,
  name,
  control,
  suggestions,
  errors,
  multiSelect = false,
  suggestKey = "id",
  register,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<AutoCompleteOption[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    AutoCompleteOption[]
  >([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const inputUniqueID = useId();
  const watchedValue = useWatch({ name, control, defaultValue: "" });
  const fieldError = getNestedError(errors, name);
  useEffect(() => {
    setFilteredSuggestions(
      suggestions?.filter((suggestion) =>
        suggestion?.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, suggestions]);

  useEffect(() => {
    if (multiSelect) {
      const selected = suggestions?.filter((s) => watchedValue?.includes(s.id));
      setSelectedItems(selected);
    } else {
      const matchedSuggestion = suggestions.find((s) => s.id === watchedValue);

      setSelectedItems(matchedSuggestion ? [matchedSuggestion] : []);
    }
  }, [watchedValue, suggestions, multiSelect]);

  const handleSuggestionClick = (
    suggestion: AutoCompleteOption,
    onChange: (value: any) => void
  ) => {
    if (multiSelect) {
      const isAlreadySelected = selectedItems?.find(
        (item) => item?.id === suggestion?.id
      );
      const newSelectedItems = isAlreadySelected
        ? selectedItems?.filter((item) => item?.id !== suggestion?.id)
        : [...selectedItems, suggestion];
      setSelectedItems(newSelectedItems);
      onChange(
        newSelectedItems.map(
          (item) => item?.[suggestKey as keyof AutoCompleteOption]
        )
      );
    } else {
      const isSelected = selectedItems[0]?.id === suggestion.id;
      if (isSelected) {
        setSelectedItems([]);
        onChange(null);
      } else {
        setSelectedItems([suggestion]);
        onChange(suggestion?.[suggestKey as keyof AutoCompleteOption]);
      }
      setIsSuggestionsVisible(false);
    }
  };
 

  const isReadOnly =
    (multiSelect && selectedItems.length > 0) ||
    (!multiSelect && selectedItems.length === 1);

  return (
    <div className="w-full autocomplete">
      <label htmlFor={inputUniqueID} className="label">
        {label}
      </label>
      <Controller
        name={`${name}-control`}
        control={control}
        defaultValue={""}
        render={({ field: { onChange } }) => (
          <>
            <div className="relative">
              <input
                autoComplete="off"
                placeholder="Type to search . . ."
                id={inputUniqueID}
                {...register(name, {
                  setValueAs: (value) => {
                    return value;
                  },
                })}
                type="text"
                value={
                  selectedItems.length === 1
                    ? shortenText(selectedItems[0].name, 40)
                    : selectedItems.length > 1
                      ? `${selectedItems.length} item${
                          selectedItems.length > 1 ? "s" : ""
                        } selected`
                      : inputValue
                }
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsSuggestionsVisible(true)}
                onBlur={() =>
                  setTimeout(() => setIsSuggestionsVisible(false), 200)
                }
                className={`input ${fieldError && "input-error"}`}
                readOnly={isReadOnly}
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setIsSuggestionsVisible(!isSuggestionsVisible)}
              >
                {isSuggestionsVisible ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>

            {isSuggestionsVisible && filteredSuggestions?.length > 0 && (
              <ul className="suggestions-list">
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion, onChange)}
                    className={`suggestion-item ${
                      selectedItems.some((item) => item.id === suggestion.id)
                        ? "selected"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start space-x-2 items-center">
                        {!!suggestion?.src && (
                          <Icon alt={suggestion.name} src={suggestion.src} />
                        )}
                        <p>{shortenText(suggestion.name, 40)}</p>
                      </div>

                      {selectedItems.some(
                        (item) => item.id === suggestion.id
                      ) && <span className="checkmark">✔</span>}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {fieldError && (
              <p className="mt-1 text-sm text-error">
                {fieldError?.message as string}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default AutoComplete;
