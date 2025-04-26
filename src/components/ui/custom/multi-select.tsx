'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../badge';

type MultiSelectProps<Option> = {
  options: Option[];
  getValue: (option: Option) => string;
  getLabel: (option: Option) => React.ReactNode;
  selectedValues: string[];
  onSelectedValuesChagne: (values: string[]) => void;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  noSearchResultsMessage?: string;
};

export function MultiSelect<Option>(
  {
    options,
    getValue,
    getLabel,
    selectedValues,
    onSelectedValuesChagne,
    selectPlaceholder,
    searchPlaceholder,
    noSearchResultsMessage = 'No results'
  }: MultiSelectProps<Option>
) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between h-auto py-1.5 px-2 min-h-9 hover:bg-background"
        >
          <div className="flex gap-1 flex-wrap">
            {selectedValues.length > 0
              ? selectedValues.map(value => {
                const option = options.find(o => getValue(o) === value);
                if (option == null) return null;
                return <Badge key={getValue(option)} variant="outline">{getLabel(option)}</Badge>;
              })
              : <span className="text-muted-foreground">{selectPlaceholder}</span>}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{noSearchResultsMessage}</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={getValue(option)}
                  value={getValue(option)}
                  onSelect={currentValue => {
                    if (selectedValues.includes(currentValue)) {
                      onSelectedValuesChagne(selectedValues.filter(value => value !== currentValue));
                    } else {
                      return onSelectedValuesChagne([...selectedValues, currentValue]);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValues.includes(getValue(option)) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {getLabel(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
