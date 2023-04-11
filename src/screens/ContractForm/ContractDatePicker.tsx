import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Datepicker from 'tailwind-datepicker-react';

type Props = {
  onChange?: ((date: Date) => void) | undefined;
};

function ContractDatePicker({ onChange }: Props) {
  const { getValues } = useFormContext();
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const pickerOptions = {
    clearBtn: false
  };
  const selectedDate: Date = getValues('createdAt');
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return (
    <div id="date-picker" className="relative mt-2">
      <Datepicker
        classNames="z-20 hide-on-pdf"
        onChange={onChange}
        show={show}
        options={pickerOptions}
        setShow={handleClose}
      />
      <span className="absolute top-[-20px] left-[8px] z-0 w-[500px]">{`${selectedDate.toLocaleDateString(
        'en-US',
        dateOptions
      )}`}</span>
      <div className="hide-on-pdf absolute top-[-20px] left-[8px] z-0 h-[40px] w-[500px] bg-white"></div>
    </div>
  );
}

export default ContractDatePicker;
