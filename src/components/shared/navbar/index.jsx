import { Link } from "react-router-dom";
import { LuAlignJustify } from "react-icons/lu";
import { LogoAsset } from "@/assets";
import { NavLinkData } from "@/constants/navlinkdata";
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
        <Link to="/homepage">
          <div className="flex items-center gap-2">
            <img src={LogoAsset} alt="logo SIMS" width={20} height={20} />
            <Label className="text-md hover:cursor-pointer hover:text-primary transition-colors">
              SIMS PPOB
            </Label>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-12">
          {NavlinkData.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-md font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
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
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex flex-col text-start text-md font-medium hover:text-primary transition-colors mt-4"
                    >
                      {item.label}
                    </Link>
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
