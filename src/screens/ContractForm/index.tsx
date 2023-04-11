/* eslint-disable tailwindcss/no-custom-classname */
import { useNavigate } from 'react-router-dom';
import Datepicker from './ContractDatePicker';
import ServiceTable from './ContractServiceTable';
import { useForm, FormProvider } from 'react-hook-form';
import SelectInput from './SelectInput';
import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from 'flowbite-react';

export interface ServiceType {
  name: string;
  qty: number;
  unitPrice: number;
}

type FormValues = {
  companyName: string;
  address1: string;
  address2?: string;
  state: string;
  country: string;
  services: ServiceType[];
  message: string;
  createdAt: Date;
  email: string;
  phone: string;
};

const ContractForm = () => {
  const certificateTemplateRef = useRef<any>(null);
  const methods = useForm({
    defaultValues: {
      companyName: '',
      address1: '',
      address2: '',
      state: '',
      country: '',
      services: [{ name: '', qty: 1, unitPrice: 0 }],
      message: '',
      createdAt: new Date(),
      email: '',
      phone: ''
    } as FormValues
  });
  const { register, handleSubmit, setValue, getValues, formState } = methods;
  const navigate = useNavigate();
  const handleChange = (selectedDate: Date) => {
    setValue('createdAt', selectedDate);
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px'
    });

    doc.html(certificateTemplateRef.current, {
      html2canvas: {
        scale: 0.47,
        ignoreElements: (e) => e.classList.contains('hide-on-pdf')
      },
      margin: [30, 0, 30, 0],
      autoPaging: 'text',
      async callback(doc) {
        doc.save(`Contract - ${getValues('companyName')}`);
      }
    });
  };

  const onClickSubmit = (data: FormValues) => {
    console.log(data);
    handleGeneratePdf();
  };

  return (
    <div className="mb-80">
      <Button onClick={() => navigate('/')} className="mb-4">
        Back
      </Button>

      <div className="relative p-10 leading-loose" ref={certificateTemplateRef}>
        <div className="hide-on-pdf pointer-events-none absolute inset-0 border border-black" />
        <div className="my-4">
          <h2 className="mb-2 text-center font-bold">
            Partnership Agreement Form
          </h2>
          <div className="input-wrapper">
            <label>Partner 1 name</label>
            <input
              className="border-0 leading-8"
              type="text"
              disabled={true}
              value="ABC Company"
            />
          </div>
          <div className="input-wrapper">
            <label>Address</label>
            <input
              className="border-0 leading-8"
              type="text"
              disabled={true}
              value="Danang, Vietnam"
            />
          </div>
        </div>
        <hr />
        <div className="my-4">
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit((data) => onClickSubmit(data))}
            >
              <div className="input-wrapper">
                <label className="require-input" htmlFor="companyName">
                  Partner 2 name
                </label>
                <input
                  id="companyName"
                  className={`leading-8 ${
                    formState.errors.companyName
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }`}
                  type="text"
                  required={true}
                  {...register('companyName', { required: true })}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="input-wrapper">
                  <label className="require-input" htmlFor="address1">
                    Address
                  </label>
                  <input
                    id="address1"
                    className={`leading-8 ${
                      formState.errors.address1
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }`}
                    type="text"
                    required={true}
                    {...register('address1', { required: true })}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="address2">Apt, suite, etc</label>
                  <input
                    id="address2"
                    className="leading-8"
                    type="text"
                    {...register('address2')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    className={`leading-8 ${
                      formState.errors.email
                        ? 'border-red-500 text-red-500 focus:border-red-500'
                        : ''
                    }`}
                    type="email"
                    {...register('email', {
                      required: false,
                      pattern: /^\S+@\S+$/i
                    })}
                  />
                </div>
                <div className={`input-wrapper`}>
                  <label className="require-input" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    className={`leading-8 ${
                      formState.errors.phone
                        ? 'border-red-500 text-red-500 focus:border-red-500'
                        : ''
                    }`}
                    type="tel"
                    minLength={8}
                    maxLength={10}
                    {...register('phone', {
                      required: true,
                      maxLength: 10,
                      minLength: 8,
                      pattern: /^\d+$/i
                    })}
                  />
                </div>
              </div>
              <SelectInput />
              <div className="">
                <div>
                  <label htmlFor="services">Services / Products</label>
                </div>
                <ServiceTable />
              </div>
              <div className="block">
                <label htmlFor="comment">Terms of Agreement</label>
                <p>
                  State the terms that will guide and conduct this partnership
                  agreement <br />
                  The following partnership agreement form should be used
                  following the local and national norms that govern partnership
                  agreements. Any change inquiries to the partnership agreement
                  need to be accompanied by a change request form two weeks
                  before each monthly audit.
                </p>
              </div>
              <div id="textarea">
                <div className="block">
                  <label htmlFor="comment">Notes</label>
                </div>
                <textarea
                  id="comment"
                  className="w-full"
                  placeholder="Leave a comment..."
                  {...register('message')}
                  rows={4}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4" htmlFor="date-picker">
                  Date
                </label>
                <Datepicker onChange={handleChange} />
              </div>
              <Button className="hide-on-pdf" type="submit">
                Submit
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ContractForm;
