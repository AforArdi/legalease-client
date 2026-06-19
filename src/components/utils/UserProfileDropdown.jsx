import { ArrowRightFromSquare, LayoutHeader, Person } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getUserSession } from "@/lib/api/getUserSession";

const UserProfileDropdown = ({ user }) => {
    const handleSignOut = async () => {
        await authClient.signOut();
        toast.error("You've been logged out")
        redirect('/');
    }
    const { name, role, email, image } = user;

    return (
        <Dropdown>
            <Dropdown.Trigger className="rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar>
                    <Avatar.Image
                        alt="User Profile"
                        src={image}
                    />
                    <Avatar.Fallback delayMs={600}>U</Avatar.Fallback>
                </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm">
                            <Avatar.Image
                                alt="User Profile"
                                src={image}
                            />
                            <Avatar.Fallback delayMs={600}>U</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                            <p className="text-sm leading-5 font-medium">{name} ({role})</p>
                            <p className="text-xs leading-none text-muted">{email}</p>
                        </div>
                    </div>
                </div>
                <Dropdown.Menu aria-label="User Actions">
                    <Dropdown.Item href="/dashboard" id="dashboard" textValue="Dashboard">
                        <div className="flex w-full items-center justify-between gap-2">
                            <Label className="cursor-pointer">Dashboard</Label>
                            <LayoutHeader className="size-3.5 text-muted" />
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="/profile" id="profile" textValue="Profile">
                        <div className="flex w-full items-center justify-between gap-2">
                            <Label className="cursor-pointer">Profile</Label>
                            <Person className="size-3.5 text-muted" />
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item onPress={handleSignOut} id="logout" textValue="Logout" variant="danger">
                        <div className="flex w-full items-center justify-between gap-2">
                            <Label className="cursor-pointer text-danger">Log Out</Label>
                            <ArrowRightFromSquare className="size-3.5 text-danger" />
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default UserProfileDropdown;