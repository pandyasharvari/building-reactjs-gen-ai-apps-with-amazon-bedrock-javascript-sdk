
import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Select, Grid, FormField } from "@cloudscape-design/components"
import { fetchByValue } from './fetchHelper'

export default forwardRef(({ }, ref) => {
    const [selectedOption, setSelectedOption] = useState({});
    const [prompts, setPrompts] = useState([{ name: "", prompt: false }])
    const [userprompts, setUserPrompts] = useState([{ name: "", prompt: false }]) //sharvpa added for user promptspikcer 
 

    useImperativeHandle(ref, () => ({
        getPrompt() {
            return selectedOption.value
        }
    }))


    const getList = async () => {
        let list = await fetchByValue("listPrompts")
        let first = list[0]
        setPrompts(list)
        if (first) {
            setSelectedOption({ label: first.name, value: first.prompt })
        }

    }

    useEffect(() => {
        getList()
    }, [])

    const getOptions = () => {
        const options = prompts ? prompts.map(pr => {
            return { label: pr.name, value: pr.prompt }
        }) : []
        return options
    }
//sharvpa - another Formfiled for userprompt selection
    return (

        <Grid gridDefinition={[{ colspan: 12}]}>
            <FormField label="User Prompt">
                <Select selectedOption={selectedOption}
                    label="Prompt"
                    onChange={({ detail }) => {
                        console.log(detail)
                        setSelectedOption(detail.selectedOption)
                    }}
                    options={getOptions()}
                    triggerVariant="option" />
            </FormField>
   

            
        </Grid>


    )
})
