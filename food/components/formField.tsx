import React, { useState, useRef } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    title: string,
    placeholder: string,
    value: string,
    handleChange: (value: string) => void,
    isPassword?: boolean,
    styles?: string,
    type?: string
}

const FormField = ({ title, placeholder, value, handleChange, isPassword = false, styles, type }: Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <View className='mt-5'>
            <Text className='font-obold text-base px-2'>
                {title}
            </Text>
            <View 
                className='mt-5 p-2 h-[75px] flex-row items-center w-full bg-[#C63C51] rounded-xl'
            >
                <TextInput
                    ref={inputRef}
                    value={value}
                    autoCapitalize='none'
                    className='text-white font-obold placeholder:text-white w-[90%]'
                    placeholder={placeholder}
                    onChangeText={(value) => {
                        handleFocus()
                        handleChange(value)
                    }}
                    placeholderTextColor="#fff"
                    cursorColor="#fff"
                    secureTextEntry={type === "Пароль" && !showPassword}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <Ionicons name="eye-off" color="white" size={20} />
                            ) : (
                            <Ionicons name="eye" size={20} color="white" />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
