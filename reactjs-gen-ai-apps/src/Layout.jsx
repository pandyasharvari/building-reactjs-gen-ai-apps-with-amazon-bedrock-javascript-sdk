import { Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { AppLayout, SideNavigation } from '@cloudscape-design/components';

export default () => {
    const [activeHref, setActiveHref] = useState("/")
    useEffect(() => {
        setActiveHref("/")
    }, [])



    let navigate = useNavigate()



    return (
        <AppLayout key={1}
            headerSelector="#h"
            toolsHide={true}
            disableContentPaddings={false}
            navigationHide={false}
            navigation={
                <SideNavigation
                    activeHref={activeHref}

                    header={
                        { href: "/", text: "HealthScribe AI Assistant" }
                    }
                    items={
                        [
                            {
                                type: "section", text: "Chat With AI Assistant", items: [
/*                                     { type: "link", href: "/llm", text: "Chat Q&A" },
                                    { type: "link", href: "/chat", text: "Chat with Memory" }, */
                                    { type: "link", href: "/multimodal", text: "AI Chatbot" },

                                ]
                            },
                            {
                                type: "section", text: "Prompts", items: [ //sharvpa changed from system to use prompts
                                    { type: "link", href: "/prompt", text: "Prompts" },
                                    
                                ]
                            },
                            //sharvpa code added to create user prompts
                     /*       {
                                type: "section", text: "User Prompts", items: [
                                    { type: "link", href: "/userprompt", text: "UserPrompts" },
                                    
                                ]
                            },*/
                            { type: "divider" },

                            {
                                type: "section", text: "Knowledge Bases for Healthscribe AI Assistant", items: [
                               //sharvpa     { type: 'link', text: `Retrieve => LLM`, href: `/retrieve` },
                                    { type: 'link', text: `Retrieve & Generate`, href: `/retrieveandgenerate` }
                                ]
                            },
                         { type: "divider" },
                        /*    {
                                type: "section", text: "Agents for HealthScribe AI", items: [
                              { type: 'link', text: `Agents`, href: `/bedrockagent` },
                            ]
                        }*/
                        ]
                    } 
                    onFollow={event => {
                        if (!event.detail.external) {
                            event.preventDefault();
                            console.log(event.detail.href)
                            setActiveHref(event.detail.href)
                            navigate(event.detail.href)
                        }
                    }}
                />
            }
            content={<Outlet />}
        />)
}
