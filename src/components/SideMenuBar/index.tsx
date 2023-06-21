import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import './index.css'

type Props = {
    switchMenu: (menu: string) => void
}
const SideMenuBar = (props: Props) => {
    const { switchMenu } = props
    return (
        <Menubar className='side-menu__bar border-0 bg-second' defaultValue='word' onValueChange={switchMenu}>
            <MenubarMenu value='word'>
                <MenubarTrigger className='focus:bg-none data-[state=open]:bg-[#fecb4d]'>生词本</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu value='review'>
                <MenubarTrigger className='focus:bg-none data-[state=open]:bg-[#fecb4d]'>复习</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}
export default SideMenuBar
