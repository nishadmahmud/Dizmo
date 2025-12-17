export default function Loader({ className = "" }) {
    return (
        <div className={`flex flex-col items-center justify-center min-h-[400px] w-full bg-[#103E34] z-50 ${className}`}>
            <div className="relative flex flex-col items-center">
                {/* Brand Text */}
                <div className="mb-8 animate-pulse">
                    <span className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        DIZMO<span className="text-[#FCB042] ml-1 text-lg align-top">™</span>
                    </span>
                </div>

                {/* Spinner using Brand Colors */}
                <div className="w-12 h-12 border-4 border-white/20 border-t-[#FCB042] rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
