import Sidebar from "components/diginext/containers/Sidebar";
import AdminLogo from "components/dashkit/Logo";
import AdminIcon from "components/dashkit/Icon";
import AppLink from "components/diginext/link/AppLink";
import { useRouter } from "next/router";
import { checkPermission } from "@/helpers/helpers";
import { Menu } from "antd";

const { SubMenu } = Menu;

const SidebarAdmin = ({ children, width = 250, user }) => {
    const router = useRouter();

    const canUserItem   = checkPermission(user, 'user_list');
    const canRoleItem   = checkPermission(user, 'role_list');
    const canSettingItem   = checkPermission(user, 'setting_list');
    const canAdminSubMenu = checkPermission(user, ['user_list', 'role_list']);
    const canSettingSubMenu = checkPermission(user, ['setting_list']);

    const canShareInfoItem   = checkPermission(user, 'share_info_list');


    const hasPermissions = (permissions = []) =>  {
        return checkPermission(user, permissions);
    }

    return (
        <Sidebar width={width}>
            <AdminLogo maxWidth="60%" style={{ paddingTop: "1.2rem", paddingBottom: "1.2rem" }} />
            <Menu
                style={{ width: width }}
                defaultSelectedKeys={[router.pathname]}
                defaultOpenKeys={["menu-slide", "admin-products", "menu-admin", "menu-settings"]}
                mode="inline"
            >
                <Menu.Item key="/admin">
                    <AppLink href="/admin">
                        <AdminIcon name="dashboard" />
                        <span>Dashboard</span>
                    </AppLink>
                </Menu.Item>

                <Menu.Item style={{display: canShareInfoItem ? '' : 'none'}} key="/admin/share-info">
                    <AppLink href="/admin/share-info">
                        <AdminIcon name="done" />
                        <span>Share Info</span>
                    </AppLink>
                </Menu.Item>

                <SubMenu
                    style={{display: canAdminSubMenu ? '' : 'none'}}
                    key="menu-admin"
                    title={
                        <span>
                            <AdminIcon name="admin" />
                            <span>Admin</span>
                        </span>
                    }
                >
                    <Menu.Item style={{display: canUserItem ? '' : 'none'}} key="/admin/users">
                        <AppLink href="/admin/users">Users</AppLink>
                    </Menu.Item>

                    <Menu.Item style={{display: canRoleItem ? '' : 'none'}} key="/admin/roles">
                        <AppLink href="/admin/roles">Roles</AppLink>
                    </Menu.Item>
                </SubMenu>

                {/* Setting */}
                <SubMenu
                    style={{display: canSettingSubMenu ? '' : 'none'}}
                    key="menu-settings"
                    title={
                        <span>
                        <AdminIcon name="setting" />
                        <span>Setting</span>
                        </span>
                    }
                >
                    <Menu.Item style={{display: canSettingItem ? '' : 'none'}} key="/admin/setting">
                        <AppLink href="/admin/setting">Setting</AppLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SidebarAdmin;
