"use client";
import { FC, useState, useEffect, useId } from "react";
import type {
  AutoCompleteProps,
  AutoCompleteOption,
} from "@/types/inputs.type";
import { Controller, useWatch } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Icon from "../utils/Icon";

const AutoComplete: FC<AutoCompleteProps> = ({
  label,
  name,
  control,
  suggestions,
  setValue,
  errors,
  multiSelect = false,
  suggestKey = "id",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<AutoCompleteOption[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    AutoCompleteOption[]
  >([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const inputUniqueID = useId();
  const watchedValue = useWatch({ name, control });

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

  const handleDeselect = (
    suggestion: AutoCompleteOption,
    onChange: (value: any) => void
  ) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.id !== suggestion.id
    );
    setSelectedItems(newSelectedItems);
    onChange(multiSelect ? newSelectedItems.map((item) => item.id) : null);
    setInputValue("");
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
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <>
            <div className="relative">
              <input
                autoComplete="off"
                placeholder="Type to search . . ."
                id={inputUniqueID}
                type="text"
                value={
                  selectedItems.length === 1
                    ? selectedItems[0].name
                    : selectedItems.length > 1
                    ? `${selectedItems.length} item${
                        selectedItems.length > 1 ? "s" : ""
                      } selected`
                    : inputValue
                }
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsSuggestionsVisible(true)}
                onBlur={() =>
                  setTimeout(() => setIsSuggestionsVisible(false), 500)
                }
                className="input"
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
                        <p>{suggestion.name}</p>
                      </div>

                      {selectedItems.some(
                        (item) => item.id === suggestion.id
                      ) && <span className="checkmark">✔</span>}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* {selectedItems.length > 0 && (
              <div className="selected-items mt-2 flex flex-wrap gap-2">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="selected-item inline-flex items-center bg-primary rounded-full px-3 py-1 text-sm font-medium relative"
                  >
                    <span>{item.name}</span>
                    <RxCross2
                      className="cursor-pointer text-xl absolute -top-1 -right-1 bg-error rounded-full p-1"
                      onClick={() => handleDeselect(item, onChange)}
                    />
                  </div>
                ))}
              </div>
            )} */}

            {errors && errors[name] && (
              <p className="mt-1 text-sm text-error">
                {errors[name]?.message as string}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default AutoComplete;
