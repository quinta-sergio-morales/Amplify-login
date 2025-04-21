export default function LoginLayout({children}: {children: React.ReactNode}){
    return (
        <div className="flex min-h-screen w-screen overflow-hidden">

        <div className="flex flex-1  bg-white p-8 ">
            <div className="p-8 grid grid-cols-1 md:grid-cols-[minmax(48px,1fr)_minmax(auto,768px)_minmax(48px,1fr)]">
                <div className="lg:col-start-2 lg:col-end-3">
                    {children}
                </div>
            </div>
        </div>

        <div className="hidden flex-1 flex-col items-center justify-center bg-indigo-100 p-8 text-indigo-800 lg:flex">
            <h2 className="mb-4 text-3xl font-bold">Your Awesome App</h2>
            <p className="text-center text-lg">
                A great place for a tagline or an illustration. <br />
                Welcome back!
            </p>
        </div>

    </div>
    )
}