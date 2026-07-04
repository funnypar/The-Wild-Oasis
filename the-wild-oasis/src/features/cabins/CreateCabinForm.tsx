import { useForm, type FieldErrors } from 'react-hook-form';

import type ICabin from '../../interfaces/ICabin';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import { useCreateCabin } from './hooks/useCreateCabin';
import { useEditCabin } from './hooks/useEditCabin';

type CreateCabinFormData = {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: FileList;
};

type CreateCabinFormProps = {
    cabinToEdit?: ICabin | null;
    onClose?: () => void | null;
};

function CreateCabinForm({ cabinToEdit, onClose }: CreateCabinFormProps) {
    const editId = cabinToEdit?.id;
    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm<CreateCabinFormData>({
        defaultValues: isEditSession
            ? {
                  name: cabinToEdit!.name,
                  maxCapacity: cabinToEdit!.maxCapacity,
                  regularPrice: cabinToEdit!.regularPrice,
                  discount: cabinToEdit!.discount,
                  description: cabinToEdit!.description,
              }
            : {},
    });

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const isWorking = isCreating || isEditing;

    function onSubmit(data: CreateCabinFormData) {
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];

        const newCabin: ICabin = {
            name: data.name,
            maxCapacity: data.maxCapacity,
            regularPrice: data.regularPrice,
            discount: data.discount,
            description: data.description,
            image: image,
        };

        if (isEditSession) {
            editCabin(
                {
                    newCabinData: newCabin,
                    id: editId!,
                },
                {
                    onSuccess: () => onClose?.(),
                },
            );
        } else {
            createCabin(newCabin, {
                onSuccess: () => {
                    reset();
                    onClose?.();
                },
            });
        }
    }

    function onError(errors: FieldErrors<CreateCabinFormData>) {
        console.log(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onClose ? 'modal' : 'regular'}
        >
            <FormRow label='Cabin name' error={errors.name?.message}>
                <Input
                    id='name'
                    type='text'
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow
                label='Maximum capacity'
                error={errors.maxCapacity?.message}
            >
                <Input
                    id='maxCapacity'
                    type='number'
                    {...register('maxCapacity', {
                        valueAsNumber: true,
                        required: 'This field is required.',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label='Regular price' error={errors.regularPrice?.message}>
                <Input
                    id='regularPrice'
                    type='number'
                    {...register('regularPrice', {
                        valueAsNumber: true,
                        required: 'This field is required.',
                        min: {
                            value: 1,
                            message: 'Price should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label='Discount' error={errors.discount?.message}>
                <Input
                    id='discount'
                    type='number'
                    defaultValue={0}
                    {...register('discount', {
                        valueAsNumber: true,
                        required: 'This field is required.',
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            'Discount should be less than regular price.',
                    })}
                />
            </FormRow>

            <FormRow
                label='Description for website'
                error={errors.description?.message}
            >
                <Textarea
                    id='description'
                    {...register('description', {
                        required: 'This field is required.',
                    })}
                />
            </FormRow>

            <FormRow label='Cabin photo' error={errors.image?.message}>
                <FileInput
                    id='image'
                    type='file'
                    accept='image/*'
                    {...register('image', {
                        required: isEditSession
                            ? false
                            : 'Cabin image is required.',
                    })}
                />
            </FormRow>

            <FormRow>
                <Button disabled={isWorking}>
                    {isEditSession ? 'Edit cabin' : 'Create cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
