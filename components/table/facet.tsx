import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Column } from "@tanstack/react-table";
import {
  CheckIcon,
  ChevronDown,
  Command,
  FilterIcon,
  List,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";

{
  /* <DropdownMenu>
                  <DropdownMenuTrigger className="border-none focus:border-none focus:outline-none">
                    
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["PENDING", "APPROVED", "REJECTED", "COMPLETED"].map(
                      (status, idx) => {
                       
                        return (
                          <DropdownMenuItem
                            key={idx}
                            className="flex gap-4"
                           
                          >
                            <div
                              className={`size-3 rounded-full ${
                                status === "PENDING"
                                  ? "bg-[#FFA800]"
                                  : status === "APPROVED"
                                  ? "bg-[#00C108]"
                                  : status === "COMPLETED"
                                  ? "bg-[#8BC4FF]"
                                  : "bg-[#FF3030]"
                              }`}
                            ></div>
                            {status}
                          </DropdownMenuItem>
                        );
                      }
                    )}
                  </DropdownMenuContent>
                </DropdownMenu> */
}

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: string[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  let selectedValues = useMemo(() => {
    return new Set(column?.getFilterValue() as string[]);
  }, [column]);
  const params = useSearchParams();
  const filterValue = params.get("filter") || "";
  useEffect(() => {
    if (filterValue) {
      column?.setFilterValue(Array.from(selectedValues));
    }
  }, [filterValue, column, selectedValues]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-2 border border-[#E5E5E5] bg-white hover:opacity-65 h-[2.25rem] gap-2 px-4 text-[16px] rounded-[5px] flex justify-evenly items-center cursor-pointer">
          <p>{title}</p>
          {selectedValues?.size > 0 ? (
            <>
              <Badge className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option))
                    .map((option) => (
                      <Badge
                        key={option}
                        className={`${
                          option === "Draft"
                            ? "bg-[#475569]"
                            : option === "Pending"
                            ? "bg-[#D97706]"
                            : option === "Issued"
                            ? "bg-primary"
                            : option === "Delivered"
                            ? "bg-[#059669]"
                            : option === "Closed"
                            ? "bg-[#475569]"
                            : "bg-[#059669]"
                        } rounded-sm px-1 font-normal`}
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          ) : (
            <>
              <ChevronDown size={18} />
            </>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] p-0" align="start">
        <Input placeholder={title} name="status" />
        <DropdownMenuGroup>
          {options.map((option) => {
            if (filterValue) {
              selectedValues = new Set([filterValue]);
            }
            const isSelected = selectedValues.has(option);
            return (
              <DropdownMenuItem
                key={option}
                onSelect={() => {
                  if (isSelected) {
                    selectedValues.delete(option);
                  } else {
                    selectedValues.add(option);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className={cn("h-4 w-4")} />
                </div>
                <span
                  className={`${
                    option === "Draft"
                      ? "text-[#475569]"
                      : option === "Pending"
                      ? "text-[#D97706]"
                      : option === "Issued"
                      ? "text-primary"
                      : option === "Delivered"
                      ? "text-[#059669]"
                      : option === "Closed"
                      ? "text-[#475569]"
                      : "text-[#059669]"
                  }`}
                >
                  {option}
                </span>
                {facets?.get(option) && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {facets.get(option)}
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        {selectedValues.size > 0 && (
          <>
            <Separator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => {
                  column?.setFilterValue(undefined);
                  selectedValues.clear();
                }}
                className="justify-center text-center"
              >
                Clear filters
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
