import React from 'react';
import { NavLink } from 'react-router-dom';
import '@/assets/css/sidebar.css';

const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <NavLink to='/'>
                    Home <i className='bx bxs-home-heart' />
                </NavLink>

                <NavLink to='/resources'>
                    Resources <i className='bx bx-list-ul' />
                </NavLink>

                <NavLink className='router-link-active' to='' v-if='isEditor'>
                    Editor <i className='bx bx-edit-alt' />
                </NavLink>

                <a href='https://github.com/Angelillo15' target='_blank' rel='noreferrer'>
                    GitHub <i className='bx bxl-github' />
                </a>
                <a href='https://discord.nookure.com' target='_blank' rel='noreferrer'>
                    Discord <i className='bx bxl-discord-alt' />
                </a>
            </div>
        </>
    );
};

export default Sidebar;
