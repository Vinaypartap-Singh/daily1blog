import { Skeleton } from "@mui/material";

export default function BlogSkelton() {
  return (
    <div className="flex flex-wrap -m-4 w-full">
      {Array(3) // Adjust number for multiple skeleton posts
        .fill()
        .map((_, index) => (
          <div key={index} className="p-4 md:w-1/3 w-full">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              {/* Skeleton for image */}
              <Skeleton
                variant="rectangular"
                width="100%" // Full width image
                height={160}
                className="mb-4"
              />

              <div className="p-6">
                {/* Skeleton for category */}
                <Skeleton
                  variant="text"
                  width="40%" // Smaller width for category
                  height={20}
                  className="mb-2"
                />

                {/* Skeleton for title */}
                <Skeleton
                  variant="text"
                  width="80%" // Wider title skeleton
                  height={30}
                  className="mb-4"
                />

                {/* Skeleton for description */}
                <Skeleton
                  variant="text"
                  width="100%" // Full width description skeleton
                  height={60}
                  className="mb-4"
                />

                {/* Skeleton for Read More button */}
                <Skeleton
                  variant="text"
                  width="30%" // Smaller width for Read More button
                  height={20}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
