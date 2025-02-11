import { TextInput, TextInputProps } from 'react-native'
import React from 'react'

interface Props extends TextInputProps {
    className? : string,
    type?:string,
}

export default function ThemeInput({className ,type, ...rest} : Props ) {
  return (
    <TextInput className={` rounded-2xl bg-gray-100 py-5 ${className}`} {...rest}/>
  )
}