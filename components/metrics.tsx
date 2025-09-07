"use client";

export function Metrics() {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-8 lg:absolute bottom-0 left-0 md:divide-x mt-20 lg:mt-0 items-center justify-center [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1 pb-8">
      <div className="flex flex-col md:pr-8 text-center">
        <h4 className="text-[#878787] text-sm mb-4">Total Ideas</h4>
        <span className="text-2xl font-mono text-stroke">1,250+</span>
      </div>

      <div className="flex flex-col md:px-8 text-center">
        <h4 className="text-[#878787] text-sm mb-4">Active Students</h4>
        <span className="text-2xl font-mono text-stroke">850+</span>
      </div>

      <div className="flex flex-col md:px-8 text-center">
        <h4 className="text-[#878787] text-sm mb-4">Ideas Liked</h4>
        <span className="text-2xl font-mono text-stroke">4,300+</span>
      </div>

      <div className="flex flex-col md:pl-8 text-center">
        <h4 className="text-[#878787] text-sm mb-4">Ideas Remixed</h4>
        <span className="text-2xl font-mono text-stroke">980+</span>
      </div>
    </div>
  );
}
