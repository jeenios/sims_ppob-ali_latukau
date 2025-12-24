import { HeroMenus } from "@/components/atoms/heromenu";
import { Link } from "react-router-dom";

const HeroMenu = () => {
  const getHeroMenu = HeroMenus;
  return (
    <div className="w-full mt-5">
      <div className="flex flex-row justify-between overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {getHeroMenu.map((item) => (
          <Link
            key={item.label}
            className="flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-20 h-20 object-contain"
            />
            <p className="text-xs text-center leading-tight max-w-[70px] break-words">
              {item.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroMenu;
