import { Navbar, NavbarContent, Button } from "@heroui/react";      
import { BackIcon } from "../Icons/All";
import { Link } from "react-router-dom";
      
export default function NavForBlog({to}){
    return(
      <Navbar className="my-8 bg-transparent">
        <NavbarContent>
          <Button
            as={Link}
            to={to}
            disableRipple
            className="group text-xl p-0 bg-transparent data-[hover=true]:bg-transparent transition duration-500 hover:opacity-60"
            startContent={<BackIcon className="w-5 h-5 text-current transition duration-500 group-hover:opacity-60" />}
          >
            <span className="transition duration-500 group-hover:opacity-60">Back</span>
          </Button>
        </NavbarContent>
      </Navbar>
    )
}      
      
      