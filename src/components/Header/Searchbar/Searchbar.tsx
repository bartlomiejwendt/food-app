import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import './searchbar.scss'

export const Searchbar: React.FC = () => {
    return (
      <form className="searchbar">
        <input type="text" className="searchbar__input" placeholder="Search" />
        <SearchOutlined className="searchbar__icon" />
{/* 
        <ul className="searchbar__list">
        </ul> */}
      </form>
    )
}