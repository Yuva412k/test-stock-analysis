import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DateRange {
  from?: Date;
  to?: Date;
}

interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onSelect: (range: DateRange | undefined) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ from, to, onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    onSelect(range);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-lg">
          <CalendarIcon size={16} />
          {from && to ? (
            <span>
              {from.toLocaleDateString()} - {to.toLocaleDateString()}
            </span>
          ) : (
            <span>Select Date Range</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-[#1b1a1a] text-white p-4 rounded-lg shadow-lg">
        <DayPicker
          mode="range"
          selected={from || to ? { from, to } : undefined}
          onSelect={handleSelect}
          numberOfMonths={2}
          required={false}
          className="bg-[#1b1a1a] text-white"
        />
      </PopoverContent>
    </Popover>
  );
};