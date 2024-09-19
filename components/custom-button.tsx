import tw from '@/lib/tailwind';
import { ButtonProps } from '@/lib/types';
import { getBGVariantStyle, getTextVariantStyle } from '@/lib/utils';
import { Text, TouchableOpacity } from 'react-native';


export const CustomButton = ({title, bgVariant="primary", textVariant="default", IconLeft, IconRight, className, onPress, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={tw.style(`w-full flex-row flex-center p-3 rounded-lg shadow-lg shadow-neutral-400`, getBGVariantStyle(bgVariant), className)}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text style={tw.style(`text-lg font-bold`, getTextVariantStyle(textVariant))}>{title}</Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    )
}