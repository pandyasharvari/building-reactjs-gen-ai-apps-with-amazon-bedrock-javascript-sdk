import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css'
import Menu from "./Menu"
import Layout from './Layout'
import Prompts from "./Prompts"
import PromptNew from "./PromptNew"
import Prompt from "./Prompt"
/*import UserPrompts from "./UserPromptsNew" //sharvpa added -user promptss
import UserPromptNew from "./UserPromptNew" //sharvpa added -user prompts
import UserPrompt from "./UserPrompt"  //sharvpa added -user prompts*/
import BedrockKBAndGenerate from "./BedrockKBAndGenerate"
import BedrockKBRetrieve from "./BedrockKBRetrieve"

import BedrockAgent from "./BedrockAgent"
import MultiModalLLM from "./MultiModalLLM"

const App = ({ signOut, user }) => {

  const router = createBrowserRouter([

    {
      path: "/",
      errorElement: <div>something went wrong!</div>,
      element: <Struct signOut={signOut}  {...user} />,
      children: [
        { path: "multimodal", element: <MultiModalLLM/> },
        { path: "retrieveandgenerate", element: <BedrockKBAndGenerate  /> },
        { path: "prompt", element: <Prompts /> },
        { path: "prompt/new", element: <PromptNew /> },
        { path: "prompt/:PromptId", element: <Prompt /> },
      /*  { path: "userprompt", element: <UserPromptsNew /> },   //sharvpa added -user prompts
        { path: "useprompt/new", element: <UserPromptNew /> },  //sharvpa added -user prompts
        { path: "userprompt/:PromptId", element: <UserPrompt /> }, //sharvpa added -user prompts*/
        { path: "retrieve", element: <BedrockKBRetrieve /> },
        { path: "bedrockagent", element: <BedrockAgent /> },

      ]
    }
  ])

  return (<RouterProvider router={router} />)
}

const Struct = ({ signOut, ...user }) =>
  [
    <Menu key={1} signOut={signOut} {...user}></Menu>,
    <Layout key={2} ></Layout>
  ]

export default withAuthenticator(App, {
  hideSignUp: false
})
