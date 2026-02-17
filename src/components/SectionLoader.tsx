const SectionLoader = () => {
    return (
        <div className="w-full h-96 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-md px-6">
                <div className="h-8 w-48 bg-slate-200/50 rounded-full"></div>
                <div className="h-4 w-64 bg-slate-200/50 rounded-full"></div>
                <div className="w-full h-64 bg-slate-100/50 rounded-2xl mt-4"></div>
            </div>
        </div>
    );
};

export default SectionLoader;
