import { forwardRef } from "react";

// Components
import MenuProductCard from "./MenuProductCard";
import { Product } from "../../types/product";

interface RowContainerProps {
  flag: boolean;
  data: Product[];
}

const RowContainer = forwardRef<HTMLDivElement, RowContainerProps>(
  ({ flag, data }, ref) => {
    return (
      <div
        className={`w-full my-12 px-2 flex items-center gap-3 scroll-smooth ${
          flag
            ? "overflow-x-scroll scrollbar-none"
            : "overflow-x-hidden flex-wrap justify-center"
        }`}
        ref={ref}
      >
        {data && data.length > 0 ? (
          data.map(item => <MenuProductCard item={item} key={item.id} />)
        ) : (
          <div className="w-full h-20 flex items-center justify-center">
            <p className="text-base text-textColor font-semibold">
              No products found 😢
            </p>
          </div>
        )}
      </div>
    );
  }
);

export default RowContainer;
