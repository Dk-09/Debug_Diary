import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import ThemeSwitch from "./ThemeSwitch";
import { ChevronDown, Instagram, Gmail, Twitter } from "../Icons/All";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Nav({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    Instagram: <Instagram className="text-warning" fill="currentColor" size={30} />,
    Gmail: <Gmail className="text-secondary" fill="currentColor" size={30} />,
    Twitter: <Twitter className="text-primary" fill="currentColor" size={30} />,
  };

  return (
    <Navbar className="py-8 w-screen bg-transparent" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand justify="start">
        <p className="text-2xl text-inherit pl-4 font-Monument">
          <span className="text-yellow-400">De</span>
          <span className="text-danger italic">bug</span>{" "}
          <span className="text-primary">Diary</span>
        </p>
      </NavbarBrand>

      {/* DESKTOP */}
      <NavbarContent className="hidden sm:flex gap-4 items-center" justify="end">
        <NavbarItem>
          <a className="text-xl hover:opacity-60 hover:duration-500" href="/Blog">
            Blog
          </a>
        </NavbarItem>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
              >
                <span className="text-xl hover:opacity-60 hover:duration-500">
                  Contact
                </span>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu itemClasses={{ base: "gap-4" }}>
            <DropdownItem
              key="instagram"
              description={
                <p className="flex">Only for <span className="text-danger ml-1 font-bold">baddies 💅🏻</span></p>
              }
              startContent={icons.Instagram}
              target="_blank"
              href="https://www.instagram.com/_.vurhd/"
            >
              Instagram
            </DropdownItem>
            <DropdownItem
              key="gmail"
              description={
                <p className="flex"><span className="text-secondary ml-1 font-bold">Don't </span> spam me 👊🏻</p>
              }
              startContent={icons.Gmail}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=dhruv.k.09.02@gmail.com&su=You are goat"
              target="_blank"
            >
              Gmail
            </DropdownItem>
            <DropdownItem
              key="twitter"
              description="Only for us ugly nerds 🙃"
              startContent={icons.Twitter}
              href="https://x.com/dk_dhruv_"
              target="_blank"
            >
              Twitter
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <ThemeSwitch
            isSelected={isDark}
            onChange={(e) => setIsDark(e.target.checked)}
          />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden flex gap-4" justify="end">
        <NavbarMenuToggle />
        <NavbarItem>
          <ThemeSwitch
            isSelected={isDark}
            onChange={(e) => setIsDark(e.target.checked)}
          />
        </NavbarItem>        
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="!mt-20 px-4">
        <NavbarMenuItem>
          <Link to="/Blog" className="text-xl hover:opacity-60">
            Blog
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="text-xl w-full text-left flex justify-between items-center hover:opacity-60"
          >
            Contact
            <ChevronDown
              size={18}
              className={`transition-transform ${isContactOpen ? "rotate-180" : ""}`}
            />
          </button>
        </NavbarMenuItem>

        {isContactOpen && (
          <>
            <NavbarMenuItem>
              <a
                href="https://www.instagram.com/_.vurhd/"
                target="_blank"
                className="text-lg text-warning"
              >
                Instagram 💅🏻
              </a>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dhruv.k.09.02@gmail.com"
                target="_blank"
                className="text-lg text-secondary"
              >
                Gmail 📩
              </a>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <a
                href="https://x.com/dk_dhruv_"
                target="_blank"
                className="text-lg text-primary"
              >
                Twitter 🐦
              </a>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}