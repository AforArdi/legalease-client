import { cn } from "@heroui/react";

export const RoleCard = (props) => {
    const { children, description, icon, buttonText, value, selectedValue, onSelect, ...otherProps } = props;
    const isSelected = value === selectedValue;

    return (
        <div
            onClick={() => onSelect(value)}
            className={cn(
                "inline-flex m-0 bg-[#EAECE8] hover:bg-[#E0E3DD] items-stretch justify-start",
                "flex-col w-full max-w-[380px] cursor-pointer border-none transition-all",
                "p-0",
                isSelected ? "ring-2 ring-[#0F3523]" : ""
            )}
            style={{ clipPath: "polygon(0 25px, 25px 0, 100% 0, 100% 100%, 0 100%)" }}
            {...otherProps}
        >
            <div className="flex flex-col h-full w-full">
                <div className="p-8 flex flex-col flex-1">
                    <div className="w-12 h-12 bg-[#1B3B2B] text-[#71927F] flex items-center justify-center rounded-sm mb-6 mt-2">
                        {icon}
                    </div>

                    <h3 className="text-2xl font-bold text-[#0A2519] mb-4">
                        {children}
                    </h3>

                    <p className="text-sm text-gray-700 leading-relaxed mb-8 flex-1">
                        {description}
                    </p>
                </div>

                {/* Bottom Button Area */}
                <div className="w-full bg-[#0A2519] text-white text-center py-4 text-sm font-semibold mt-auto">
                    {buttonText}
                </div>
            </div>
        </div>
    );
};