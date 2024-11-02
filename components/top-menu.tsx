import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

export function TopMenu() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Helenka</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>O Helence</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Nastavení</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
