import { Link } from "react-router-dom";
import { Hero } from "@/components";
import { HeroMenus } from "@/constants/heromenu";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileAction } from "@/store/authSlice";
import { getBalanceAction } from "@/store/balanceSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
    dispatch(getBalanceAction());
  }, [dispatch]);

  const getHeroMenu = HeroMenus;
  return (
    <div>
      <Hero />
      <div className="w-full mt-10">
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
    </div>
  );
};

export default HomePage;
