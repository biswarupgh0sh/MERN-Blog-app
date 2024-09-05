import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() =>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    })
  return (
    <Sidebar className="w-full md:w-56s">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=profile">
            <Sidebar.Item icon={HiUser} active={tab === 'profile'} label="user" labelColor='dark'>
                Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                SignOut
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}