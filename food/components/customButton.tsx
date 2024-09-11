import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
    text: string;
    handleSubmit?: () => void,
    color: string;
    exit?: boolean;
    styles?: string;
    textColor?: string,
    disabled?: boolean
}

const CustomButton = ({ text, color, textColor, exit, styles, handleSubmit, disabled }: Props) => {

    const noSubmit = () => {
        return null
    }
    
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={handleSubmit ? handleSubmit : noSubmit}
            style={{ backgroundColor: disabled ? "red" : color, borderColor: disabled ? "red" : color,  }}
            className={`border-4 rounded-xl p-4 ${styles}`}>
            <View className='flex-row items-center gap-2 justify-center'>
                <Text 
                style={{color: textColor}}
                className='font-obold text-white text-center text-xl'>
                    {text}
                </Text>
                {exit ? <Ionicons name="exit-outline" size={20} color={"white"} /> : null}
            </View>
        </TouchableOpacity>
    );
}

export default CustomButton;
