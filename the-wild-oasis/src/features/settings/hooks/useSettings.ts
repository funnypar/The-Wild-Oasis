import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../../services/settings.service';

export const useSettings = () => {
    const {
        isPending: isLoading,
        data: settings,
        error,
    } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
    });

    return { isLoading, settings, error };
};
