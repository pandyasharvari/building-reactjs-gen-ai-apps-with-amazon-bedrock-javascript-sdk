import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import { useNavigate } from "react-router-dom";



const Menu = ({ signOut, groups, ...user }) => {
  let navigate = useNavigate()

  const menuFollow = (e) => {
    console.log("Menu Follow:", e)
    e.preventDefault();
    if (e.detail?.href) {
      navigate(e.detail.href)
    }
  }


  const itemClick = (e) => {
    console.log("Logout:", e)
    console.log("User:", user)
    e.preventDefault();
    if (e.detail.id == "signout") signOut()
  }

  return (
    <TopNavigation

      identity={{
        onFollow: (() => { navigate("/") }),
        title: <div className='title'>HealthScribe QnA</div>,

      }}
      utilities={[
        {
          type: "button", text: "Consulation using Healthscribe", 
          href: "https://main.d23bhvwynxh5w2.amplifyapp.com/", external: true, externalIconAriaLabel: " (opens in a new tab)"
        },
      /*  {
          type: "button", text: "Langchain.js", 
          href: "https://js.langchain.com/docs/get_started/introduction", 
          external: true, externalIconAriaLabel: " (opens in a new tab)"
        },
        {
          type: "button", text: "This repo", 
          href: "https://github.com/build-on-aws/building-reactjs-gen-ai-apps-with-amazon-bedrock-javascript-sdk", 
          external: true, externalIconAriaLabel: " (opens in a new tab)"
        },*/
     
        {
          type: "menu-dropdown",
          text: "You",
          onItemClick: ((e) => { itemClick(e) }),
          iconName: "user-profile",
          items: [
            { id: "email", text: user.signInDetails?.loginId },
            {
              id: "signout", text: "singout"
            }
          ]

        },



      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />

  );
}


export default Menu
