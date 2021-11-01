import { Select } from 'antd'
import React from 'react'
import { Row } from '../types'

type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps,'value' | 'option' | 'onChange'>{
    value: undefined | null | Row,
    option?: {name:string,id: number}[],
    onChange: (value?:number) => void,
    defaultOptionsName: string,
}
export const IdSelect = (props: IdSelectProps) => {
    const {value,onChange,defaultOptionsName,option , ...resProps} = props
    return (
        <Select 
            value={toNumber(value)} 
            onChange={value=>onChange(toNumber(value || undefined))}
            {...resProps}
            >
                {defaultOptionsName?<Select.Option value={0}>{defaultOptionsName}</Select.Option> : null}
                {
                    option?.map((item,index) => {
                        <Select.Option value={item.id}>{item.name}</Select.Option>
                    })
                }
        </Select>
    )
}
const toNumber = (value:unknown) => isNaN(Number(value))?0:Number(value)