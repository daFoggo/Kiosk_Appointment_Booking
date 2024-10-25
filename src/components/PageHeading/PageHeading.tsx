import { IPageHeadingProps } from "@/models/PageHeading/type";

const PageHeading = ({
  title,
  description,
  actionButton,
}: IPageHeadingProps) => {
  return (
    <div className={`bg-white p-2 sm:p-4 rounded-xl font-inter shadow-sm border`}>
      <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="space-y-1 flex-1 min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-zinc-500 font-semibold">
              {description}
            </p>
          )}
        </div>

        {actionButton && (
          <div className="flex items-center self-center">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
