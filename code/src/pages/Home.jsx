import React from "react"
import { LayoutSidebar, Recommended, New } from "../router"

export const Home = () => {
  return (
    <>
      <LayoutSidebar>
        <New />
        <Recommended />
      </LayoutSidebar>
    </>
  )
}
