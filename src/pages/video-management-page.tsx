import { FC, useEffect, useMemo, useRef, useState } from "react";
import { UpperBar, VideoTable } from "@/components/video-management";
import CustomPagination from "@/components/video-management/custom-pagination";
import { Video } from "@/types/model";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from "sonner";
import { videoService } from "@/services";
import { getDateString, getPages } from "@/utils/helpers";
import { DateRange } from "react-day-picker";

const VideoManagement: FC = () => {
  const searchingDelay = useRef<number>(1000);
  const initData = useRouteLoaderData("video-management") as {
    videos: Video[];
    numberOfVideos: number;
  };
  const [videos, setVideos] = useState<Video[]>(initData.videos);
  const [numberOfVideos, setNumberOfVideos] = useState<number>(
    initData.numberOfVideos
  );
  const totalPages = useMemo(() => getPages(numberOfVideos), [numberOfVideos]);
  const [currentPage, setCurrentPage] = useState<number>();
  const toasting = useRef<{
    id: string | number;
    state: boolean;
  } | null>();
  const [recaculate, setRecaculate] = useState<boolean>(true);
  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    [recaculate]
  );

  useEffect(() => {
    if (toasting.current === undefined) {
      toasting.current = null;
    } else {
      if (!toasting.current?.state) {
        toasting.current = { id: toast.loading("Processing..."), state: true };
      }
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const records = Object.fromEntries([...params]);
        const response = await videoService.apis.getVideos({
          ...records,
          currentPage: `${currentPage}`,
        });

        setVideos(response.videos);
        setNumberOfVideos(response.numberOfVideos);
      } finally {
        toast.dismiss(toasting.current!.id);
        toasting.current = null;
      }
    }, searchingDelay.current);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, recaculate]);

  const handleDateRangeChange = (dateRange: DateRange) => {
    handleFilterChange([
      {
        filterKey: "from",
        filterValue: dateRange.from
          ? getDateString(dateRange.from)
          : dateRange.from,
      },
      {
        filterKey: "to",
        filterValue: dateRange.to ? getDateString(dateRange.to) : dateRange.to,
      },
    ]);
  };

  const handleFilterChange = (
    queryParams: {
      filterKey: string;
      filterValue: string | undefined;
    }[]
  ) => {
    const currentUrl = new URL(window.location.href);

    queryParams.forEach((queryParam) => {
      if (queryParam.filterValue) {
        currentUrl.searchParams.set(
          queryParam.filterKey,
          queryParam.filterValue
        );
      } else {
        currentUrl.searchParams.delete(queryParam.filterKey);
      }
    });

    window.history.replaceState({}, "", currentUrl);
    setRecaculate((prevValue) => !prevValue);
  };

  return (
    <div className="my-8">
      <UpperBar onDateRangeChange={handleDateRangeChange} />

      <VideoTable className="w-full mt-4" videos={videos} />

      {/** Pagination */}
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default VideoManagement;
