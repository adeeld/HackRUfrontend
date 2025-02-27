import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { scrollToSectionName } from "./utilities";

function MenuItem(props: { sectionName: string }) {
    const { sectionName } = props;
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    className={`${active ? "bg-blue-300 text-white" : "text-gray-900"}
                    group flex w-full items-center rounded-md px-2 py-2 text-lg`}
                    onClick={() => scrollToSectionName(sectionName)}
                >
                    {sectionName}
                </button>
            )}
        </Menu.Item>
    );
}

function CollapsedMenu() {
    return (
        <div className="text-right bg-cyan-100: z-40 -mr-8 md:hidden">
            <Menu as="div"
                className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md hover:bg-black hover:bg-opacity-20 px-2 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <MdOutlineMenu
                            color="white"
                            size={40}
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <MenuItem sectionName="Home" />
                            <MenuItem sectionName="About" />
                            <MenuItem sectionName="Schedule" />
                            <MenuItem sectionName="FAQ" />
                            {/* <MenuItem sectionName="Sponsors" /> */}
                            <MenuItem sectionName="Contact" />
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

/**
 * TODO: Make navbar sticky and then change the glow to the section that is currently present ??
 */

function Navbar() {

    const sections = ["Home", "About", "Schedule", "FAQ"];

    return (
        <div className="flex justify-end w-[100%]">
            <CollapsedMenu />
            <div
                className={`absolute top-0 font-light text-text
        hidden md:flex space-x-12 text-lg pt-8 right-12 z-40`}>
                {
                    sections.map((section) => {
                        return (
                            <button className="glow-center font-medium uppercase"
                                onClick={() => scrollToSectionName(section)}
                                key={section}>
                                {section}
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
}


export default Navbar;
