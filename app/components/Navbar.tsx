import React, { useState } from "react";
import { Flex, Button, Text } from "@radix-ui/themes";
import { FiMenu, FiX } from "react-icons/fi";

interface NavbarProps {
  toggleTheme: () => void; // Function to toggle between light and dark mode
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Flex
      className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-700 shadow-md"
      justify="between"
      align="center"
      px="6"
      py="3"
    >
      {/* Logo Section */}
      <Text size="4" weight="bold" className="text-black dark:text-white">
        MyApp
      </Text>

      {/* Hamburger Icon (Mobile Only) */}
      <Button
        variant="ghost"
        className="lg:hidden text-black dark:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </Button>

      {/* Nav Links */}
      <Flex
        gap="4"
        align="center"
        className={`m-0 p-0 lg:flex ${
          menuOpen ? "flex" : "hidden"
        } flex-col lg:flex-row absolute lg:static bg-white dark:bg-zinc-900 lg:bg-transparent w-full lg:w-auto top-full left-0 lg:top-auto lg:left-auto border-t lg:border-none border-gray-200 dark:border-gray-700 lg:pt-0 pt-4`}
      >
        <Button variant="soft" className="text-black dark:text-white">
          Home
        </Button>
        <Button variant="soft" className="text-black dark:text-white">
          Services
        </Button>
        <Button variant="soft" className="text-black dark:text-white">
          Contact
        </Button>
      </Flex>

      {/* Action Buttons */}
      <Flex
        gap="2"
        className={`lg:flex ${
          menuOpen ? "flex" : "hidden"
        } flex-col lg:flex-row mt-4 lg:mt-0`}
      >
        <Button variant="solid" className="dark:bg-blue-500 dark:text-white">
          Login
        </Button>
        <Button
          variant="outline"
          className="border-gray-200 dark:border-gray-700 dark:text-white"
        >
          Sign Up
        </Button>
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="text-black dark:text-white"
        >
          Toggle Theme
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
