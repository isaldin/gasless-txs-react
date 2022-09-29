import React, { useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { Button } from '../../../../components/button/Button';
import { DistItemType, DistributeItem } from './components/DistributeItem';

import './DistributeForm.scss';
import { isValidAddress } from '../../../../utils/blockchain/is-address';

type DistributeFormInput = {
  amounts: Array<DistItemType>;
};

type Props = {
  buttonState: { disabled: boolean; title: string };
  onDistributeClicked: (distItems: DistItemType[]) => void;
};

export const DistributeForm: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<DistributeFormInput>({
    defaultValues: {
      amounts: [
        { address: '0x57EB38D736975993EdC3fe25b122e3A659Fd336a', amount: '654321' },
        { address: '0xcFA40Bf520697947C50960E20D4340A4D2d3e833', amount: '123456' },
      ],
    },
    mode: 'all',
  });
  const { fields, append, remove } = useFieldArray<DistributeFormInput>({
    control,
    name: 'amounts',
  });
  const onSubmit: SubmitHandler<DistributeFormInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    !errors?.amounts && console.log('values', getValues());
    //props.onDistributeClicked(getValues());
  }, [getValues(), errors]);

  const handleDistributeClicked = () => {
    props.onDistributeClicked(getValues().amounts);
  };

  console.log('errors', JSON.stringify(errors.amounts));

  return (
    <div className="distribute-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          register(`amounts.${index}.address`);
          register(`amounts.${index}.amount`);
          return (
            <Controller
              key={field.address}
              control={control}
              name={`amounts.${index}`}
              render={({ field }) => {
                return (
                  <>
                    <DistributeItem
                      value={field.value}
                      index={index}
                      // @ts-ignore
                      errors={errors.amounts?.[index]}
                      onChange={(value) => {
                        setValue(`amounts.${index}`, value);
                        console.log('setValue(`amounts.${index}`, value);', value);
                        if (!isValidAddress(value.address)) {
                          setError(`amounts.${index}.address`, {
                            message: 'Address is not valid',
                          });
                        } else if (!/^\d+$/.test(value.amount)) {
                          setError(`amounts.${index}.amount`, {
                            message: 'Amount is not valid',
                          });
                        } else {
                          clearErrors();
                        }
                      }}
                      onDelete={(address) => {
                        if (fields.length === 1) {
                          alert('You can not delete single item');
                          return;
                        }
                        remove(fields.findIndex((item) => item.address === address));
                      }}></DistributeItem>
                  </>
                );
              }}
            />
          );
        })}

        <button
          type="button"
          onClick={() => {
            append({ address: '', amount: '' });
          }}
          disabled={!!errors.amounts}>
          Append
        </button>
      </form>
      <div className="buttonContainer">
        <Button
          onClick={handleDistributeClicked}
          disabled={!!errors.amounts || props.buttonState.disabled}>
          {props.buttonState.title}
        </Button>
      </div>
    </div>
  );
};
