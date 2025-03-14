import { TextInput, TextInputProps } from 'react-native'
import React from 'react'

interface Props extends TextInputProps {
    className? : string,
}

export default function ThemeInput({className, ...rest} : Props ) {
  return (
    <TextInput className={` active:opacity-50 rounded-2xl bg-gray-100 py-5 ${className}`} {...rest}/>
  )
}