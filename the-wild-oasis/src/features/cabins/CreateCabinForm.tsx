import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type ICabin from '../../interfaces/ICabin';
import { createCabin } from '../../services/cabins.service';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

type CreateCabinFormData = {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
};

function CreateCabinForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } =
        useForm<CreateCabinFormData>();

    const { errors } = formState;

    const { isPending: isCreating, mutate } = useMutation({
        mutationFn: (newCabin: ICabin) => createCabin(newCabin),
        mutationKey: [],
        onSuccess: () => {
            toast.success('New cabin successfully created.');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data: CreateCabinFormData) {
        const newCabin: ICabin = {
            name: data.name,
            maxCapacity: data.maxCapacity,
            description: data.description,
            discount: data.discount,
            regularPrice: data.regularPrice,
            image: data.image[0],
        };

        mutate(newCabin);
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label='Cabin name' error={errors?.name?.message}>
                <Input
                    type='text'
                    id='name'
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow
                label='Maximum capacity'
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type='number'
                    id='maxCapacity'
                    {...register('maxCapacity', {
                        required: 'This field is required.',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label='Regular price'
                error={errors?.regularPrice?.message}
            >
                <Input
                    type='number'
                    id='regularPrice'
                    {...register('regularPrice', {
                        required: 'This field is required.',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>
            <FormRow label='Discount' error={errors.discount?.message}>
                <Input
                    type='number'
                    id='discount'
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required.',
                        validate: (value) => {
                            return (
                                value <= getValues().regularPrice ||
                                'Discount should be less than regular price.'
                            );
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label='Description for website'
                error={errors.description?.message}
            >
                <Textarea
                    id='description'
                    defaultValue=''
                    {...register('description')}
                />
            </FormRow>
            <FormRow label='Cabin photo' error={errors.image?.message}>
                <FileInput
                    id='image'
                    type='file'
                    accept='image/*'
                    {...register('image')}
                />
            </FormRow>
            <FormRow>
                <Button variation='secondary' type='reset'>
                    Cancel
                </Button>
                <Button disabled={isCreating}>Edit cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
