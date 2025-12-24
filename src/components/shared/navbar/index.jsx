import { Link } from "react-router-dom";
import { LuAlignJustify } from "react-icons/lu";
import { LogoAsset } from "@/assets";
import { NavLinkData } from "@/components";
import {
  Label,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
} from "@/components";

const Navbar = () => {
  const NavlinkData = NavLinkData;
  return (
    <div className="w-full border-b border-solid border-gray-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-2">
          <img src={LogoAsset} alt="logo SIMS" width={20} height={20} />
          <Label className="text-md">SIMS PPOB</Label>
        </div>
        <div className="hidden md:flex items-center gap-12">
          {NavlinkData.map((item) => (
            <Label key={item.href} className="text-md">
              <Link to={item.href}>{item.label}</Link>
            </Label>
          ))}
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <LuAlignJustify />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription>
                  {NavlinkData.map((item) => (
                    <Label
                      key={item.href}
                      className="flex flex-col text-md text-start mt-4"
                    >
                      <Link to={item.href}>{item.label}</Link>
                    </Label>
                  ))}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
