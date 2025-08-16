import type { ISidebarItem } from "@/types";

const generateRoutes = (sidebarItems: ISidebarItem[]) => {
    return sidebarItems.flatMap(section => section.items.map(route => {
        const routeReturn = {
            path: route.url,
            Component: route.component
        }
        return routeReturn

    }))
};

export default generateRoutes;
