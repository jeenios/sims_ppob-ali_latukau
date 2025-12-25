import { Link } from "react-router-dom";
import { Hero } from "@/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "@/store/profileSlice";
import { getBalanceAction } from "@/store/balanceSlice";
import { getServicesAction } from "@/store/serviceSlice";
import { getBannerAction } from "@/store/bannerSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const { services, isLoading } = useSelector((state) => state.service);
  const { banners, isLoading: isBannerLoading } = useSelector(
    (state) => state.banner
  );
  const bannerList = Array.isArray(banners) ? banners : [];

  useEffect(() => {
    dispatch(getProfileAction());
    dispatch(getBalanceAction());
    dispatch(getServicesAction());
    dispatch(getBannerAction());
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <div className="w-full mt-10">
        <div className="flex flex-row justify-between overflow-x-auto gap-4 pb-4 scrollbar-hide-md">
          {isLoading ? (
            <p>Loading services...</p>
          ) : (
            services.map((item) => (
              <Link
                key={item.service_code}
                to={`/service/${item.service_code}`}
                className="flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0"
              >
                <img
                  src={item.service_icon}
                  alt={item.service_name}
                  className="w-20 h-20 object-contain"
                />
                <p className="text-xs text-center leading-tight max-w-[75px] break-words">
                  {item.service_name}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="w-full mt-8">
        <div className="flex flex-row items-center overflow-x-auto gap-4 pb-4 scrollbar-hide-md">
          {isBannerLoading ? (
            <p>Loading banner...</p>
          ) : (
            bannerList.map((item) => (
              <img
                key={item.banner_name}
                src={item.banner_image}
                alt={item.banner_name}
                className="h-28 md:h-32 rounded-xl object-cover flex-shrink-0"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
