/* eslint-disable tailwindcss/no-custom-classname */
import { useFormContext } from 'react-hook-form';
import data from 'data/countries_and_states.json';

function SelectInput() {
  const { register, watch } = useFormContext();
  const selectedCountry = watch('country');
  const cityList = data.filter((p) => p.name === selectedCountry)[0]?.states;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div id="country" className="input-wrapper relative">
        <label className='require-input' htmlFor="country">Country</label>
        <select
          className="hide-on-pdf z-20"
          id="country"
          {...register(`country` as const, { required: true })}
        >
          {data.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <p className="absolute left-[120px] top-0 z-0">{selectedCountry}</p>
        <div className="hide-on-pdf absolute left-[120px] top-0 z-0 h-[40px] w-[200px] bg-white"></div>
      </div>
      <div id="state" className="input-wrapper relative">
        <label className='require-input' htmlFor="state">State</label>
        <select
          className="hide-on-pdf z-20"
          id="state"
          {...register(`state` as const, { required: true })}
        >
          {selectedCountry ? (
            cityList.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))
          ) : (
            <option disabled>Select country first</option>
          )}
        </select>
        <p className="absolute left-[120px] top-0 z-0">{watch('state')}</p>
        <div className="hide-on-pdf absolute left-[120px] top-0 z-0 h-[40px] w-[200px] bg-white"></div>
      </div>
    </div>
  );
}

export default SelectInput;
