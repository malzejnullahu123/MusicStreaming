import React from "react"
import { Header } from "../header/Header"
import AudioPlayer from "../AudioPlayer"

export const Layout = ({ children, embedLink }) => {
  return (
    <div>
      <Header />
      <main className='mt-[4.5em]'>{children}</main>
    </div>
  )
}
