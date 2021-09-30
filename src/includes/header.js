import React, { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../graphql/queries'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../aws-exports";
import { Auth } from 'aws-amplify';

import { ReactComponent as UserIcon } from '../assets/navbar_icons/user.svg'
import { ReactComponent as InventoryIcon } from '../assets/navbar_icons/inventory.svg'
import { ReactComponent as TaskIcon } from '../assets/navbar_icons/task.svg'
import { ReactComponent as AboutIcon} from '../assets/navbar_icons/about.svg'

import { ReactComponent as PokemonIcon } from '../assets/navbar_icons/pokeball.svg'
import { ReactComponent as ListTasksIcon } from '../assets/navbar_icons/to-do-list.svg'
import { ReactComponent as ShopIcon} from '../assets/navbar_icons/shops.svg'
import { ReactComponent as LeaderboardIcon } from '../assets/navbar_icons/podium.svg'
import MoonLoader from "react-spinners/MoonLoader";
 
Amplify.configure(awsExports);



function Navbar(props) {
  return (
    <nav className="navbar" id="navbar_header" name="navbar_header">
      
      <ul className="hidden-nav">
        {props.children}
        {/* <li className="navbar-section">
          <Link to="/list_tasks">List Tasks</Link>
       

        
         */}
      </ul>
      <h1 className="nav-title">Pokemon Irl</h1>
      <ul className="navbar-nav">
        {props.children}
        {/* <li className="navbar-section">
          <Link to="/list_tasks">List Tasks</Link>
       

        
         */}
      </ul>
    </nav>
)
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <span className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </span>
      {open && props.children}
    
    </li>
  )
}

function ProfileMenu() {
  const [accountData, setAccountData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (loading) {
      getUserData()
    }
  })

  async function getUserData() {
    const authUser = await Auth.currentAuthenticatedUser()
    const email = await authUser.attributes.email
    const userData = await API.graphql({query: queries.getAccount, variables: {id: email}})
    console.log(userData)
    setAccountData(userData.data.getAccount)
    setLoading(false)
  }

  function DropdownItem(props) {
    return(
    <a href={props.link}  className="menu-item">
      <span className="dropdown-icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
    )
  }

  async function signOut() {
    try {
        await Auth.signOut();
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  const pokeball_icon = <PokemonIcon />
  const leaderboard_icon = <LeaderboardIcon />

  return (
    <div className="dropdown">
      <h1 style={{textAlign: 'center'}}>Profile Menu</h1>
      {accountData !== null ? 
      <div>
      <h3>{accountData.username}</h3>
      <h3>{accountData.money} Pokecoins</h3>
      </div>
       : <div style={{height: "87px"}}><MoonLoader color={"white"} loading={"true"} size={60} /></div>}
      
      <DropdownItem leftIcon={pokeball_icon} link="/user_pokemon"><h3 className="dropdown-text">Your Pokemon!</h3></DropdownItem>
      <DropdownItem leftIcon={leaderboard_icon} link="/leaderboard"><h3 className="dropdown-text">Leaderboard</h3></DropdownItem>
      <li className="navbar-section">
        <button onClick={signOut}>Logout</button>
      </li>
    </div>
  )
}

function AboutMenu() {
  function DropdownItem(props) {
    return(
    <a href={props.link} className="menu-item">
      <h1 style={{textAlign: 'center'}}>About Menu</h1>
      <span className="dropdown-icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
    )
  }

  return (
    <div className="dropdown">
      <DropdownItem link="/introduction">Introduction</DropdownItem>
      <DropdownItem link="/create_problem">Create Problem</DropdownItem>
      <DropdownItem link="/create_multi">Create Multi</DropdownItem>
      <DropdownItem link="/create_riddle">Create Riddle</DropdownItem>
      <DropdownItem link="/make_calls">Make Calls</DropdownItem>
      <DropdownItem link="/choose_pokemon">Choose Pokemon</DropdownItem>
    </div>
  )
}

function TaskMenu() {
  function DropdownItem(props) {
    return(
    <a href={props.link} className="menu-item">
      <span className="dropdown-icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
    )
  }

  const list_tasks_icon = <ListTasksIcon />

  return (
    <div style={{right: "25px"}} className="dropdown">
      <h1 style={{textAlign: 'center'}}>Tasks Menu</h1>
      <DropdownItem leftIcon={list_tasks_icon} link="/list_tasks"><h3 className="dropdown-text">List Tasks</h3></DropdownItem>
    </div>
  )
}

function InventoryMenu() {
  function DropdownItem(props) {
    return(
    <a href={props.link} className="menu-item">
      <span className="dropdown-icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
    )
  }

  
  const store_icon = <ShopIcon />

  return (
    <div style={{right: "5px"}} className="dropdown">
      <h1 style={{textAlign: 'center'}}>Inventory Menu</h1>
      <DropdownItem leftIcon={store_icon} link="/store"><h3 className="dropdown-text">Store</h3></DropdownItem>
    </div>
  )
}


function Header(props) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  // const [aboutOpen, setAboutOpen] = useState(false);
  
  
  function setOpen(type) {
    if (type === "profile") {
      if (profileOpen === true) {
        setProfileOpen(false)
      } else {
        setProfileOpen(true)
        setTaskOpen(false)
        setInventoryOpen(false)
        // setAboutOpen(false)
      }
      
    } else if (type === "task") {
      if (taskOpen === true) {
        setTaskOpen(false)
      } else {
        setProfileOpen(false)
        setTaskOpen(true)
        setInventoryOpen(false)
        // setAboutOpen(false)
       }
      
    } else {
      if (inventoryOpen === true) {
        setInventoryOpen(false)
      } else {
        setProfileOpen(false)
        setTaskOpen(false)
        setInventoryOpen(true)
        // setAboutOpen(false)
      }
    // } else {
    //   if (aboutOpen === true) {
    //     setAboutOpen(false)
    //   } else {
    //     setProfileOpen(false)
    //     setTaskOpen(false)
    //     setInventoryOpen(false)
    //     // setAboutOpen(true)
    //   }
    // }
    }
  }


  return (
      <Navbar>
        
        <li className="nav-item">
          <span className="icon-button" onClick={() => setOpen("profile")}>
            <UserIcon />
          </span>
          {profileOpen && <ProfileMenu></ProfileMenu>}
    
        </li>
        <li  className="nav-item">
          <span className="icon-button" onClick={() => setOpen("task")}>
            <TaskIcon />
          </span>
          {taskOpen && <TaskMenu></TaskMenu>}
        </li>
        <li className="nav-item">
          <span className="icon-button" onClick={() => setOpen("inventory")}>
            <InventoryIcon />
          </span>
          {inventoryOpen && <InventoryMenu></InventoryMenu>}
        </li>
        {/* <li className="nav-item">
          <span className="icon-button" onClick={() => setOpen("about")}>
            <AboutIcon />
          </span>
          {aboutOpen && <AboutMenu></AboutMenu>}
        </li> */}
      </Navbar>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(Header)
