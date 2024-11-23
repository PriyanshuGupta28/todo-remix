import { Flex, Button, Text } from "@radix-ui/themes";
import React from "react";

interface NavbarProps {
  toggleTheme: () => void; // Function to toggle between light and dark mode
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
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

      {/* Nav Links */}
      <Flex gap="4" align="center" className="m-0 p-0">
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
      <Flex gap="2">
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
