/* eslint-disable tailwindcss/no-custom-classname */
import { Button } from 'flowbite-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ServiceType } from './index';

const ContractServiceTable = () => {
  const { register, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services'
  });

  const service = {
    name: '',
    qty: 1,
    unitPrice: 0
  };

  const addRow = () => {
    append(service);
  };

  const removeRow = (index: number) => {
    remove(index);
  };

  const totalServices: ServiceType[] = watch('services');
  const totalQty = totalServices.reduce(
    (total, service) => service.qty + total,
    0
  );
  const totalPrice = totalServices.reduce(
    (total, service) => service.qty * service.unitPrice + total,
    0
  );

  return (
    <>
      <table>
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left">Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th className="text-right">Total</th>
            <th className="hide-on-pdf">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td className="w-[50%] whitespace-nowrap text-gray-900 dark:text-white">
                <input
                  type="text"
                  className="leading-8"
                  required={true}
                  {...register(`services.${index}.name` as const, {
                    required: true
                  })}
                />
              </td>
              <td className="w-[10%]">
                <input
                  type="number"
                  className="text-center leading-8"
                  min={1}
                  {...register(`services.${index}.qty` as const, {
                    valueAsNumber: true
                  })}
                />
              </td>
              <td className="w-[20%]">
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  className="text-center leading-8"
                  {...register(`services.${index}.unitPrice` as const, {
                    setValueAs: (v) => parseFloat(v)
                  })}
                />
              </td>
              <td className="w-[20%] text-right">
                $
                {Number.isNaN(
                  watch(`services.${index}.unitPrice`) *
                    watch(`services.${index}.qty`)
                )
                  ? Number(0).toFixed(2)
                  : (
                      watch(`services.${index}.unitPrice`) *
                      watch(`services.${index}.qty`)
                    ).toFixed(2)}
              </td>
              <td className="hide-on-pdf">
                <span
                  className="cursor-pointer text-red-500 hover:underline"
                  onClick={() => removeRow(index)}
                >
                  Remove
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td className="whitespace-nowrap text-gray-900 dark:text-white">
              Total
            </td>
            <td>
              {/* {totalQty} */}
              <input
                className="bg-transparent text-center"
                type="number"
                value={totalQty}
                disabled
              />
            </td>
            <td></td>
            <td className="text-right">${Number.isNaN(totalPrice) ? Number(0).toFixed(2) : totalPrice.toFixed(2)}</td>
            <td className="hide-on-pdf"></td>
          </tr>
        </tfoot>
      </table>
      <Button className="hide-on-pdf my-4" onClick={addRow}>
        Add Row
      </Button>
    </>
  );
};

export default ContractServiceTable;
