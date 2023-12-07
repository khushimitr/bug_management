// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as AloneSvg } from "@/assets/not-found.svg";

export const NotFound = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AloneSvg className="absolute h-screen w-screen object-cover"/>
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="container relative z-10 mx-auto flex items-center px-6 py-32 md:px-12 xl:py-40">
        <div className="relative z-10 flex w-full flex-col items-center font-mono">
          <h1 className="mt-4 text-center text-5xl font-extrabold leading-tight text-white">
            You&#x27;re alone here
          </h1>
          <p className="my-44 animate-bounce text-8xl font-extrabold text-white">
            404
          </p>
        </div>
      </div>
    </div>
  );
};
