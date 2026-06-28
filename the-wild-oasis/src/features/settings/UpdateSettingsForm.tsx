import type { ISettings } from '../../interfaces/ISettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './hooks/useSettings';
import { useUpdateSettings } from './hooks/useUpdateSettings';

export default function UpdateSettingsForm() {
    const { isLoading, settings } = useSettings();
    const { isUpdating, updateSettingFn } = useUpdateSettings();

    if (isLoading) return <Spinner />;

    function handleUpdate(
        e: React.FocusEvent<HTMLInputElement>,
        field: keyof ISettings,
    ) {
        const { value } = e.target;
        if (!value) return;

        // Convert to appropriate type based on field
        const numericValue = [
            'minBookingLength',
            'maxBookingLength',
            'maxGuestsPerBooking',
            'breakfastPrice',
        ].includes(field)
            ? Number(value)
            : value;

        updateSettingFn({ [field]: numericValue } as Partial<ISettings>);
    }

    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input
                    type='number'
                    id='min-nights'
                    defaultValue={settings?.minBookingLength}
                    onBlur={(e) => handleUpdate(e, 'minBookingLength')}
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input
                    type='number'
                    id='max-nights'
                    defaultValue={settings?.maxBookingLength}
                    onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input
                    type='number'
                    id='max-guests'
                    defaultValue={settings?.maxGuestsPerBooking}
                    onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input
                    type='number'
                    id='breakfast-price'
                    defaultValue={settings?.breakfastPrice}
                    onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
                    disabled={isUpdating}
                />
            </FormRow>
        </Form>
    );
}
