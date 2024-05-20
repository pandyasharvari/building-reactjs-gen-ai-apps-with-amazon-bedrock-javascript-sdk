import { useState, useRef, useEffect } from "react"
import { Box, Spinner, Header, Container, SpaceBetween, Textarea, Button, FileUpload } from "@cloudscape-design/components"
import MessageList from "./MessageList"
import FMPicker from "./FMPicker"
import { invokeModelStreaming } from "./llmLib"
import PromptPicker from "./PromptPicker"


import { handleStreamingTokenResponse, buildContent } from "./messageHelpers"


export default () => {
    const [value, setValue] = useState("")
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false)
    const [llmResponse, setLLMResponse] = useState("")
    const [messages, setMessages] = useState([])


    const newConversation = () => {
        setMessages([])
        setLLMResponse("")
        setValue("")
        setLoading(false)
    }
    const modelPickerRef = useRef(null);
    const promptPickerRef = useRef(null);

    const handleLLMNewToken = ({ type, content_block, delta }) => {
        handleStreamingTokenResponse({ type, content_block, delta }, setLLMResponse, setMessages, setLoading)
    }




    const sendImageAndText = async () => {
        const currentModelId = modelPickerRef.current.getModelId()
        console.log(currentModelId)
       const systemPrompt = promptPickerRef.current.getPrompt()
       let systemSt = 'You are a knowledgeable AI assistant that helps health clinicians'
    


  //sharvpa19thMay

     //  const userPrompt =  promptPickerRef.current.getPrompt() //sharvpa added for user prompt
        
        setLoading(true)
 //sharvpa20may       let content = await buildContent(value, files)
        let content = await buildContent(value, systemPrompt, files)

        setValue("")
        setFiles([])
        console.log(content)

        setMessages(prev => {
       const history = [...prev, { role: "user", content: content }]
            const body = {
                "messages": history,
                "anthropic_version": "bedrock-2023-05-31", "max_tokens": 1000,
                "system": systemSt

            }
            console.log(systemPrompt)
    //20thmaysharvpa        if (systemPrompt) body["system"] = systemPrompt
         //   if (systemSt) body["system"] = systemSt
            invokeModelStreaming(body, currentModelId, { callbacks: [{ handleLLMNewToken }] })
            return history
        })
    }


    return (

        <Container key={2}
            header={<Header
                actions={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button onClick={newConversation} >New Conversation</Button></SpaceBetween>
                }
                description="You can combine images and text in the input"
                variant="h2">Conversation</Header>}>

            <SpaceBetween size="xs">

                <FMPicker ref={modelPickerRef} key={1} multimodal={true} />
                <PromptPicker ref={promptPickerRef} />
                <Box data-id="chat-window">
                    {
                        messages.length ?
                            <Container fitHeight>
                                <MessageList messages={messages} />
                                {loading ? <Spinner /> : null}
                            </Container>
                            : null

                    }
                </Box>
                {
                    llmResponse !== "" ?
                        <Container fitHeight header={<strong>Request LLM</strong>}>
                            <div dangerouslySetInnerHTML={{ __html: llmResponse }} />
                        </Container> :
                        null
                }
                <FileUpload
                    onChange={({ detail }) => { setFiles(detail.value) }}
                    value={files}
                    i18nStrings={{ uploadButtonText: e => e ? "Choose files" : "Choose file", dropzoneText: e => e ? "Drop files to upload" : "Drop file to upload", removeFileAriaLabel: e => `Remove file ${e + 1}`, limitShowFewer: "Show fewer files", limitShowMore: "Show more files", errorIconAriaLabel: "Error" }}
                    showFileLastModified
                    showFileSize
                    showFileThumbnail
                    tokenLimit={3}
                    constraintText="Images Files" />

                <Textarea
                    fitHeight
                    placeholder="Write something to the model..."
                    onChange={({ detail }) => { setValue(detail.value) }}
                    value={value}
                    disabled={loading}
                    inputMode="text" />
                <Button fullWidth key={2} loading={loading} onClick={sendImageAndText} variant="primary" >Submit</Button>
            </SpaceBetween>
        </Container>
    )
}
