import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
// import { Checkbox } from '../../components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../../components/ui/select';
// import { CalendarIcon } from 'lucide-react';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '../../components/ui/popover';
import { DatePicker } from 'antd';
// import { format } from 'date-fns';
import dayjs from 'dayjs';

export const PassengerForm: React.FC = () => {
  const [dob, setDob] = useState<Date | any>();
  const [passportDetils, setPassportDetails] = useState<boolean>(false);

  return (
    <div className="flex-1 justify-center p-4">
      <Card className="w-full border rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Who's travelling?
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-gray-800 mb-2 font-semibold">
              Passenger "ADT"
            </h3>
            <div className="flex gap-4 md:justify-between flex-wrap">
              <div className="text-lg space-y-1 w-fit mr-2">
                <Label>Title on ID *</Label>
                <Select>
                  <SelectTrigger className="outline-none rounded-xl">
                    <SelectValue placeholder="Select Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr</SelectItem>
                    <SelectItem value="ms">Mrs</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-40">
                <Label htmlFor="givenName">Given name(s) *</Label>
                <Input
                  id="givenName"
                  placeholder="Enter first name"
                  className="text-lg rounded-xl my-2 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="flex-1 min-w-40">
                <Label htmlFor="surname">Surname *</Label>
                <Input
                  id="surname"
                  placeholder="Enter last name"
                  className="text-lg rounded-xl my-2 placeholder:text-gray-400"
                  //   {isSurname ? required : disabled}
                />
                {/* <div className="flex items-center gap-2 mt-2">
                  <Checkbox id="noSurname" />
                  <Label htmlFor="noSurname" className="text-sm text-gray-600">
                    This passenger has no last name (surname)
                  </Label>
                </div> */}
              </div>

              {/* <div>
              <Label>Gender on ID *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

              <div className="flex-1 space-y-2 min-w-40">
                <Label>Date of Birth *</Label>
                <DatePicker
                  className="w-full focus:outline-none rounded-xl placeholder:text-gray-400 text-lg h-[35px]"
                  id="dob"
                  placeholder="Select Date of Birth"
                  value={dob}
                  format="DD MMM YYYY"
                  disabledDate={(current) => {
                    return current && current.isAfter(dayjs().startOf('day'));
                  }}
                  onChange={(date) => setDob(date)}
                />
                {/* <Input
                  type="date"
                  className="w-full focus:outline-none rounded-xl placeholder:text-gray-400 text-lg"
                  id="dob"
                  placeholder="Select Date of Birth"
                  value={dob}
                  //   format="DD MMM YYYY"
                  onChange={(e) => setDob(e?.target?.value)}
                  required
                /> */}
                {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dob ? format(dob, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <DatePicker
                    className="w-full focus:outline-none font-bold border-none"
                    id="departure-date"
                    placeholder="Select Departure date"
                    value={dob}
                    format="DD MMM YYYY"
                    disabledDate={(current) => {
                      return (
                        current && current.isBefore(dayjs().startOf('day'))
                      );
                    }}
                    onChange={(date) => setDob(date)}
                  />
                </PopoverContent>
              </Popover> */}
              </div>

              {/* <div className="space-y-2">
              <Label>Passenger Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="uae">UAE</SelectItem>
                </SelectContent>
              </Select>
              <Input value={'Adult'} disabled className="rounded-xl" />
            </div> */}
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600 space-y-1">
            <p>• Enter passenger's name exactly as it appears on their ID</p>
            <p>
              • Please ensure the travel document is valid on the return date of
              the trip
            </p>
          </div>

          <div>
            <Label
              //   htmlFor="ffp"
              className="text-gray-700 cursor-pointer hover:text-black"
              onClick={() => setPassportDetails(!passportDetils)}
            >
              Passport Details (Optional for domestic travel)
            </Label>
            {passportDetils && (
              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="min-w-40">
                  <Label htmlFor="passnum">Passport Number *</Label>
                  <Input
                    id="passnum"
                    placeholder="Enter first name"
                    className="text-lg rounded-xl my-2 placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="min-w-40 max-w-full">
                  <Label htmlFor="expiry">Passport Expiry *</Label>
                  <div id="expiry" className="flex justify-between">
                    <Input
                      placeholder="MM"
                      className="text-lg rounded-xl my-2 placeholder:text-gray-400 max-w-fit"
                      type="number"
                      min={1}
                      max={12}
                    />
                    <Input
                      placeholder="YYYY"
                      className="text-lg rounded-xl my-2 placeholder:text-gray-400 max-w-fit"
                      min={dayjs().year()}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nationality *</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Issuing Country *</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base">
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
