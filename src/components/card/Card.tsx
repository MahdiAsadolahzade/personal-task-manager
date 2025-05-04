import { TDialogActions, TDialogKind } from "@/types/dialog.type";
import { MouseEventHandler } from "react";
import { FC } from "react";
import { CardHeaderIcon } from "@/constants/card/cardData";
import { v4 as uuid } from "uuid";
import Icon from "../utils/Icon";

interface CardProps {
  title: string;
  actions?: Partial<Record<TDialogKind, MouseEventHandler<HTMLButtonElement>>>;
  data: any[];
  selectedValue: any;
  setSelectedValue: Function;
  laoding?: boolean;
  configuration?: {
    showColor?: boolean;
    showIcon?: boolean;
    iconKey?: string;
  };
}

const Card: FC<CardProps> = ({
  title,
  data,
  actions,
  setSelectedValue,
  selectedValue,
  laoding,
  configuration = {
    showColor: true,
    showIcon: true,
    iconKey: "src",
  },
}) => {
  if (laoding) {
    return <div className="card animate-pulse w-full h-64"></div>;
  }
  return (
    <div className="card">
      <h2 className="card-header flex justify-between items-center">
        <div>
          <p>{title}</p>
        </div>

        <div className="flex gap-2">
          {actions &&
            Object.entries(actions).map(([key, value]) => {
              const { Icon } = CardHeaderIcon[key as TDialogKind];
              return (
                <button
                  key={key}
                  className="btn btn-ghost btn-sm p-0"
                  onClick={value}
                  disabled={
                    (key === "Edit" || key === "Delete") &&
                    (!selectedValue || selectedValue?.length === 0)
                  }
                >
                  <Icon className="text-2xl" />
                </button>
              );
            })}
        </div>
      </h2>

      <div className="space-y-2">
        {!!data &&
          data.map((item) => {
            const isSelected = selectedValue?.id === item?.id;

            return (
              <div
                className={`hover:bg-base2 cursor-pointer ${
                  isSelected ? "border-[1px] border-primary" : ""
                }`}
                onClick={() => {
                  !!setSelectedValue && setSelectedValue(item);
                }}
                key={`${uuid()}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {configuration.showIcon &&
                       (
                        <span className={`text-2xl ${item.color}`}>
                          <Icon
                            alt=""
                            src={
                              item[configuration?.iconKey ?? "src"] ??
                              "/icons/icon-192x192.png"
                            }
                          />
                        </span>
                      )}

                    <span>{item.name}</span>
                  </div>
                  {!!item?.color && configuration.showColor && (
                    <span
                      style={{
                        backgroundColor:
                          item?.color ?? "var(--color-foreground)",
                      }}
                      className="w-5 h-5 rounded-full border-2 border-muted"
                    ></span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Card;
