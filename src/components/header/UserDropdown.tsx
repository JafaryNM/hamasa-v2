import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar className="h-11 w-11">
            <AvatarImage src="/images/user/owner.jpg" />
            <AvatarFallback>MU</AvatarFallback>
          </Avatar>

          <span className="font-medium text-theme-sm text-gray-700 dark:text-gray-300">
            Musharof
          </span>

          <svg
            className="stroke-gray-500 dark:stroke-gray-400"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-3 rounded-2xl shadow-theme-lg"
      >
        {/* User Info */}
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Musharof Chowdhury
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            randomuser@pimjo.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-1 py-2 text-gray-700 dark:text-gray-300"
          >
            Edit profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-1 py-2 text-gray-700 dark:text-gray-300"
          >
            Account settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to="/support"
            className="flex items-center gap-3 px-1 py-2 text-gray-700 dark:text-gray-300"
          >
            Support
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            to="/signin"
            className="flex items-center gap-3 px-1 py-2 text-gray-700 dark:text-gray-300"
          >
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
