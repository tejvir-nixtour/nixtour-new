import { useState } from 'react';
// import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';

import { airLines, timeOptions } from './filterOptions';

type FlightFiltersProps = {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      departureTimeRange: { start: string; end: string };
      arrivalTimeRange: { start: string; end: string };
      priceRange: [number, number];
      stops: {
        nonStop: Boolean;
        oneStop: Boolean;
        twoPlusStop: Boolean;
      };
      airline: string;
      duration: string;
      directFlight: boolean;
    }>
  >;
};

// Utility for classnames
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export const FlightFilters: React.FC<FlightFiltersProps> = ({ setFilters }) => {
  // const [filters, setLocalFilters] = useState({
  //   departureTimeRange: { start: '', end: '' },
  //   arrivalTimeRange: { start: '', end: '' },
  //   priceRange: [Number, Number],
  //   stops: {
  //     nonStop: true,
  //     oneStop: true,
  //     twoPlusStop: true,
  //   },
  //   airline: '',
  //   duration: 'any',
  //   directFlight: false,
  // });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [stops, setStops] = useState({
    nonStop: true,
    oneStop: true,
    twoPlusStop: true,
  });
  const [departureTimeRange, setDepartureTimeRange] = useState<{
    start: string;
    end: string;
  }>({ start: '', end: '' });
  const [arrivalTimeRange, setArrivalTimeRange] = useState<{
    start: string;
    end: string;
  }>({ start: '', end: '' });

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 w-[90dvw] md:w-[340px] bg-white rounded-xl border shadow-sm my-10 space-y-6">
      <h2 className="text-xl font-semibold">Filter Flights</h2>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Price Range
        </h4>
        <Slider
          min={0}
          max={100000}
          step={100}
          className="bg-[#BC1110] hover:bg-[#BC1110]/90 text-[#BC1110]"
          value={priceRange}
          onValueChange={(val) => {
            setPriceRange(val as [number, number]);
            setFilters((previous) => ({
              ...previous,
              priceRange: val as [number, number],
            }));
          }}
        />
        <p className="text-sm text-muted-foreground mt-2">
          ₹{priceRange[0]} – ₹{priceRange[1]}
        </p>
      </div>

      {/* Stops */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Stops</h4>
        <div className="space-y-2">
          {[
            { label: 'Non-stop', key: 'nonStop' },
            { label: '1 Stop', key: 'oneStop' },
            { label: '2+ Stop', key: 'twoPlusStop' },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={stops[key as keyof typeof stops]}
                color="[#BC1110]"
                onCheckedChange={(checked) => {
                  setStops((prev) => ({
                    ...prev,
                    [key]: !!checked,
                  }));
                  setFilters((previous) => ({
                    ...previous,
                    stops: { ...stops, [key]: !!checked },
                  }));
                }}
              />
              <label htmlFor={key} className="text-sm">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Departure Time
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {timeOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDepartureTimeRange((prev) =>
                  prev.start === option.value.start
                    ? { start: '', end: '' }
                    : option.value
                );

                setFilters((previous) => ({
                  ...previous,
                  departureTimeRange:
                    previous.departureTimeRange.start === option.value.start
                      ? { start: '', end: '' }
                      : option.value,
                }));
              }}
              className={cn(
                'border rounded-md p-2 text-xs flex flex-col items-center text-center transition shadow-sm',
                departureTimeRange.start === option.value.start
                  ? 'bg-blue-100 border-blue-500 text-blue-700 ring-1 ring-blue-300'
                  : 'hover:bg-muted'
              )}
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Arrival Time */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Arrival Time
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {timeOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                setArrivalTimeRange((prev) =>
                  prev.start === option.value.start
                    ? { start: '', end: '' }
                    : option.value
                );

                setFilters((previous) => ({
                  ...previous,
                  arrivalTimeRange:
                    previous.arrivalTimeRange.start === option.value.start
                      ? { start: '', end: '' }
                      : option.value,
                }));
              }}
              className={cn(
                'border rounded-md p-2 text-xs flex flex-col items-center text-center transition shadow-sm',
                arrivalTimeRange.start === option.value.start
                  ? 'bg-blue-100 border-blue-500 text-blue-700 ring-1 ring-blue-300'
                  : 'hover:bg-muted'
              )}
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Airline Select */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Airline</h4>
        <Select onValueChange={(val) => handleSelectChange('airline', val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Airline" />
          </SelectTrigger>
          <SelectContent>
            {airLines.map((airline) => (
              <SelectItem key={airline.code} value={airline.code}>
                {airline.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Apply Button */}
      {/* <div>
        <Button
          className="w-full bg-primary text-white hover:bg-primary/90"
          onClick={() =>
            setFilters({
              priceRange,
              stops,
              arrivalTimeRange,
              departureTimeRange,
              directFlight: filters.directFlight,
              duration: filters.duration,
              airline: filters.airline,
            })
          }
        >
          Apply Filters
        </Button>
        <Button
          className="w-full bg-blue-500 mt-4 text-white hover:bg-primary/90"
          onClick={() => {
            // Reset all UI-related state
            setPriceRange([1000, 100000]);
            setStops({
              nonStop: true,
              oneStop: true,
              twoPlusStop: true,
            });
            setDepartureTimeRange({ start: '', end: '' });
            setArrivalTimeRange({ start: '', end: '' });

            // Reset filters in parent
            setFilters({
              departureTimeRange: { start: '', end: '' },
              arrivalTimeRange: { start: '', end: '' },
              priceRange: [0, 100000],
              stops: {
                nonStop: true,
                oneStop: true,
                twoPlusStop: true,
              },
              airline: '',
              duration: 'any',
              directFlight: false,
            });
          }}
        >
          Reset Filters
        </Button>
      </div> */}
    </div>
  );
};
