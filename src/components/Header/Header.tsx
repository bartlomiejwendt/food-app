import React from 'react'
import './header.scss'

import { Menu } from './Menu/Menu'
import { Searchbar } from './Searchbar/Searchbar'
import { User } from './User/User'

export const Header: React.FC = () => {
    return (
      <header className="header">
        <Menu />
        <Searchbar />
        <User />
      </header>
    )
}