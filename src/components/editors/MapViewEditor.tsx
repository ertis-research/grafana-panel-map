import { StandardEditorProps } from '@grafana/data'
import { Form, FormAPI, InlineField, Input } from '@grafana/ui'
import React, { ChangeEvent, useEffect } from 'react'
import { InView, defaultView } from 'types'


interface Props extends StandardEditorProps<InView> { }

export const MapViewEditor: React.FC<Props> = ({ value: element, onChange }) => {
    if (element === undefined) {
        element = defaultView;
    }

    const handleOnChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...element,
            [event.currentTarget.name]: event.target.value
        })
    }

    useEffect(() => {
        console.log("AAA")
        console.log(element)
    }, [element])

    const tagsForm = <div>
        <Form onSubmit={() => { }} id="tagsForm" maxWidth="none">{({ register, errors, control }: FormAPI<any>) => {
            return (<div>
                <InlineField label="Latitude" grow labelWidth={10}>
                    <Input name='lat' value={element.lat} onChange={handleOnChangeTag} />
                </InlineField>
                <InlineField label="Longitude" grow labelWidth={10}>
                    <Input name='lon' value={element.lon} onChange={handleOnChangeTag} />
                </InlineField>
                <InlineField label="Zoom" grow labelWidth={10}>
                    <Input name='zoom' value={element.zoom} onChange={handleOnChangeTag} />
                </InlineField>
            </div>)
        }}
        </Form>
    </div>

    return (tagsForm)
} 
