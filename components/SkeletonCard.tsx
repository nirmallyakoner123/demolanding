/**
 * Skeleton Card Component
 * Loading placeholder for ArticleCard
 */
export default function SkeletonCard() {
  return (
    <div className="block h-full rounded-lg overflow-hidden bg-white border border-zinc-200 animate-pulse">
      <div className="flex flex-col h-full">
        {/* Image Skeleton */}
        <div className="w-full h-52 bg-linear-to-br from-gray-200 to-gray-300" />

        {/* Content Skeleton */}
        <div className="flex flex-col flex-1 p-6 sm:p-5">
          {/* Title Skeleton */}
          <div className="space-y-2 mb-3">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Excerpt Skeleton */}
          <div className="space-y-2 mb-4 flex-1">
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex gap-4 mb-4 pt-4 border-t border-zinc-200">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>

          {/* Read More Skeleton */}
          <div className="h-5 bg-gray-200 rounded w-28" />
        </div>
      </div>
    </div>
  );
}
