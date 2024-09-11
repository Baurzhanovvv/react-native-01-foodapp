import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Text, View, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';


interface Props {
    placeholder: string
}

const Searchbar: React.FC<Props> = ({ placeholder }) => {
    return (
        <>
        <Text>
            {placeholder}
        </Text>
        </>
    );
}

export default Searchbar;
