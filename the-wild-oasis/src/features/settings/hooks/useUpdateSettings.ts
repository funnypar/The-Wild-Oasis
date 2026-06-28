import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { ISettings } from '../../../interfaces/ISettings';
import { updateSetting } from '../../../services/settings.service';

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();
    const { isPending: isUpdating, mutate: updateSettingFn } = useMutation<
        void,
        Error,
        Partial<ISettings>
    >({
        mutationFn: (settingData) => updateSetting(settingData),
        onSuccess: () => {
            toast.success('Settings successfully updated.');
            queryClient.invalidateQueries({ queryKey: ['settings'] });
        },
        onError: (err) => toast.error(err.message),
    });
    return { isUpdating, updateSettingFn };
};
